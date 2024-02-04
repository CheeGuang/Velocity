$(document).ready(function () {
  // If customer already has saved credit card details previously, auto fill the form with those info
  let customerData = JSON.parse(localStorage.getItem("customerData"));
  if (customerData != null) {
    if (customerData["cardNumber"] != null) {
      $("#cardNumberHolder").val(customerData["cardNumber"]);
      $("#expirationDateHolder").val(customerData["expiryDate"]);
      $("#securityCodeHolder").val(customerData["cvv"]);
      $("#cardNameHolder").val(customerData["cardName"]);
    }
  }

  /**
   * Function to get the selected payment method and the checkbox status.
   */
  function getPaymentDetails() {
    // Get the value of the selected radio button
    var selectedPaymentMethod = $('input[name="exampleRadios"]:checked').val();

    // Check if the "Save Card Info" checkbox is checked
    var isSaveCardInfoChecked = $("#saveCardInfo").is(":checked");

    // Return an object with the payment method and checkbox status
    return {
      paymentMethod: selectedPaymentMethod,
      saveCardInfo: isSaveCardInfoChecked,
    };
  }

  // Example usage: Log the payment details when the review order button is clicked
  $("#submitBtn button").on("click", function (e) {
    e.preventDefault(); // Prevent the default button action if necessary
    var paymentDetails = getPaymentDetails();
    console.log(paymentDetails);
    if (paymentDetails["paymentMethod"] == "cardOpt") {
      // Check if the form is not valid
      var form = document.getElementById("creditCardForm");
      if (!form.checkValidity()) {
        event.preventDefault(); // Prevent default button behavior
        event.stopPropagation(); // Stop the event from propagating further
        form.classList.add("was-validated"); // Add Bootstrap validation class to show validation feedback

        // Optionally, alert the user or log to console
        // alert("Please correct the errors before proceeding.");
        console.log("Form is invalid. Stopping further processing.");

        return; // Stop further processing
      }

      // Check if customer has saved Credit Card details
      if (paymentDetails["saveCardInfo"] == true) {
        if (customerData == null) {
          console.log("Hi");
          $("#membershipModal").modal("show"); // Show the modal
        } else {
          // Get the credit card details from the form
          var cardNumber = $("#cardNumberHolder").val();
          var expirationDate = $("#expirationDateHolder").val();
          var securityCode = $("#securityCodeHolder").val();
          var cardName = $("#cardNameHolder").val();

          // Assigning card details to customerData object
          customerData["cardName"] = cardName;
          customerData["cardNumber"] = cardNumber;
          customerData["cvv"] = securityCode;
          customerData["expiryDate"] = expirationDate;

          // Stringtify customerData
          customerData = JSON.stringify(customerData);

          // Get customer _id
          var customersData = JSON.parse(localStorage.getItem("customersData"));
          let customer_id;
          for (let i = 0; i < customersData.length; i++) {
            if (
              customersData[i]["email"] == JSON.parse(customerData)["email"]
            ) {
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
            window.location.href = "shipping.html";
          });
        }
      } else {
        window.location.href = "shipping.html";
      }
    } else {
      window.location.href = "shipping.html";
    }
  });

  // Function to close the popup
  $("#closePopup").on("click", function () {
    $("#membershipModal").modal("hide"); // Close the modal
  });
});

function saveCardDetails() {
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
