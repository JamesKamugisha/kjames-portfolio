import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  holdEndTime?: number;
  holdStartTime?: number;
  loop?: boolean;
}

export const useTypewriter = ({
  text,
  typingSpeed = 120,
  deletingSpeed = 60,
  holdEndTime = 900,
  holdStartTime = 600,
  loop = true,
}: UseTypewriterOptions) => {
  const [typed, setTyped] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!loop && typed === text) return;

    const TYPING = typingSpeed;
    const DELETING = deletingSpeed;
    const HOLD_END = holdEndTime;
    const HOLD_START = holdStartTime;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && typed.length < text.length) {
      // Type next character
      timer = setTimeout(
        () => setTyped(text.slice(0, typed.length + 1)),
        TYPING
      );
    } else if (!isDeleting && typed.length === text.length) {
      // Reached end — hold, then start deleting
      timer = setTimeout(() => setIsDeleting(true), HOLD_END);
    } else if (isDeleting && typed.length > 0) {
      // Delete character
      timer = setTimeout(
        () => setTyped(text.slice(0, typed.length - 1)),
        DELETING
      );
    } else if (isDeleting && typed.length === 0) {
      // Cleared — hold, then start typing again
      timer = setTimeout(() => setIsDeleting(false), HOLD_START);
    }

    return () => clearTimeout(timer);
  }, [typed, isDeleting, text, typingSpeed, deletingSpeed, holdEndTime, holdStartTime, loop]);

  return { typed, isDeleting };
};
