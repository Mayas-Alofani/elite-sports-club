// PART 2: Scroll-triggered Back to Top button and real-time footer clock.
(function () {
  "use strict";

  var topButton = document.getElementById("back-to-top");
  var clock = document.getElementById("live-clock");

  // Display the button only after the visitor scrolls down 250 pixels.
  function updateBackToTop() {
    if (topButton) {
      topButton.hidden = window.scrollY <= 250;
    }
  }

  if (topButton) {
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    topButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    });
    updateBackToTop();
  }

  // Show the visitor's local clock and refresh it every second.
  function updateClock() {
    if (clock) {
      var now = new Date();
      clock.textContent = now.toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      });
      clock.dateTime = now.toISOString();
    }
  }

  if (clock) {
    updateClock();
    window.setInterval(updateClock, 1000);
  }
}());
