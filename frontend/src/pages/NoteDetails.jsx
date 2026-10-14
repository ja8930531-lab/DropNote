import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteNote, getNote } from "../services/api";
import Countdown from "../components/Countdown";
import EditNote from "../components/EditNote";
import DeleteModal from "../components/DeleteModal";

function NoteDetails() {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getNote(id);
        setNote(data.note);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleNoteUpdated = (updatedNote) => {
    setNote(updatedNote);
    setShowEdit(false);
    setExpired(false);
  };

  const handleDeleteNote = async () => {
    if (!note) {
      return;
    }

    try {
      setDeleting(true);

      await deleteNote(note._id);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0B0D10] text-[#F5F7FA]">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center text-sm text-[#9AA3AF] transition hover:text-[#F5F7FA]"
        >
          ← Back to notes
        </Link>

        {/* Loading */}
        {loading ? (
          <div className="mt-8 flex min-h-[300px] items-center justify-center rounded-2xl border border-[#252A32] bg-[#13161B] px-4">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#252A32] border-t-[#8B5CF6]" />

              <p className="mt-4 text-sm text-[#9AA3AF]">
                Loading note...
              </p>
            </div>
          </div>
        ) : error ? (
          /* Error */
          <div className="mt-8 rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/10 p-5 text-center sm:p-6">
            <p className="text-sm font-medium text-[#FCA5A5]">
              Unable to load this note
            </p>

            <p className="mt-2 break-words text-sm text-[#9AA3AF] [overflow-wrap:anywhere]">
              {error}
            </p>

            <Link
              to="/dashboard"
              className="mt-5 inline-flex rounded-lg bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7C3AED]"
            >
              Back to dashboard
            </Link>
          </div>
        ) : note ? (
          /* Note */
          <article className="mt-8 min-w-0 rounded-2xl border border-[#252A32] bg-[#13161B] p-5 sm:p-8">
            {/* Note Header */}
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#8B5CF6]">
                  Your note
                </p>

                <h1 className="mt-2 break-words text-3xl font-bold tracking-tight text-[#F5F7FA] [overflow-wrap:anywhere]">
                  {note.title}
                </h1>
              </div>

              {/* Actions */}
              {!expired && (
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEdit(true)}
                    className="rounded-lg border border-[#252A32] bg-[#1A1E24] px-3 py-2 text-sm font-medium text-[#9AA3AF] transition hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/10 hover:text-[#A78BFA]"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDelete(true)}
                    className="rounded-lg border border-[#252A32] bg-[#1A1E24] px-3 py-2 text-sm font-medium text-[#9AA3AF] transition hover:border-[#EF4444]/40 hover:bg-[#EF4444]/10 hover:text-[#EF4444]"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>

            {/* Note Content */}
            <div className="mt-8 min-w-0">
              <p className="break-words whitespace-pre-wrap text-base leading-8 text-[#D1D5DB] [overflow-wrap:anywhere]">
                {note.content}
              </p>
            </div>

            {/* Countdown / Expired State */}
            <div className="mt-8 border-t border-[#252A32] pt-5">
              {expired ? (
                <div className="rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/10 p-4">
                  <p className="text-sm font-semibold text-[#FCA5A5]">
                    This note has expired
                  </p>

                  <p className="mt-1 text-sm text-[#9AA3AF]">
                    This temporary note is no longer active.
                  </p>
                </div>
              ) : (
                <Countdown
                  expiresAt={note.expiresAt}
                  onExpired={() => setExpired(true)}
                />
              )}
            </div>
          </article>
        ) : null}
      </main>

      {/* Edit Modal */}
      {showEdit && note && (
        <EditNote
          note={note}
          onClose={() => setShowEdit(false)}
          onUpdated={handleNoteUpdated}
        />
      )}

      {/* Delete Modal */}
      {showDelete && note && (
        <DeleteModal
          onClose={() => setShowDelete(false)}
          onConfirm={handleDeleteNote}
          loading={deleting}
        />
      )}
    </div>
  );
}

export default NoteDetails;