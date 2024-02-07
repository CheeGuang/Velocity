function showAnimation() {
  document.querySelector("dotlottie-player").style.display = "block";
  setTimeout(() => {
    document.querySelector("dotlottie-player").style.display = "none";
  }, "1200");
}
