function updateProgressBar() {
  var value = 0;
  var cart = JSON.parse(localStorage.getItem("cartData"));
  for (let i = 0; i < cart.length; i++) {
    value += Math.floor(cart[i][0]["price"]) * cart[i][1];
  }

  // Setting value as 200 if its more than 200
  if (value > 200) {
    value = 200;
  } else {
    $("#checkout-freeShippingBar-message").text(
      `Spend $${200 - value} more and get free shipping`
    );
  }
  value = value / 2;
  // Select the progress bar using jQuery and update its width and aria-valuenow attribute
  $("#checkout-freeShippingBar-bar").css("width", `${value}%`);
  $("#checkout-freeShippingBar-bar").attr("aria-valuenow", value);
}

// Example usage:
updateProgressBar(); // Updates the progress bar to 50%
function updateProgressBawr(amount, progressBar) {
  const percentage = (amount / 10) * 100;
  progressBar.css("width", percentage + "%");
  progressBar.text(amount + "/" + 10);
  progressBar.attr("aria-valuenow", amount);
}
