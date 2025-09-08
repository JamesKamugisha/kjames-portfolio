const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const dataFilePath = path.join(__dirname, "data", "portfolio.json");

// Ensure data directory exists
async function ensureDataDirectory() {
  try {
    await fs.access(path.dirname(dataFilePath));
  } catch {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  }
}

// Initialize data file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch {
    const initialData = {
      availableForWork: false,
      lastUpdated: new Date().toISOString(),
    };
    await fs.writeFile(dataFilePath, JSON.stringify(initialData, null, 2));
  }
}

// Get availability status
app.get("/api/availability", async (req, res) => {
  try {
    await ensureDataDirectory();
    await initializeDataFile();

    const data = await fs.readFile(dataFilePath, "utf8");
    const portfolioData = JSON.parse(data);

    res.json({
      availableForWork: portfolioData.availableForWork,
      lastUpdated: portfolioData.lastUpdated,
    });
  } catch (error) {
    console.error("Error reading availability:", error);
    res.status(500).json({ error: "Failed to read availability status" });
  }
});

// Update availability status
app.put("/api/availability", async (req, res) => {
  try {
    const { availableForWork } = req.body;

    if (typeof availableForWork !== "boolean") {
      return res
        .status(400)
        .json({ error: "availableForWork must be a boolean" });
    }

    await ensureDataDirectory();

    const data = {
      availableForWork,
      lastUpdated: new Date().toISOString(),
    };

    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    res.json({
      availableForWork,
      lastUpdated: data.lastUpdated,
      message: "Availability status updated successfully",
    });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ error: "Failed to update availability status" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Portfolio API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Availability API: http://localhost:${PORT}/api/availability`);
});
