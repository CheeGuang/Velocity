$(document).ready(function () {
  // Listen for clicks on the "To Payment" button
  $("#toPaymentButton").click(function (e) {
    // Prevent the default action of the button click to manually handle the redirection
    e.preventDefault();

    // Check if the "Apply Cashback" checkbox is checked
    var isCashbackApplied = $("#applyCashbackButton").is(":checked");

    // Encode the cashback application status into the URI
    var redirectTo = "payment.html";
    if (isCashbackApplied) {
      redirectTo += "?applyCashback=true";
    } else {
      redirectTo += "?applyCashback=false";
    }

    // Redirect to the modified URI
    window.location.href = redirectTo;
  });
});
