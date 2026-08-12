/* =========================================================
   Mecko's Heating & Cooling — ai-assistant.js
   -----------------------------------------------------------
   IMPORTANT: This file only powers the VISUAL entry point for
   a future AI assistant (a launcher button + slide-up panel).
   It is intentionally NOT connected to any AI/chat backend.

   For a developer wiring this up later:
   - Replace `handleDemoSubmit()` with a call to your chat API.
   - `appendMessage(role, text)` already renders bubbles into
     the panel body, so you can reuse it for real responses.
   - The panel markup lives in each page's HTML inside the
     `.ai-assistant-panel` element — one shared structure.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  var launcher = document.querySelector(".ai-assistant-launcher");
  var panel = document.querySelector(".ai-assistant-panel");
  var closeBtn = document.querySelector(".ai-assistant-panel__close");
  var form = document.querySelector(".ai-assistant-panel__input");
  var body = document.querySelector(".ai-assistant-panel__body");

  if (!launcher || !panel) return;

  function openPanel() {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    launcher.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    launcher.setAttribute("aria-expanded", "false");
  }

  launcher.addEventListener("click", function () {
    if (panel.classList.contains("open")) {
      closePanel();
    } else {
      openPanel();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closePanel);
  }

  // Placeholder submit handler — hook a real AI backend here.
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      var value = input.value.trim();
      if (!value) return;

      appendMessage("user", value);
      input.value = "";

      // TODO: replace with a real API call, e.g.
      // fetch('/api/assistant', { method: 'POST', body: JSON.stringify({ message: value }) })
      window.setTimeout(function () {
        appendMessage(
          "assistant",
          "Thanks for the message! Our AI assistant isn't connected yet — call us at 765-447-7555 and our team will help right away."
        );
      }, 400);
    });
  }

  function appendMessage(role, text) {
    if (!body) return;
    var bubble = document.createElement("p");
    bubble.textContent = text;
    bubble.style.marginTop = "10px";
    bubble.style.padding = "10px 12px";
    bubble.style.borderRadius = "10px";
    bubble.style.fontSize = "0.85rem";
    if (role === "user") {
      bubble.style.background = "#eaf3fb";
      bubble.style.color = "#0b3358";
      bubble.style.marginLeft = "20%";
    } else {
      bubble.style.background = "#f6f8fb";
      bubble.style.color = "#5c6b7a";
      bubble.style.marginRight = "20%";
    }
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
  }
});
