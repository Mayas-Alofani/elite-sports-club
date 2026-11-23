// Theme switcher (light / dark). The choice is saved in localStorage
// so it is kept on every page of the website.
var currentTheme = localStorage.getItem("theme");

if (currentTheme !== "dark") {
  currentTheme = "light";
}

function applyTheme() {
  var themeButton = document.getElementById("theme-toggle");

  if (currentTheme == "dark") {
    document.body.classList.add("dark-theme");
    if (themeButton) {
      themeButton.innerHTML = "Switch to Light Theme";
    }
  } else {
    document.body.classList.remove("dark-theme");
    if (themeButton) {
      themeButton.innerHTML = "Switch to Dark Theme";
    }
  }
}

function switchTheme() {
  if (currentTheme == "light") {
    currentTheme = "dark";
  } else {
    currentTheme = "light";
  }

  localStorage.setItem("theme", currentTheme);
  applyTheme();
}

applyTheme();

// The toggle button exists only on the Home page
var toggleButton = document.getElementById("theme-toggle");
if (toggleButton) {
  toggleButton.onclick = switchTheme;
}
