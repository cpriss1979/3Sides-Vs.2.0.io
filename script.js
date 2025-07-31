
// --------------------- SUPPORT LIST ---------------------
function saveSupport() {
  const name = document.getElementById("name").value.trim();
  const relationship = document.getElementById("relationship").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name && !relationship && !phone) return;

  const supportList = JSON.parse(localStorage.getItem("supportPeople")) || [];
  supportList.push({ name, relationship, phone });
  localStorage.setItem("supportPeople", JSON.stringify(supportList));

  document.getElementById("name").value = "";
  document.getElementById("relationship").value = "";
  document.getElementById("phone").value = "";

  displaySupport();
}

function deleteSupport(index) {
  const supportList = JSON.parse(localStorage.getItem("supportPeople")) || [];
  supportList.splice(index, 1);
  localStorage.setItem("supportPeople", JSON.stringify(supportList));
  displaySupport();
}

function displaySupport() {
  const list = JSON.parse(localStorage.getItem("supportPeople")) || [];
  const ul = document.getElementById("savedSupport");
  ul.innerHTML = "";

  list.forEach((person, index) => {
    const li = document.createElement("li");
    li.className = "support-clean";
    li.textContent = `📞 ${person.name} (${person.relationship}) ${person.phone}`;

    const button = document.createElement("button");
    button.textContent = "❌";
    button.className = "delete-button-inline";
    button.onclick = () => deleteSupport(index);

    li.appendChild(button);
    ul.appendChild(li);
  });
}

function printSupportList() {
  const section = document.querySelector(".saved-section").outerHTML;
  const html = `
    <html>
    <head>
      <title>Print Support List</title>
      <style>
        body {
          font-family: Arial;
          padding: 2rem;
          background-color: #fffafc;
          color: #4a2c2a;
        }
      
      </style>
    </head>
    <body>
      ${section}
    </body>
    </html>
  `;

  function printSupportList() {
    window.print();
  }

  function printPlan() {
    window.print();
  }

}

// --------------------- WELLNESS PLAN ---------------------
function savePlan() {
  const plan = {
    wellnessLook: document.getElementById('wellnessLook').value,
    dailyHabits: document.getElementById('dailyHabits').value,
    triggerList: document.getElementById('triggerList').value,
    afterTriggered: document.getElementById('afterTriggered').value,
    warningSigns: document.getElementById('warningSigns').value,
    actionPlan: document.getElementById('actionPlan').value,
    anotherAction: document.getElementById('anotherAction').value
  };

  localStorage.setItem('wellnessPlan', JSON.stringify(plan));
  displaySavedPlan();
}

function displaySavedPlan() {
  const saved = JSON.parse(localStorage.getItem('wellnessPlan'));
  if (!saved) return;

  document.getElementById('displayWellnessLook').textContent = saved.wellnessLook || '';
  document.getElementById('displayDailyHabits').textContent = saved.dailyHabits || '';
  document.getElementById('displayTriggerList').textContent = saved.triggerList || '';
  document.getElementById('displayAfterTriggered').textContent = saved.afterTriggered || '';
  document.getElementById('displayWarningSigns').textContent = saved.warningSigns || '';
  document.getElementById('displayActionPlan').textContent = saved.actionPlan || '';
  document.getElementById('displayAnotherAction').textContent = saved.anotherAction || '';
}


function resetPlan() {
  if (confirm("Are you sure you want to reset your wellness plan? This will delete all saved data.")) {
    localStorage.removeItem('wellnessPlan');
    document.getElementById('wellnessForm').reset();

    document.getElementById('displayWellnessLook').textContent = '';
    document.getElementById('displayDailyHabits').textContent = '';
    document.getElementById('displayTriggerList').textContent = '';
    document.getElementById('displayAfterTriggered').textContent = '';
    document.getElementById('displayWarningSigns').textContent = '';
    document.getElementById('displayActionPlan').textContent = '';
    document.getElementById('displayAnotherAction').textContent = '';
  }
}

function printPlan() {
  const savedPlanElement = document.getElementById("savedPlan");

  if (!savedPlanElement) {
    alert("No saved plan to print.");
    return;
  }

  const savedContent = savedPlanElement.outerHTML;

  const printWindow = window.open('', '', 'width=850,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print My Wellness Plan</title>
        <style>
          body {
            font-family: Georgia;
            padding: 2rem;
            background: #fffafc;
            color:rgb(46, 46, 57);
          }
          h2, h3 {
            color: #b04bb3;
          }
          strong {
            color:rgb(207, 125, 225);
          }
          p {
            margin: 0.5rem 0;
            font-size: 1.1rem;
          }
          .saved-section {
            background-color: #fdf0f4;
            padding: 1rem;
            border-radius: 1rem;
            border: 2px dashed #ce85a6;
          }
        </style>
      </head>
      <body>
        ${savedContent}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };
}

// --------------------- AFFIRMATIONS ---------------------
// 🎵 Create and preload the audio element
const dingSound = new Audio("chime.mp3");
dingSound.preload = "auto";

let soundEnabled = false; // 🌟 Only play sound after user interacts

