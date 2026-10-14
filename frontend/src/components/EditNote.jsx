import { useState } from "react";
import { updateNote } from "../services/api";
import ExpirationSelector from "./ExpirationSelector";

function EditNote({ note, onClose, onUpdated }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [expiresAt, setExpiresAt] = useState(new Date(note.expiresAt));
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
        setError("Please choose an expiration time.");
        return;
        }

    try {
        setLoading(true);

        const data = await updateNote(note._id, {
        title: title.trim(),
        content: content.trim(),
        expiresAt: expiresAt.toISOString(),
        });

        onUpdated(data.note);
        onClose();
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#252A32] bg-[#13161B] p-6 shadow-2xl">

        <form onSubmit={handleSubmit}>
        
            {/* Header */}
            <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#F5F7FA]">
                Edit note
            </h2>

            <p className="mt-1 text-sm text-[#9AA3AF]">
                Make changes to your note.
            </p>
            </div>

            {/* Title */}
            <div>
            <label
                htmlFor="edit-title"
                className="mb-2 block text-sm font-medium text-[#F5F7FA]"
            >
                Title
            </label>

            <input
                id="edit-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your note a title"
                className="w-full rounded-xl border border-[#252A32] bg-[#0B0D10] px-4 py-3 text-sm text-[#F5F7FA] outline-none transition placeholder:text-[#66707D] focus:border-[#8B5CF6]"
            />
            </div>

            {/* Content */}
            <div className="mt-5">
            <label
                htmlFor="edit-content"
                className="mb-2 block text-sm font-medium text-[#F5F7FA]"
            >
                Note
            </label>

            <textarea
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note..."
                rows="7"
                className="w-full resize-none rounded-xl border border-[#252A32] bg-[#0B0D10] px-4 py-3 text-sm leading-6 text-[#F5F7FA] outline-none transition placeholder:text-[#66707D] focus:border-[#8B5CF6]"
            />
            </div>
            
            {/*Lifetime*/}
            <div className="mt-5">
              <ExpirationSelector 
                onChange={setExpiresAt}
                initialExpiration={note.expiresAt}
                 />
            </div>

            {error && (
            <p className="mt-4 rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/10 px-4 py-3 text-sm text-[#F87171]">
                {error}
            </p>
            )}

            {/* Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
                className="rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-50"
                >
                {loading ? "Saving..." : "Save changes"}
            </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default EditNote;