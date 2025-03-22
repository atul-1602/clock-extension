// Cache DOM elements
const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".minute-hand");
const hourHand = document.querySelector(".hour-hand");
const currentDayEl = document.querySelector(".current-day");
const currentDateEl = document.querySelector(".current-date");
const progressFill = document.querySelector(".progress-fill");
const progressPercentage = document.querySelector(".progress-percentage");
const progressTextEl = document.querySelector(".progress-text");

// Update clock hands
function updateClock() {
  // Get current time directly
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12 || 12; // Convert to 12-hour format

  // Calculate rotation angles correctly
  const secondsDegrees = seconds * 6;
  const minutesDegrees = minutes * 6 + seconds * 0.1;
  const hoursDegrees = hours * 30 + minutes * 0.5;

  // Apply rotations
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

// Update date and work progress
function updateDateAndProgress() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get current time directly
  const now = new Date();

  const day = days[now.getDay()];
  const date = `${
    months[now.getMonth()]
  } ${now.getDate()}, ${now.getFullYear()}`;

  // Calculate work progress
  let progress = 0;
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Work day boundaries (9 AM to 6 PM)
  const workDayStart = 9;
  const workDayEnd = 18;

  if (currentDay >= 1 && currentDay <= 5) {
    if (currentHour < workDayStart) {
      progress = 0;
      progressText = "Work day hasn't started";
    } else if (currentHour >= workDayEnd) {
      progress = 100;
      progressText = "Work day complete";
    } else {
      const totalWorkMinutes = (workDayEnd - workDayStart) * 60;
      const currentWorkMinutes =
        (currentHour - workDayStart) * 60 + currentMinute;
      progress = (currentWorkMinutes / totalWorkMinutes) * 100;

      const minutesLeft = totalWorkMinutes - currentWorkMinutes;
      const hoursLeft = Math.floor(minutesLeft / 60);
      const minsLeft = Math.floor(minutesLeft % 60);
      progressText = `${hoursLeft}h ${minsLeft}m remaining today`;
    }
  } else {
    progress = currentDay === 0 ? 0 : 100;
    progressText =
      currentDay === 0
        ? "Weekend - Work week starts tomorrow"
        : "Work week complete";
  }

  // Update DOM
  currentDayEl.textContent = day;
  currentDateEl.textContent = date;
  progressFill.style.width = `${progress}%`;
  progressPercentage.textContent = `${Math.round(progress)}%`;
  progressTextEl.textContent = progressText;
}

// Function to update everything
function updateAll() {
  updateClock();
  updateDateAndProgress();
}

// Initial update
updateAll();

// Update every second
setInterval(updateAll, 1000);