// 🌟 Array of affirmations
const affirmations = [
  "You are n🚫t your diagnosis. You are n🚫t a stereotype.",
  "You've been through worse ⛈️ days, you can get through this day too 🤗.",
  "Your feelings are valid. Be assertive.",
  "Everyday you come closer 🎯 to reaching your goals.",
  "Your days will never be the same. You will never stay down ☀️.",
  "Sometimes you have to take life 1 second ⏱️ at a time. You've got this.",
  "How do you eat an elephant 🐘? One bite at a time.",
  "You are never 'always' angry/sad/mad/happy! You will bounce back.",
  "You are never alone ✝.",
  "Sometimes you just need to rest ❤️‍🩹 and that's ok .",
  "You accomplish much on a tough day, by waking up and facing the day.",
  "You surround yourself with others that love ❤️ you.",
  "You are strong, smart, kind, and worthy to be loved.",
  "It's not how you start the race... it's how you finish it ⌛️.",
  "Sometimes we all need a little help. It's ok to ask.",
  "God loves ❤️ you!",
  "God created you, and God doesn't make mistakes.",
  "Never let fear win! Don't give up! Try/try again!",
  "You might be nothing to everyone, but to someone you're everything.",
  "Everyone has good and bad days, everyone.",
  "God will protect you.",
  "God will guide you.",
  "Someone loves 💖you.",
  "Even if you feel alone, your not. ✞ God is always there.",
  "You have a beautiful heart 💙.",
  "You must try, to succeed",
  "Jesus loves me this I know, for the Bible tells me so.",
  "God has big plans for you here.",
  "Your smile brightens the world.",
  "I forgive me, I forgive myself for my mistakes and bad choices.",
  "Because of you, this world is a better place.",
  "Like a 'bumblebee' is - You're essential, gentle and strong.",
  "'A' is for always, 'B' is for bounceback, 'C' is for can do."
];

// 🌈 Function to show a random affirmation
function showAffirmation() {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  const message = affirmations[randomIndex];

  if (soundEnabled) {
    dingSound.currentTime = 0;
    dingSound.play().catch((e) => {
      console.log("Sound couldn't play yet: ", e);
    });
  }

  // Create a pop-up styled box
  const popup = document.createElement("div");
  popup.className = "affirmation-popup";
  popup.textContent = message;
  document.body.appendChild(popup);

  // Fade out after a few seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 1400);
  }, 1400);
}

// 🛎️ Enable sound after first interaction
function enableSound() {
  soundEnabled = true;
  document.removeEventListener('click', enableSound);
  document.removeEventListener('touchstart', enableSound);

  showAffirmation(); // 🌸 THIS LINE IS CRUCIAL — it shows the affirmation now

  function createRandomSparkles(containerSelector, sparkleCount = 25) {
    const container = document.querySelector(containerSelector);

    if (!container) return;

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');

      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 3}s`;
      sparkle.style.animationDuration = `${2 + Math.random() * 2.5}s`;

      container.appendChild(sparkle);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  createRandomSparkles('.dreamy-box'); // ✨ Apply to dreamy-box
});

// --------------------- ON PAGE LOAD ---------------------
window.onload = function () {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    const userData = JSON.parse(localStorage.getItem(`data_${user.username}`) || "{}");
    if (userData.theme) {
      setTheme(userData.theme);
    }
  }

  if (document.getElementById('displayWellnessLook')) {
    displaySavedPlan();
  }

  // ✅ THIS checks if user exists and shows the theme link
  if (user && document.getElementById('theme.html')) {
    document.getElementById('themeLink').style.display = 'block';
  }

  // 🔊 Sound setup
  document.addEventListener('click', enableSound, { once: true });
  document.addEventListener('touchstart', enableSound, { once: true });
};

// --------------------- Theme --------------------------------
const allThemes = [
  'theme-moonlight', 'theme-bingo', 'theme-brady', 'theme-peach', 'theme-moonlight2', 'theme-shortcake', 'theme-bubby-bear', 'theme-bumblebee', 'theme-dolphin', 'theme-arcade', 'theme-green', 'theme-pink',
  'theme-original', 'theme-pinklight', 'theme-purple',
  'theme-greenmed', 'theme-pinkmed',
  'theme-darkblue', 'theme-darkgreen', 'theme-darkrose'
];

function setTheme(theme) {
  // Remove all previous theme classes
  allThemes.forEach(t => {
    document.body.classList.remove(t);
    document.documentElement.classList.remove(t);
  });

  // Add the selected theme class
  const themeClass = `theme-${theme}`;
  document.body.classList.add(themeClass);
  document.documentElement.classList.add(themeClass);

  // Save theme to user data
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    const dataKey = `data_${user.username}`;
    const userData = JSON.parse(localStorage.getItem(dataKey) || "{}");
    userData.theme = theme;
    localStorage.setItem(dataKey, JSON.stringify(userData));
  }
}

function loadUserTheme() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  const userData = JSON.parse(localStorage.getItem(`data_${user.username}`) || "{}");
  const theme = userData.theme;
  if (!theme) return;

  // Remove previous themes
  allThemes.forEach(t => {
    document.body.classList.remove(t);
    document.documentElement.classList.remove(t);
  });

  // Apply saved theme
  const themeClass = `theme-${theme}`;
  document.body.classList.add(themeClass);
  document.documentElement.classList.add(themeClass);
}

