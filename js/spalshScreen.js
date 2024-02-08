$(document).ready(function () {
  // Check if the 'splashScreenShown' flag is stored in sessionStorage
  if (!sessionStorage.getItem("splashScreenShown")) {
    // If not, show the splash screen and set the flag
    setTimeout(function () {
      $("#splash-screen-background").fadeOut(1000, function () {
        // After the fade-out is complete, hide or remove the splash screen
        $(this).hide();
        // Set the 'splashScreenShown' flag in sessionStorage
        sessionStorage.setItem("splashScreenShown", "true");
      });
    }, 4000);
  } else {
    // If the splash screen has already been shown in the session, hide it immediately
    $("#splash-screen-background").hide();
  }
});
