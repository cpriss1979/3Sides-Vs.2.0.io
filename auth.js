// Improved auth.js - User Authentication & Initialization System
// Handles registration, login, and per-user data structure setup

document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // 🔐 Register Logic
  if (regForm) {
    regForm.addEventListener("submit", e => {
      e.preventDefault();

      const username = document.getElementById("regUsername").value.trim();
      const password = document.getElementById("regPassword").value.trim();

      if (!username || !password) {
        alert("Please fill in both username and password.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find(u => u.username === username);

      if (existingUser) {
        alert("❌ Username already taken. Please choose a different one.");
        return;
      }

      const newUser = { username, password, role: "free" };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Initialize user-specific data
      initializeUserData(username);

      alert("✅ Account created! You can now log in.");
      location.href = "login.html";
    });
  }

  // 🔐 Login Logic
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.username === username && u.password === password);

      if (!user) {
        alert("Invalid username or password.");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      initializeUserData(user.username);
      location.href = "index.html"; // Redirect after login
    });
  }
});

// 🧰 Initialize data structure for a user if missing
function initializeUserData(username) {
  const prefix = `${username}_`;

  const defaults = {
    journal: [],
    badges: [],
    petLevel: "0",
    careStreak: "0",
    petStatus: { fed: false, watered: false, bathed: false },
    journalDate: "",
    canFeedToday: "",
    petFedToday: "",
    canWaterToday: "",
    canBatheToday: "",
    lastAdvanceDate: ""
  };

  for (const key in defaults) {
    const fullKey = prefix + key;
    if (localStorage.getItem(fullKey) === null) {
      localStorage.setItem(fullKey, JSON.stringify(defaults[key]));
    }
  }
}

// ✅ Utilities
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function getUserData() {
  const user = getCurrentUser();
  if (!user) return null;
  return JSON.parse(localStorage.getItem(`data_${user.username}`) || "{}");
}

function saveUserData(data) {
  const user = getCurrentUser();
  if (!user) return;
  localStorage.setItem(`data_${user.username}`, JSON.stringify(data));
}
