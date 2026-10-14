const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";

    throw new Error("Your session has expired. Please log in again.");
  }

  return response;
};

export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed.");
  }

  return data;
};

export const signinUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signin failed.");
  }

  return data;
};

export const createNote = async (noteData) => {
  const response = await authenticatedFetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create note.");
  }

  return data;
};

export const getNotes = async () => {
  const response = await authenticatedFetch(`${API_URL}/notes`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch notes.");
  }

  return data;
};

export const getNote = async (noteId) => {
  const response = await authenticatedFetch(`${API_URL}/notes/${noteId}`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch note.");
  }

  return data;
};

export const deleteNote = async (noteId) => {
  const response = await authenticatedFetch(`${API_URL}/notes/${noteId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete note.");
  }

  return data;
};

export const updateNote = async (noteId, noteData) => {
  const response = await authenticatedFetch(`${API_URL}/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update note.");
  }

  return data;
};


export const getMe = async () => {
  const response = await authenticatedFetch(`${API_URL}/auth/me`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get user.");
  }

  return data;
};