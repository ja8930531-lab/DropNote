import { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  const isError = type === "error";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-6">
      <div
        className={`flex items-start gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-sm ${
          isError
            ? "border-[#EF4444]/20 bg-[#13161B]"
            : "border-[#22C55E]/20 bg-[#13161B]"
        }`}
      >
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
            isError
              ? "bg-[#EF4444]/10 text-[#EF4444]"
              : "bg-[#22C55E]/10 text-[#22C55E]"
          }`}
        >
          {isError ? "!" : "✓"}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={`text-sm font-medium ${
              isError ? "text-[#FCA5A5]" : "text-[#86EFAC]"
            }`}
          >
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-[#6B7280] transition hover:text-[#F5F7FA]"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;