import { useState } from "react";
import { createNote } from "../services/api";
import ExpirationSelector from "./ExpirationSelector";

function NoteForm({ onClose, onNoteCreated }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [expiresAt, setExpiresAt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!title.trim()) {
            setError("Please enter a title.");
            return;
        }

        if (!content.trim()) {
            setError("Please write something in your note.");
            return;
        }

        if (!expiresAt) {
            setError("Please choose when your note should expire.");
            return;
        }

        try {
            setLoading(true);

            await createNote({
            title: title.trim(),
            content: content.trim(),
            expiresAt: expiresAt.toISOString(),
            });

            onNoteCreated();
            onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm">
      
      {/* Modal */}
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-[#252A32] bg-[#13161B] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#252A32] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-[#F5F7FA]">
              Create a note
            </h2>

            <p className="mt-1 text-sm text-[#9AA3AF]">
              Give your note a lifetime.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-[#9AA3AF] transition hover:bg-[#1A1E24] hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="space-y-5 p-6">

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-[#F5F7FA]"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-[#252A32] bg-[#0B0D10] px-4 py-3 text-sm text-[#F5F7FA] outline-none transition placeholder:text-[#66707D] focus:border-[#8B5CF6]"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-[#F5F7FA]"
            >
              Note
            </label>

            <textarea
              id="content"
              rows="6"
              placeholder="Write your temporary note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full resize-none rounded-xl border border-[#252A32] bg-[#0B0D10] px-4 py-3 text-sm leading-6 text-[#F5F7FA] outline-none transition placeholder:text-[#66707D] focus:border-[#8B5CF6]"
            />
          </div>

          {/* Expiration */}
          <div>
            <ExpirationSelector onChange={setExpiresAt} />
          </div>

          {error && (
            <div className="rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#FCA5A5]">
                {error}
            </div>
            )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#252A32] bg-[#1A1E24] px-5 py-3 text-sm font-semibold text-[#F5F7FA] transition hover:bg-[#252A32]"
            >
              Cancel
            </button>

            <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-60"
                >
                {loading ? "Creating..." : "Create note"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default NoteForm;