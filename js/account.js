$(document).ready(function () {
  customerData = JSON.parse(localStorage.getItem("customerData"));
  if (customerData != null) {
    $("#avatar").attr("src", customerData["imageUrl"]);
    $("#username").text(
      `${customerData["firstName"]} ${customerData["lastName"]}`
    );
    $("#email").text(customerData["email"]);
    if (!customerData["points"]) {
      $("#pointTrackingSection-points").text(
        `${customerData["points"]} Points`
      );
      $("#rebateAmt").text(`S$${(customerData["points"] / 100).toFixed(2)}`);
    }

    $("#personal-name").text(
      `${customerData["firstName"]} ${customerData["lastName"]}`
    );
    $("#personal-email").text(customerData["email"]);
  }

  $("#sign-out-btn").click(function () {
    console.log("Sign Out");
    localStorage.removeItem("customerData");
    localStorage.removeItem("customersData");
    localStorage.removeItem("customerRestDBData");
    localStorage.removeItem("cartData");
    window.location.href = "index.html";
  });
});
