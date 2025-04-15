"use strict";

const $ = document;

const colorInput1 = $.querySelector("#color-input1");
const colorInput2 = $.querySelector("#color-input2");
const gradientPreview = $.querySelector(".gradient-preview");
const directionButtons = $.querySelectorAll(".arrow-component");
const previewText = $.querySelector("#preview-text");

let selectedDirection = "to right";

// -------------------- Load From LocalStorage --------------------
window.addEventListener("DOMContentLoaded", () => {
  const savedColor1 = localStorage.getItem("color1");
  const savedColor2 = localStorage.getItem("color2");
  const savedDirection = localStorage.getItem("direction");

  if (savedColor1) {
    colorInput1.value = savedColor1;
  }

  if (savedColor2) {
    colorInput2.value = savedColor2;
  }

  if (savedDirection) {
    selectedDirection = savedDirection;

    // Highlight the selected direction button
    directionButtons.forEach((btn) => {
      if (btn.dataset.dir === selectedDirection) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  setColor(colorInput1.value, colorInput2.value, selectedDirection);
});

// -------------------- Event Listeners --------------------
directionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedDirection = btn.dataset.dir;

    directionButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    setColor(colorInput1.value, colorInput2.value, selectedDirection);
  });
});

colorInput1.addEventListener("input", () => {
  setColor(colorInput1.value, colorInput2.value, selectedDirection);
});

colorInput2.addEventListener("input", () => {
  setColor(colorInput1.value, colorInput2.value, selectedDirection);
});

// -------------------- Set Color & Save --------------------
function setColor(color1, color2, direction = "to right") {
  const cssText = `background: linear-gradient(${direction}, ${color1}, ${color2});`;
  previewText.innerHTML = cssText;
  gradientPreview.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;

  // Save to localStorage
  localStorage.setItem("color1", color1);
  localStorage.setItem("color2", color2);
  localStorage.setItem("direction", direction);
}

// -------------------- Copy to Clipboard --------------------
previewText.addEventListener("click", () => {
  const cssText = `background: linear-gradient(${selectedDirection}, ${colorInput1.value}, ${colorInput2.value});`;

  navigator.clipboard.writeText(cssText).then(() => {
    previewText.innerHTML = `${cssText} <span class="text-green-600 ml-2">✔ Copied!</span>`;

    setTimeout(() => {
      previewText.textContent = cssText;
    }, 2000);
  });
});
