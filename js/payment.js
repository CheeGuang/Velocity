$(document).ready(function () {
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
    if (
      paymentDetails["paymentMethod"] == "cardOpt" &&
      paymentDetails["saveCardInfo"] == true
    ) {
      customerData = JSON.parse(localStorage.getItem("customerData"));
      if (customerData == null) {
        $("#membershipModal").modal("show"); // Show the modal
      } else {
        // Get the credit card details from the form
        var cardNumber = $("#cardNumberHolder").val();
        var expirationDate = $("#expirationDateHolder").val();
        var securityCode = $("#securityCodeHolder").val();
        var cardName = $("#cardNameHolder").val();
        var saveCardInfo = $("#saveCardInfo").is(":checked"); // true if checked, false otherwise

        // Now you can use the credit card details for further processing
        console.log({
          cardNumber: cardNumber,
          expirationDate: expirationDate,
          securityCode: securityCode,
          cardName: cardName,
          saveCardInfo: saveCardInfo,
        });

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
          if (customersData[i]["email"] == JSON.parse(customerData)["email"]) {
            customer_id = customersData[i]["_id"];
            break;
          }
        }
        console.log(customer_id);
        // Store new customerData in local storage
        localStorage.setItem("customerData", customerData);

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

        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      }
    }
  });

  // Function to close the popup
  $("#closePopup").on("click", function () {
    $("#membershipModal").modal("hide"); // Close the modal
  });

  // Redirect to Next Page
  // window.location.href = 'review.html';
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
