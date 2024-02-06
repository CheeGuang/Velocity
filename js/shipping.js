$(document).ready(function () {
  // If customer already has saved Address, auto fill the form with those info
  let customerData = JSON.parse(localStorage.getItem("customerData"));
  if (customerData != null) {
    if (customerData["cardNumber"] != null) {
      $("#fname").val(customerData["firstName"]);
      $("#lname").val(customerData["lastName"]);
      $("#search_input").val(customerData["address"]);
      $("#unitNo").val(customerData["unitNumber"]);
      $("#phoneNo").val(customerData["phoneNumber"]);
    }
  }

  // Retrieve Query Parameters
  let DecodedQueryParams = retrieveAndDecodeQueryParams();

  // Submitting Form logic
  $("#submitBtn").click(function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Validating form
    var form = $(".needs-validation");
    if (form[0].checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      form.addClass("was-validated");
      return; // Exit the function if the form is not valid
    }
    form.addClass("was-validated");

    // Get shipping details
    let shippingDetails = getShippingDetails();

    // Saving Address
    // Check if the "Save my details" checkbox is checked
    if ($("#saveUserInfo").is(":checked")) {
      if (customerData == null) {
        $("#membershipModal").modal("show"); // Show the modal
        event.stopPropagation();
      } else {
        // Assigning card details to customerData object
        customerData["firstName"] = shippingDetails["firstName"];
        customerData["lastName"] = shippingDetails["lastName"];
        customerData["address"] = shippingDetails["address"];
        customerData["unitNumber"] = shippingDetails["unitNumber"];
        customerData["phoneNumber"] = shippingDetails["phoneNumber"];

        // Get customer _id
        customer_id = customerData["_id"];
        console.log(customer_id);

        // Stringtify customerData
        customerData = JSON.stringify(customerData);

        // Store new customerData in local storage
        localStorage.setItem("customerData", customerData);

        // Storing new customerData in database
        var settings = {
          async: true,
          crossDomain: true,
          url: `https://velocity-554e.restdb.io/rest/customer/${customer_id}`,
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "x-apikey": "65b03b109eb5ba00e57fa24e",
            "cache-control": "no-cache",
          },
          processData: false,
          data: customerData,
        };

        $.ajax(settings).done(function () {
          redirectToReview(DecodedQueryParams, shippingDetails);
        });
      }
    } else {
      redirectToReview(DecodedQueryParams, shippingDetails);
    }

    // Function to close the popup
    $("#closePopup").on("click", function () {
      $("#membershipModal").modal("hide"); // Close the modal
    });
  });

  // Display Estimated Delivery Time and Arrival Dynamically

  // Format the date as d/MMMM/yyyy
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Get today's date
  const today = new Date();

  // Calculate tomorrow's date by adding one day
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toLocaleDateString("en-GB", options);

  // Calculate and format the date for the next 3 days
  const threeDays = new Date(today);
  threeDays.setDate(threeDays.getDate() + 3);
  const formattedThreeDays = threeDays.toLocaleDateString("en-GB", options);

  // Calculate and format the date for the next 5 days
  const fiveDays = new Date(today);
  fiveDays.setDate(fiveDays.getDate() + 5);
  const formattedFiveDays = fiveDays.toLocaleDateString("en-GB", options);

  // Display Estimated Delivery Time and Arrival of Standard Shipping Dynamically
  $("#standardShippingDetailsText").text(
    `Estimated Arrival Date: ${formattedThreeDays} - ${formattedFiveDays}`
  );

  // Display Estimated Delivery Time and Arrival of Next-Day Shipping Dynamically
  $("#nextDayShippingDetailsText").text(
    `Estimated Arrival Date: ${formattedTomorrow}`
  );
});

// Get Shipping Method
function getShippingDetails() {
  // Get the selected shipping method
  var selectedShippingMethod = $('input[name="exampleRadios"]:checked').val(); // Assuming value attribute holds the method identifier

  // Collect shipping details
  var shippingDetails = {
    firstName: $("#fname").val(),
    lastName: $("#lname").val(),
    address: $("#search_input").val(),
    unitNumber: $("#unitNo").val(),
    phoneNumber: $("#phoneNo").val(),
    saveInfo: $("#saveUserInfo").is(":checked") ? "yes" : "no", // Encode as 'yes' or 'no'
    selectedShippingMethod: selectedShippingMethod, // Including the shipping method in the details
  };
  return shippingDetails;
}

// Redirect to review.html logic
function redirectToReview(DecodedQueryParams, selectedShippingMethod) {
  // Convert shippingDetails object into a query string
  var queryString = $.param(selectedShippingMethod);
  // Encode the selected payment and shipping methods in the URI
  var uri =
    "review.html?applyCashback=" +
    encodeURIComponent(DecodedQueryParams["applyCashback"]) +
    "&paymentMethod=" +
    encodeURIComponent(DecodedQueryParams["paymentMethod"]) +
    "&shippingDetails=" +
    encodeURIComponent(queryString);
  // Redirect the user to the shipping page with the selected payment and shipping methods
  window.location.href = uri;
}

// Function to get a query parameter by name, with explicit decoding
function getQueryParam(paramName) {
  // Use URLSearchParams to parse query parameters
  const urlParams = new URLSearchParams(window.location.search);
  // Retrieve the parameter and explicitly decode it
  const value = urlParams.get(paramName);
  return value ? decodeURIComponent(value) : null;
}

// Function to retrieve, decode, and display query parameters
function retrieveAndDecodeQueryParams() {
  // Decode the applyCashback and paymentMethod parameters from the URI
  const applyCashback = getQueryParam("applyCashback");
  const paymentMethod = getQueryParam("paymentMethod");

  return { applyCashback: applyCashback, paymentMethod: paymentMethod };
}
