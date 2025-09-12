import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./SmallGlobe.css";

const GLOBE_RADIUS = 0.3; // Much smaller radius
const ROTATION_SPEED = 0.003;
const ARC_COLOR = 0xff8a00;
const PACKET_SPEED = 0.004;

type LatLng = { lat: number; lng: number };

function latLngToVec3(lat: number, lng: number, radius = GLOBE_RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function makeArc(from: LatLng, to: LatLng, altitude = 0.2) {
  const start = latLngToVec3(from.lat, from.lng);
  const end = latLngToVec3(to.lat, to.lng);
  
  // Create a proper great circle arc by interpolating along the sphere
  const points: THREE.Vector3[] = [];
  const segments = 24; // Reduced segments for cleaner arcs
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Spherical interpolation (slerp) for great circle
    const angle = Math.acos(Math.max(-1, Math.min(1, start.dot(end))));
    const sinAngle = Math.sin(angle);
    
    if (sinAngle < 0.0001) {
      // Points are too close, use linear interpolation
      points.push(start.clone().lerp(end, t));
    } else {
      // Proper spherical interpolation
      const a = Math.sin((1 - t) * angle) / sinAngle;
      const b = Math.sin(t * angle) / sinAngle;
      const point = start.clone().multiplyScalar(a).add(end.clone().multiplyScalar(b));
      
      // Add altitude to create the arc effect
      const normalizedPoint = point.clone().normalize();
      const elevatedPoint = normalizedPoint.multiplyScalar(GLOBE_RADIUS * (1 + altitude));
      points.push(elevatedPoint);
    }
  }
  
  return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
}

export default function SmallGlobe() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = wrapRef.current!;
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 2);

    // Renderer - enhanced settings for clarity
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Use square aspect ratio for consistent sizing with higher resolution
    const size = Math.min(container.clientWidth, container.clientHeight);
    const renderSize = size * 2; // 2x resolution for crisp rendering
    renderer.setSize(renderSize, renderSize, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(3, 2, 3);
    scene.add(ambient, dir);

    // Globe (wireframe sphere) - optimized for clarity
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 24, 16); // Reduced segments for cleaner lines
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6, // Increased opacity for better visibility
      linewidth: 1, // Ensure thin, crisp lines
    });
    const globe = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globe);

    // Nodes
    const nodesGroup = new THREE.Group();
    for (let i = 0; i < 12; i++) { // Even fewer nodes for cleaner look
      const lat = Math.random() * 180 - 90;
      const lng = Math.random() * 360 - 180;
      const pos = latLngToVec3(lat, lng);
      const nodeGeo = new THREE.SphereGeometry(0.008, 8, 8);
      const nodeMat = new THREE.MeshPhongMaterial({ color: 0x00ffff, shininess: 80 });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      nodesGroup.add(node);
    }
    scene.add(nodesGroup);

    // Arcs + packets
    const arcsGroup = new THREE.Group();
    const packets: Array<{ mesh: THREE.Mesh; curve: THREE.Curve<THREE.Vector3>; t: number; dt: number }> = [];

    // Generate fewer arcs for smaller globe
    const generateSmallArcs = () => {
      const arcs = [];
      const numArcs = 6; // Even fewer arcs for cleaner look
      const longitudeStep = 360 / numArcs;
      
      for (let i = 0; i < numArcs; i++) {
        const startLng = i * longitudeStep - 180;
        const endLng = (startLng + 270) % 360 - 180;
        
        const startLat = (Math.sin(i * 0.5) * 40) + (Math.random() - 0.5) * 15;
        const endLat = (Math.sin((i + 0.5) * 0.5) * 40) + (Math.random() - 0.5) * 15;
        
        arcs.push({
          from: { lat: startLat, lng: startLng },
          to: { lat: endLat, lng: endLng }
        });
      }
      
      return arcs;
    };

    const sampleLinks = generateSmallArcs();

    const arcMat = new THREE.MeshBasicMaterial({
      color: ARC_COLOR,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const packetMat = new THREE.MeshPhongMaterial({
      color: 0xffcc00,
      emissive: 0xff6600,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
    });

    sampleLinks.forEach((link, index) => {
      // arcs closer to globe surface
      const curve = makeArc(link.from, link.to, 0.15 + Math.random() * 0.1);

      // Tube with segments matching our curve points - optimized for clarity
      const tube = new THREE.TubeGeometry(curve, 16, 0.004, 8, false);
      const arc = new THREE.Mesh(tube, arcMat.clone());
      
      // Add slight color variation to arcs
      const colorVariation = 0.1 + (index % 3) * 0.05;
      (arc.material as THREE.MeshBasicMaterial).color.setHSL(0.1, 0.8, 0.5 + colorVariation);
      
      arcsGroup.add(arc);

      // Smaller packet spheres
      const packetGeo = new THREE.SphereGeometry(0.015, 8, 8);
      const packet = new THREE.Mesh(packetGeo, packetMat);
      arcsGroup.add(packet);

      packets.push({
        mesh: packet,
        curve,
        t: Math.random(),
        dt: PACKET_SPEED * (0.8 + Math.random() * 1.2),
      });
    });

    scene.add(arcsGroup);

    // Add subtle tilt for better 3D effect
    globe.rotation.x = 0.2;
    nodesGroup.rotation.x = 0.2;
    arcsGroup.rotation.x = 0.2;

    // Animate
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      // 3D rotation with slight variation
      globe.rotation.y += ROTATION_SPEED;
      globe.rotation.x += ROTATION_SPEED * 0.3;
      nodesGroup.rotation.y += ROTATION_SPEED;
      nodesGroup.rotation.x += ROTATION_SPEED * 0.3;
      arcsGroup.rotation.y += ROTATION_SPEED;
      arcsGroup.rotation.x += ROTATION_SPEED * 0.3;

      packets.forEach(p => {
        p.t += p.dt;
        if (p.t > 1) p.t = 0;
        const pos = p.curve.getPointAt(p.t);
        p.mesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      const { clientWidth, clientHeight } = container;
      const size = Math.min(clientWidth, clientHeight);
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      sphereGeo.dispose();
      arcMat.dispose();
      packetMat.dispose();
      // Dispose node materials
      nodesGroup.children.forEach((node: any) => {
        if (node instanceof THREE.Mesh) {
          node.geometry.dispose();
          if (node.material instanceof THREE.Material) {
            node.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="small-globe-wrapper"
    />
  );
}
