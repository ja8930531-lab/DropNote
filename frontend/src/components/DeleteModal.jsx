function DeleteModal({ onClose, onConfirm, loading = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl border border-[#252A32] bg-[#13161B] p-6 shadow-2xl">

        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EF4444]/10 text-xl">
          🗑️
        </div>

        {/* Content */}
        <div className="mt-5">
          <h2 className="text-xl font-semibold text-[#F5F7FA]">
            Delete this note?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#9AA3AF]">
            This action cannot be undone. Once deleted, this note will be
            permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-[#252A32] bg-[#1A1E24] px-5 py-3 text-sm font-semibold text-[#F5F7FA] transition hover:bg-[#252A32] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-[#EF4444] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#DC2626] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete note"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteModal;