function showAnimation() {
  document.querySelector("dotlottie-player").style.display = "block";
}
// Sleep function in JavaScript using setTimeout
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Example of an async function that does some task
async function showAnimationAsync() {
  // Simulate some async work with a promise, like a fetch call
  return new Promise((resolve) => {
    setTimeout(() => {
      document.querySelector("dotlottie-player").style.display = "block";
      resolve();
    }, 2500); // Simulates async work taking 1 second
  });
}

function showAnimationContinuously() {
  setInterval(async () => {
    await showAnimationAsync();
    // Additional code can be run here after asyncTask completes
  }, 2000); // Runs asyncTask every 2 seconds
  // document.querySelector("dotlottie-player").style.display = "block";
}