// Notes functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggleNotesBtn = document.getElementById("toggleNotes");
  const notesSection = document.getElementById("notesSection");
  const closeNotesBtn = document.querySelector(".close-notes");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const addTaskBtn = document.getElementById("addTask");
  const addQueryBtn = document.getElementById("addQuery");
  const newTaskInput = document.getElementById("newTask");
  const newQueryInput = document.getElementById("newQuery");
  const tasksListElement = document.getElementById("tasksList");
  const queriesListElement = document.getElementById("queriesList");

  // Load saved data from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let queries = JSON.parse(localStorage.getItem("queries")) || [];

  // Toggle notes section
  toggleNotesBtn.addEventListener("click", () => {
    notesSection.classList.add("active");
  });

  closeNotesBtn.addEventListener("click", () => {
    notesSection.classList.remove("active");
  });

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tabId = btn.dataset.tab;
      document.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.remove("active");
      });
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Save data to localStorage
  function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("queries", JSON.stringify(queries));
  }

  // Create item HTML
  function createItemElement(item, type) {
    const div = document.createElement("div");
    div.className = `item ${item.completed ? "completed" : ""}`;
    div.innerHTML = `
            <span class="item-text">${item.text}</span>
            <div class="item-actions">
                <button class="complete-btn">✓</button>
                <button class="edit-btn">✎</button>
                <button class="delete-btn">×</button>
            </div>
        `;

    // Complete button
    div.querySelector(".complete-btn").addEventListener("click", () => {
      item.completed = !item.completed;
      div.classList.toggle("completed");
      saveData();
    });

    // Edit button
    div.querySelector(".edit-btn").addEventListener("click", () => {
      const newText = prompt("Edit item:", item.text);
      if (newText !== null && newText.trim() !== "") {
        item.text = newText.trim();
        div.querySelector(".item-text").textContent = newText;
        saveData();
      }
    });

    // Delete button
    div.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this item?")) {
        div.remove();
        const array = type === "task" ? tasks : queries;
        const index = array.indexOf(item);
        if (index > -1) {
          array.splice(index, 1);
          saveData();
        }
      }
    });

    return div;
  }

  // Render items
  function renderItems() {
    tasksListElement.innerHTML = "";
    queriesListElement.innerHTML = "";

    tasks.forEach((task) => {
      tasksListElement.appendChild(createItemElement(task, "task"));
    });

    queries.forEach((query) => {
      queriesListElement.appendChild(createItemElement(query, "query"));
    });
  }

  // Add new task
  addTaskBtn.addEventListener("click", () => {
    const text = newTaskInput.value.trim();
    if (text) {
      const task = { text, completed: false };
      tasks.push(task);
      tasksListElement.appendChild(createItemElement(task, "task"));
      newTaskInput.value = "";
      saveData();
    }
  });

  // Add new query
  addQueryBtn.addEventListener("click", () => {
    const text = newQueryInput.value.trim();
    if (text) {
      const query = { text, completed: false };
      queries.push(query);
      queriesListElement.appendChild(createItemElement(query, "query"));
      newQueryInput.value = "";
      saveData();
    }
  });

  // Handle Enter key
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTaskBtn.click();
  });

  newQueryInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addQueryBtn.click();
  });

  // Initial render
  renderItems();

  // Add this new code for window popup functionality
  const openWindowBtn = document.getElementById("openWindowBtn");
  let newWindow = null;

  openWindowBtn.addEventListener("click", () => {
    // Open a new window
    newWindow = window.open(
      "", // URL - empty means a blank page
      "CustomWindow", // Window name
      "width=400,height=300,resizable=yes,scrollbars=yes,status=yes"
    );

    // Add content to the new window
    newWindow.document.write(`
            <html>
                <head>
                    <title>Custom Popup Window</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            background-color: #f0f0f0;
                        }
                        h1 {
                            color: #333;
                        }
                        button {
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                        button:hover {
                            background-color: #45a049;
                        }
                    </style>
                </head>
                <body>
                    <h1>Custom Popup Window</h1>
                    <p>This is a custom popup window.</p>
                    <button onclick="window.close()">Close Window</button>
                </body>
            </html>
        `);

    // Add event listener for when the window closes
    const checkWindow = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(checkWindow);
      }
    }, 500);
  });
});
// Shortcuts functionality
const addShortcutBtn = document.getElementById("addShortcut");
const shortcutsList = document.getElementById("shortcutsList");
const shortcutModal = document.getElementById("shortcutModal");
const closeModal = document.querySelector(".close-modal");
const saveShortcutBtn = document.getElementById("saveShortcut");
const cancelShortcutBtn = document.getElementById("cancelShortcut");
const shortcutNameInput = document.getElementById("shortcutName");
const shortcutUrlInput = document.getElementById("shortcutUrl");

// Debug logging to check if elements are found
console.log("Elements found:", {
  addShortcutBtn,
  shortcutModal,
  closeModal,
  saveShortcutBtn,
  cancelShortcutBtn,
});

// Load shortcuts from localStorage
let shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [
  // Default shortcuts
  {
    name: "YouTube",
    url: "https://youtube.com",
    icon: "https://www.youtube.com/favicon.ico",
  },
  {
    name: "Gmail",
    url: "https://mail.google.com",
    icon: "https://mail.google.com/favicon.ico",
  },
  {
    name: "Google",
    url: "https://google.com",
    icon: "https://www.google.com/favicon.ico",
  },
];

