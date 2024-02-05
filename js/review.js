$(document).ready(function () {
  var decodedParams = parseURLParams();

  console.log(decodedParams.applyCashback); // Output: cardOpt
  console.log(decodedParams.paymentMethod); // Output: cardOpt
  console.log(decodedParams.shippingDetails); // Output: Object containing the shipping details

  // Update PPayment Details
  $("#paymentMethodText").text(
    `Payment Method: ${
      decodedParams.paymentMethod == "cardOpt"
        ? "Credit Card"
        : "Cash on Delivery"
    }`
  );

  // Update Shipping Details
  $("#shippingOptionText").text(
    `Shipping Option: ${
      decodedParams.shippingDetails["selectedShippingMethod"] ==
      "standardShipping"
        ? "Standard Shipping"
        : "Next-Day Delivery"
    }`
  );

  $("#firstNameText").text(
    `First Name: ${decodedParams.shippingDetails["firstName"]}`
  );
  $("#lastNameText").text(
    `last Name: ${decodedParams.shippingDetails["lastName"]}`
  );
  $("#addressText").text(
    `Address: ${decodedParams.shippingDetails["address"]}`
  );
  $("#unitNumberText").text(
    `Unit Number: ${decodedParams.shippingDetails["unitNumber"]}`
  );
  $("#phoneNumberText").text(
    `Phone Number: ${decodedParams.shippingDetails["phoneNumber"]}`
  );

  $("#placeOrderButton").click(function (event) {
    // Prevent the default form submit action
    event.preventDefault();

    // Check if the form is valid
    if ($("#orderForm")[0].checkValidity() === false) {
      event.stopPropagation();
      $("#orderForm").addClass("was-validated");
    } else {
      // The checkbox is checked, proceed with further processing here
      // Remove customer's cart object in local storage
      localStorage.removeItem("cartData");

      let customerData = JSON.parse(localStorage.getItem("customerdata"));
      if (customerData != null) {
        delete customerData.cart;
        customerData["points"] = parseFloat(
          $("#total-points").text().replace("+ ", "").replace("Points", "")
        );
        localStorage.setItem("customerData", JSON.stringify(customerData));
        updateCustomerDataToRestDB();
      }
    }
  });
});

function parseURLParams() {
  var params = new URLSearchParams(window.location.search);
  var paymentMethod = params.get("paymentMethod");
  var shippingDetails = {};

  // Extract all parameters, assuming those not 'paymentMethod' belong to shippingDetails
  for (let [key, value] of params.entries()) {
    if (key !== "paymentMethod") {
      shippingDetails[key] = decodeURIComponent(value);
      console.log(shippingDetails[key]);
    }
  }
  // Function to convert the query string to an object
  function processShippingDetails(detailsString) {
    const details = {};

    // Split the string into key-value pairs
    detailsString.split("&").forEach((part) => {
      const [key, value] = part.split("=");
      // Decode URI component to handle spaces and special characters
      details[key] = decodeURIComponent(value);
    });

    return details;
  }

  shippingDetails = processShippingDetails(shippingDetails["shippingDetails"]);

  return { paymentMethod, shippingDetails };
}

function parseURLParams() {
  var params = new URLSearchParams(window.location.search);

  // Directly get 'paymentMethod' and 'applyCashback' parameters
  var paymentMethod = params.get("paymentMethod");
  var applyCashback = params.get("applyCashback") === "true"; // Convert to boolean

  var shippingDetails = {};

  // Extract all parameters
  for (let [key, value] of params.entries()) {
    if (key !== "paymentMethod" && key !== "applyCashback") {
      // Directly assign decoded values to shippingDetails if not processing as a single string
      shippingDetails[key] = decodeURIComponent(value);
    }
  }

  // Function to convert the query string to an object
  function processShippingDetails(detailsString) {
    const details = {};

    // Split the string into key-value pairs
    detailsString.split("&").forEach((part) => {
      const [key, value] = part.split("=");
      // Decode URI component to handle spaces and special characters
      details[key] = decodeURIComponent(value);
    });

    return details;
  }

  shippingDetails = processShippingDetails(shippingDetails["shippingDetails"]);

  return { paymentMethod, applyCashback, shippingDetails };
}

function updateCustomerDataToRestDB() {
  var newCustomerJSON = JSON.parse(localStorage.getItem("customerData"));
  // Updating cart of customer's account with cartArray in RestDB
  var settings = {
    async: true,
    crossDomain: true,
    url: `https://velocity-554e.restdb.io/rest/customer/${
      JSON.parse(localStorage.getItem("customerRestDBData"))["_id"]
    }`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "x-apikey": "65b03b109eb5ba00e57fa24e",
      "cache-control": "no-cache",
    },
    processData: false,
    data: JSON.stringify(newCustomerJSON),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
