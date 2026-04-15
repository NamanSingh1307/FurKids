// ============================================================
// frontend/js/api.js
// Centralised fetch wrapper for all backend API calls
// ============================================================

// Base URL – change this if your backend runs on a different port
const API_BASE = 'http://localhost:5000/api';

/**
 * Generic fetch helper.
 * Returns parsed JSON or throws an error with the server message.
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  // Default headers (don't set Content-Type for FormData – browser sets it)
  if (!(options.body instanceof FormData)) {
    options.headers = { 'Content-Type': 'application/json', ...options.headers };
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'API request failed');
  }
  return data.data;          // unwrap the { success, data } envelope
}

// ── Pets ──────────────────────────────────────────────────────
const PetsAPI = {
  getAll:   ()         => apiFetch('/pets'),
  getOne:   (id)       => apiFetch(`/pets/${id}`),
  create:   (body)     => apiFetch('/pets',    { method: 'POST',   body: JSON.stringify(body) }),
  update:   (id, body) => apiFetch(`/pets/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete:   (id)       => apiFetch(`/pets/${id}`, { method: 'DELETE' }),
};

// ── Reminders ─────────────────────────────────────────────────
const RemindersAPI = {
  getAll:  ()         => apiFetch('/reminders'),
  create:  (body)     => apiFetch('/reminders',    { method: 'POST',   body: JSON.stringify(body) }),
  update:  (id, body) => apiFetch(`/reminders/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete:  (id)       => apiFetch(`/reminders/${id}`, { method: 'DELETE' }),
};

// ── Records ───────────────────────────────────────────────────
const RecordsAPI = {
  getAll:  ()         => apiFetch('/records'),
  create:  (formData) => apiFetch('/records', { method: 'POST', body: formData }),  // FormData
  delete:  (id)       => apiFetch(`/records/${id}`, { method: 'DELETE' }),
};
window.PetsAPI = PetsAPI;
window.RemindersAPI = RemindersAPI;
window.RecordsAPI = RecordsAPI;