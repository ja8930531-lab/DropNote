import { useEffect, useState } from "react";

function Countdown({ expiresAt, onExpired }) {
  const calculateTimeLeft = () => {
    return new Date(expiresAt).getTime() - Date.now();
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const updateCountdown = () => {
      const difference = calculateTimeLeft();

      if (difference <= 0) {
        setTimeLeft(0);
        onExpired?.();
        return;
      }

      setTimeLeft(difference);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (timeLeft <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(timeLeft / 1000);

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor(
    (totalSeconds % (24 * 60 * 60)) / (60 * 60)
  );
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  let displayTime = "";

  if (days > 0) {
    displayTime = `${days}d ${hours}h`;
  } else if (hours > 0) {
    displayTime = `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    displayTime = `${minutes}m ${seconds}s`;
  } else {
    displayTime = `${seconds}s`;
  }

  const isVeryClose = totalSeconds <= 5 * 60;
  const isApproaching = totalSeconds <= 30 * 60;

  return (
    <p
        className={`text-sm ${
            isVeryClose
            ? "font-medium text-[#EF4444]"
            : isApproaching
                ? "font-medium text-[#F59E0B]"
                : "text-[#9AA3AF]"
        }`}
        >
        {isVeryClose
            ? "🔴"
            : isApproaching
            ? "⚠️"
            : "⏳"}{" "}
        Drops in {displayTime}
    </p>
  );
}

export default Countdown;