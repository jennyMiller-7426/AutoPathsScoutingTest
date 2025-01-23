// Canvas setup
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Variables for drawing
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Drawing functions
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

// Clear canvas
document.getElementById("clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Submit drawing
document.getElementById("submitDrawing").addEventListener("click", () => {
    const imageData = canvas.toDataURL("image/png");
    const formEntryID = "entry.123456789"; // Replace with your Google Form entry ID
    const formAction = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse"; // Replace with your Form ID

    // Create form data
    const formData = new FormData();
    formData.append(formEntryID, imageData);

    // Submit the form
    fetch(formAction, {
        method: "POST",
        body: formData,
        mode: "no-cors" // Google Forms requires no-cors mode
    }).then(() => {
        alert("Drawing submitted successfully!");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }).catch(err => {
        alert("Submission failed: " + err.message);
    });
});

// Event listeners for drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
