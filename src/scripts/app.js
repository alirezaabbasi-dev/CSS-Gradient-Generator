"use strict";

const $ = document;

const colorInput1 = $.querySelector("#color-input1");
const colorInput2 = $.querySelector("#color-input2");
const gradientPreview = $.querySelector(".gradient-preview");
const directionButtons = $.querySelectorAll(".arrow-component");
const previewText = $.querySelector("#preview-text");

let selectedDirection = "to right"; // Default direction
let currentCSSText = ""; // stores pure css for copy

// Change gradient direction on arrow icon click
directionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedDirection = btn.dataset.dir;

    directionButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    setColor(colorInput1.value, colorInput2.value, selectedDirection);
  });
});

function setColor(color1, color2, direction = "to right") {
  currentCSSText = `background: linear-gradient(${direction}, ${color1}, ${color2});`;
  previewText.textContent = currentCSSText;
  gradientPreview.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
}

colorInput1.addEventListener("input", () => {
  setColor(colorInput1.value, colorInput2.value, selectedDirection);
});

colorInput2.addEventListener("input", () => {
  setColor(colorInput1.value, colorInput2.value, selectedDirection);
});

// Copy to clipboard
previewText.addEventListener("click", () => {
  navigator.clipboard.writeText(currentCSSText).then(() => {
    previewText.innerHTML = `<span class="text-sm">${currentCSSText}</span><span class="text-green-600 ml-2">✔ Copied!</span>`;

    setTimeout(() => {
      previewText.textContent = currentCSSText;
    }, 2000);
  });
});
