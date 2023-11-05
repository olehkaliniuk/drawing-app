const canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

let isDrawing = false;
var brushWidth;
var sliderValue = document.getElementById("size-slider");

toolBtns = document.querySelectorAll(".tool");

colorBtns = document.querySelectorAll(".colors .option");
colorPicker = document.querySelector("#color-picker");

clearBtn = document.querySelector(".clear-canvas");

let selectedTool = "brush";
let selectedColor;

let prevMouseX, prevMouseY;
let snapshot;

const drawRect = (e) => {
  ctx.strokeRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
const startDrawing = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = sliderValue.value;
  ctx.strokeStyle = selectedColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};
const stopDrawing = () => {
  isDrawing = false;
};

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  if (selectedTool === "brush") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "eraser") {
    selectedColor = "#fff";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedTool = btn.id;
    console.log(selectedTool);
  });
});

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedColor = window
      .getComputedStyle(btn)
      .getPropertyValue("background-color");
  });
});

colorPicker.addEventListener("change", () => {
  colorPicker.parentElement.style.background = colorPicker.value;
  selectedColor = colorPicker.parentElement.style.background;
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
