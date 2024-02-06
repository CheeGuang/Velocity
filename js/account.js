$(document).ready(function () {
  customerData = JSON.parse(localStorage.getItem("customerData"));
  if (customerData != null) {
    $("#avatar").attr("src", customerData["imageUrl"]);
    $("#username").text(
      `${customerData["firstName"]} ${customerData["lastName"]}`
    );
    $("#email").text(customerData["email"]);
    $("#pointTrackingSection-points").text(customerData["points"]);
    $("#rebateAmt").text(`S$${(customerData["points"] / 100).toFixed(2)}`);
    $("#personal-name").text(
      `${customerData["firstName"]} ${customerData["lastName"]}`
    );
    $("#personal-email").text(customerData["email"]);
  }
});
