import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoutes";
import NoteDetails from "./pages/NoteDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<GuestRoute />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />}/>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes/:id" element={<NoteDetails />} />
      </Route>

    </Routes>
  );
}

export default App;