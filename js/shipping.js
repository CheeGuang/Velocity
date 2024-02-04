$(document).ready(function () {
  // If customer already has saved Address, auto fill the form with those info
  let customerData = JSON.parse(localStorage.getItem("customerData"));
  if (customerData != null) {
    if (customerData["cardNumber"] != null) {
      $("#cardNumberHolder").val(customerData["cardNumber"]);
      $("#expirationDateHolder").val(customerData["expiryDate"]);
      $("#securityCodeHolder").val(customerData["cvv"]);
      $("#cardNameHolder").val(customerData["cardName"]);
    }
  }

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

    // Saving Address
    // Check if the "Save my details" checkbox is checked
    if ($("#saveUserInfo").is(":checked")) {
      if (customerData == null) {
        $("#membershipModal").modal("show"); // Show the modal
        event.stopPropagation();
      } else {
        // Collect all the input values

        var firstName = $("#fname").val();
        var lastName = $("#lname").val();
        var address = $("#search_input").val();
        var unitNumber = $("#unitNo").val();
        var phoneNumber = $("#phoneNo").val();
        // Add any other fields you need here

        // Assigning card details to customerData object
        customerData["firstName"] = firstName;
        customerData["lastName"] = lastName;
        customerData["address"] = address;
        customerData["unitNumber"] = unitNumber;
        customerData["phoneNumber"] = phoneNumber;

        // Stringtify customerData
        customerData = JSON.stringify(customerData);

        // Get customer _id
        var customersData = JSON.parse(localStorage.getItem("customersData"));
        let customer_id;
        for (let i = 0; i < customersData.length; i++) {
          if (customersData[i]["email"] == JSON.parse(customerData)["email"]) {
            customer_id = customersData[i]["_id"];
            break;
          }
        }
        console.log(customer_id);

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
          window.location.href = "review.html";
        });
      }
    } else {
      window.location.href = "review.html";
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
