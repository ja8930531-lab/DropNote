import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import DeleteModal from "../components/DeleteModal";
import EditNote from "../components/EditNote";
import Countdown from "../components/Countdown";
import { deleteNote, getNotes } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";

function Dashboard() {
  const [showNoteForm, setShowNoteForm] = useState(false);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [noteToDelete, setNoteToDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNotes();

      setNotes(data.notes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteNote = async () => {
  if (!noteToDelete) {
    return;
  }

  try {
    setDeleting(true);

    await deleteNote(noteToDelete._id);

    // Remove the deleted note from the dashboard immediately
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note._id !== noteToDelete._id)
    );

    // Close the confirmation modal
    setNoteToDelete(null);

    // Show the success toast
    setToast({
      message: "Note deleted successfully.",
      type: "success",
    });
    } catch (error) {
    setToast({
      message: error.message || "Failed to delete note.",
      type: "error",
    });
  } finally {
    setDeleting(false);
  }
};

  const handleNoteExpired = (noteId) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note._id !== noteId)
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0B0D10] text-[#F5F7FA]">
      {/* Navbar */}
      <nav className="border-b border-[#252A32]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-xl font-bold tracking-tight"
          >
            Drop<span className="text-[#8B5CF6]">Note</span>
          </Link>

          {/* User Area */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden text-sm text-[#9AA3AF] sm:block">
              Welcome back, {user?.name} 👋
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-[#252A32] bg-[#13161B] px-3 py-2 text-sm font-medium text-[#9AA3AF] transition hover:bg-[#1A1E24] hover:text-white sm:px-4"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#8B5CF6]">
              Your workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Your Notes
            </h1>

            <p className="mt-2 text-sm text-[#9AA3AF] sm:text-base">
              Temporary thoughts, ideas and reminders.
            </p>
          </div>

          {/* Create Button */}
          <button
            type="button"
            onClick={() => setShowNoteForm(true)}
            className="w-full rounded-xl bg-[#8B5CF6] px-5 py-3 font-semibold text-white transition hover:bg-[#7C3AED] sm:w-auto"
          >
            + Create note
          </button>
        </div>

        {/* Notes Section */}
        <section className="mt-8 sm:mt-10">
          {loading ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#252A32] bg-[#13161B] px-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#252A32] border-t-[#8B5CF6]" />

              <p className="mt-4 text-sm text-[#9AA3AF]">
                Loading your notes...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/10 p-5 text-center sm:p-6">
              <p className="text-sm font-medium text-[#FCA5A5]">
                Something went wrong
              </p>

              <p className="mt-2 break-words text-sm text-[#9AA3AF] [overflow-wrap:anywhere]">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchNotes}
                className="mt-5 rounded-lg border border-[#252A32] bg-[#13161B] px-4 py-2 text-sm font-medium text-[#F5F7FA] transition hover:bg-[#1A1E24]"
              >
                Try again
              </button>
            </div>
          ) : notes.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#252A32] bg-[#13161B] px-5 text-center sm:px-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B5CF6]/10 text-2xl">
                📝
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Nothing here yet.
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#9AA3AF]">
                Your temporary notes will appear here once you create them.
                Give your first note a lifetime and let DropNote handle the
                rest.
              </p>

              <button
                type="button"
                onClick={() => setShowNoteForm(true)}
                className="mt-6 w-full rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED] sm:w-auto"
              >
                Create your first note
              </button>
            </div>
          ) : (
            <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="min-w-0 rounded-2xl border border-[#252A32] bg-[#13161B] p-5 transition hover:border-[#8B5CF6]/40"
                >
                  {/* Card Header */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h2 className="min-w-0 flex-1 break-words text-lg font-semibold text-[#F5F7FA] [overflow-wrap:anywhere]">
                      {note.title}
                    </h2>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setNoteToEdit(note)}
                        className="rounded-lg px-2 py-1 text-sm text-[#9AA3AF] transition hover:bg-[#8B5CF6]/10 hover:text-[#A78BFA]"
                        aria-label={`Edit ${note.title}`}
                      >
                        ✏️
                      </button>

                      <button
                        type="button"
                        onClick={() => setNoteToDelete(note)}
                        className="rounded-lg px-2 py-1 text-sm text-[#9AA3AF] transition hover:bg-[#EF4444]/10 hover:text-[#EF4444]"
                        aria-label={`Delete ${note.title}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Note Content */}
                  <p className="mt-3 line-clamp-4 break-words text-sm leading-6 text-[#9AA3AF] [overflow-wrap:anywhere]">
                    {note.content}
                  </p>

                  {/* Created Date */}
                  <p className="mt-3 break-words text-xs text-[#6B7280] [overflow-wrap:anywhere]">
                    Created {new Date(note.createdAt).toLocaleString()}
                  </p>

                  {/* Countdown + View */}
                  <div className="mt-5 border-t border-[#252A32] pt-4">
                    <Countdown
                      expiresAt={note.expiresAt}
                      onExpired={() => handleNoteExpired(note._id)}
                    />

                    <Link
                      to={`/notes/${note._id}`}
                      className="group mt-4 inline-flex items-center text-sm font-medium text-[#8B5CF6] transition hover:text-[#A78BFA]"
                    >
                      View note
                      <span className="ml-1 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Create Note Modal */}
        {showNoteForm && (
        <NoteForm
            onClose={() => setShowNoteForm(false)}
            onNoteCreated={() => {
            fetchNotes();
            setShowNoteForm(false);

            setToast({
                message: "Note created successfully.",
                type: "success",
            });
            }}
        />
        )}

      {/* Delete Modal */}
      {noteToDelete && (
        <DeleteModal
          onClose={() => setNoteToDelete(null)}
          onConfirm={handleDeleteNote}
          loading={deleting}
        />
      )}

      {/* Edit Modal */}
        {noteToEdit && (
        <EditNote
            note={noteToEdit}
            onClose={() => setNoteToEdit(null)}
            onUpdated={(updatedNote) => {
            setNotes((currentNotes) =>
                currentNotes.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
                )
            );

            setNoteToEdit(null);

            setToast({
                message: "Note updated successfully.",
                type: "success",
            });
            }}
        />
        )}

        {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;