// Save shortcuts to localStorage
function saveShortcuts() {
  localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
}

// Create shortcut element
function createShortcutElement(shortcut) {
  const div = document.createElement("div");
  div.className = "shortcut-item";
  
  // Get first character and generate a random background color
  const firstChar = shortcut.name.charAt(0).toUpperCase();
  const colors = [
    "#FF0000", // Bright Red
    "#FF4500", // Orange Red
    "#FF8C00", // Dark Orange
    "#FFD700", // Gold
    "#00FF00", // Neon Green
    "#00FFFF", // Aqua Cyan
    "#1E90FF", // Dodger Blue
    "#8A2BE2", // Blue Violet
    "#FF1493"  // Deep Pink
];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  div.innerHTML = `
        <div class="shortcut-avatar" style="background-color: ${randomColor}">
            ${firstChar}
        </div>
        <span class="shortcut-name">${shortcut.name}</span>
        <button class="delete-shortcut">&times;</button>
    `;

  // Open URL on click (for both avatar and name)
  const clickableElements = [
      div.querySelector(".shortcut-avatar"),
      div.querySelector(".shortcut-name")
  ];

  clickableElements.forEach(element => {
      element.addEventListener("click", () => {
          try {
              if (chrome && chrome.tabs) {
                  chrome.tabs.create({ url: shortcut.url });
              } else {
                  window.open(shortcut.url, '_blank');
              }
          } catch (e) {
              window.open(shortcut.url, '_blank');
          }
      });
  });

  // Delete shortcut
  div.querySelector(".delete-shortcut").addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm(`Delete ${shortcut.name} shortcut?`)) {
      div.remove();
      const index = shortcuts.indexOf(shortcut);
      if (index > -1) {
        shortcuts.splice(index, 1);
        saveShortcuts();
      }
    }
  });

  return div;
}
console.log("debug", addShortcutBtn);

// Show modal
if (addShortcutBtn) {
  addShortcutBtn.addEventListener("click", () => {
    console.log("Add shortcut button clicked");
    if (shortcutModal) {
      shortcutModal.classList.add("active");
      shortcutNameInput.value = "";
      shortcutUrlInput.value = "";
      shortcutNameInput.focus();
    } else {
      console.error("Modal element not found");
    }
  });
} else {
  console.error("Add shortcut button not found");
}

// Hide modal function
function hideModal() {
  if (shortcutModal) {
    shortcutModal.classList.remove("active");
  }
}

// Add event listeners for modal controls
if (closeModal) {
  closeModal.addEventListener("click", hideModal);
}
if (cancelShortcutBtn) {
  cancelShortcutBtn.addEventListener("click", hideModal);
}

// Save new shortcut
if (saveShortcutBtn) {
  saveShortcutBtn.addEventListener("click", () => {
    const name = shortcutNameInput.value.trim();
    let url = shortcutUrlInput.value.trim();

    if (name && url) {
      try {
        // Add https:// if no protocol specified
        if (!url.startsWith("http")) {
          url = "https://" + url;
        }

        const urlObj = new URL(url);
        // Use Google's favicon service
        const icon = `https://www.google.com/s2/favicons?domain=${url}&sz=64`;
        const shortcut = { name, url, icon };
        
        shortcuts.push(shortcut);
        shortcutsList.appendChild(createShortcutElement(shortcut));
        saveShortcuts();
        hideModal();
      } catch (e) {
        alert("Please enter a valid URL");
      }
    } else {
      alert("Please fill in both name and URL");
    }
  });
}

// Handle Enter key in inputs
if (shortcutUrlInput) {
  shortcutUrlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveShortcutBtn.click();
    }
  });
}

// Render shortcuts
function renderShortcuts() {
  if (shortcutsList) {
    shortcutsList.innerHTML = "";
    shortcuts.forEach((shortcut) => {
      shortcutsList.appendChild(createShortcutElement(shortcut));
    });
  }
}

// Initial render of shortcuts
renderShortcuts();
