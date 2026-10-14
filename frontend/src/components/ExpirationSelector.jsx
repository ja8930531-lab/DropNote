import { useState } from "react";

function ExpirationSelector({ onChange, initialExpiration = null }) {
  const [selectedOption, setSelectedOption] = useState(
    initialExpiration ? "custom" : "30min"
    );

    const [customDate, setCustomDate] = useState(
    initialExpiration
        ? new Date(initialExpiration).toISOString().slice(0, 16)
        : ""
    );

  const calculateExpiration = (option) => {
    const now = new Date();

    switch (option) {
      case "5min":
       return new Date(now.getTime() + 5 * 60 * 1000);

      case "10min":
        return new Date(now.getTime() + 10 * 60 * 1000);

      case "30min":
        return new Date(now.getTime() + 30 * 60 * 1000);

      case "1hour":
        return new Date(now.getTime() + 60 * 60 * 1000);

      case "3hours":
        return new Date(now.getTime() + 3 * 60 * 60 * 1000);

      case "today": {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return today;
      }

      case "tomorrow": {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(23, 59, 59, 999);
        return tomorrow;
      }

      case "7days":
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      default:
        return null;
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);

    if (option === "custom") {
      return;
    }

    const expirationDate = calculateExpiration(option);

    onChange(expirationDate);
  };

  const handleCustomDateChange = (event) => {
    const value = event.target.value;

    setCustomDate(value);

    if (!value) {
      return;
    }

    const expirationDate = new Date(value);

    onChange(expirationDate);
  };

  const options = [
    { value: "5min", label: "5 min"},
    { value: "10min", label: "10 min"},
    { value: "30min", label: "30 min" },
    { value: "1hour", label: "1 hour" },
    { value: "3hours", label: "3 hours" },
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "7days", label: "7 days" },
  ];

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#F5F7FA]">
        Lifetime
      </label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((option) => {
          const isSelected = selectedOption === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionChange(option.value)}
              className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                isSelected
                  ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#A78BFA]"
                  : "border-[#252A32] bg-[#0B0D10] text-[#9AA3AF] hover:border-[#8B5CF6] hover:text-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}

        {/* Custom */}
        <button
          type="button"
          onClick={() => handleOptionChange("custom")}
          className={`col-span-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
            selectedOption === "custom"
              ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#A78BFA]"
              : "border-[#252A32] bg-[#0B0D10] text-[#9AA3AF] hover:border-[#8B5CF6] hover:text-white"
          }`}
        >
          Custom date & time
        </button>
      </div>

      {/* Custom date picker */}
      {selectedOption === "custom" && (
        <div className="mt-3">
          <input
            type="datetime-local"
            value={customDate}
            onChange={handleCustomDateChange}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full rounded-xl border border-[#252A32] bg-[#0B0D10] px-4 py-3 text-sm text-[#F5F7FA] outline-none transition focus:border-[#8B5CF6]"
          />
        </div>
      )}
    </div>
  );
}

export default ExpirationSelector;