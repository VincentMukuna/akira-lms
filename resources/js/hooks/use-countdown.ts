import { useEffect, useState } from 'react';

interface UseCountdownProps {
    seconds: number;
    onComplete?: () => void;
    onCancel?: () => void;
}

export function useCountdown({ seconds, onComplete, onCancel }: UseCountdownProps) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft === 0) {
            onComplete?.();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isActive, onComplete]);

    const start = () => {
        setTimeLeft(seconds);
        setIsActive(true);
    };

    const cancel = () => {
        setIsActive(false);
        setTimeLeft(seconds);
        onCancel?.();
    };

    const restart = () => {
        setTimeLeft(seconds);
        setIsActive(true);
    };

    return {
        timeLeft,
        isActive,
        start,
        cancel,
        restart,
    };
}
