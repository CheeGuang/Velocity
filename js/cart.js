// Create a Cart JSON object
if (localStorage.getItem("cartData") != null) {
  var cartArray = JSON.parse(localStorage.getItem("cartData"));
} else {
  var cartArray = [];
}

// Ensure Product Data is in Local Storage
if (localStorage.getItem("productData") == null) {
  getProductsData();
} else {
  console.log(JSON.parse(localStorage.getItem("productData")));
}

var productData = JSON.parse(localStorage.getItem("productData"));
var customerData = JSON.parse(localStorage.getItem("customerData"));

if (
  window.location.pathname == "/bag.html" ||
  window.location.pathname == "/review.html"
) {
  displayCart();
}

function displayCart() {
  var cart = JSON.parse(localStorage.getItem("cartData"));
  var cartProductInfoContent = ``;
  var subtotal = 0;
  var deliveryPrice = 5.9;
  let totalPointsEarned = 0;
  if (cart != null) {
    for (let i = 0; i < cart.length; i++) {
      console.log(cart[0]);
      // Adding product info
      let pointsEarned = Math.floor(cart[i][0]["price"]) * cart[i][1];
      totalPointsEarned += pointsEarned;
      cartProductInfoContent += `
    <div class="card product-card">
    <div class="card-body">
        <div class="d-flex align-items-start justify-content-start">
            <img src="images/ShoePicture${cart[i][0]["gender"]}/${
        cart[i][0]["imagePath"].split(",")[0]
      }" class="product-image" alt="${cart[i][0]["name"]} Image" 
                 style="max-width: 20%; max-height: 13vw; margin-right: 40px; display: block; border: 2px solid #c5c5c5;">
            <div class="flex-grow-1">
                <h3 class="card-title product-name mb-3">${
                  cart[i][0]["name"]
                }</h3>
                <p class="card-text">${
                  cart[i][0]["gender"] == "M" ? "Men's" : "Women's"
                } ${
        cart[i][0]["type"] == "sportswear"
          ? "Sports Shoe"
          : cart[i][0]["type"] == "sneakers"
          ? "Sneakers"
          : "Walking Shoe"
      }</p>
                <p class="card-text">${cart[i][0]["color"]}</p>
                <div class="d-flex justify-content-between align-items-center" style="width: 10vw">
                    <div class="size-quantity mt-3 d-flex flex-row">
                        <span class="product-size" style="min-width:8.5vw"><p class="card-text">Size ${
                          cart[i][2]
                        }</p></span>
                        <span style="width:10vw"><p class="card-text">Quantity ${
                          cart[i][1]
                        }</p></span>
                    </div>
                </div>              
            </div>
            <div class="d-flex align-items-start flex-column">
                <div class="price mb-2"><h4>$${(
                  cart[i][0]["price"] * cart[i][1]
                ).toFixed(2)}</h4></div>
                <div class="price"><h4 style="color: #FF6B00;">+${pointsEarned} Points</h4></div>
                <button class="btn btn-outline-danger mt-4" onclick="removeItemFromCart(this)" 
                        style="padding: 6% 12%; font-size: 1rem;">
                    <p style="margin-bottom: 0;">Remove</p>
                </button>
            </div>
        </div>
    </div>
</div>
    `;

      subtotal += cart[i][0]["price"];
    }
  }

  if (JSON.parse(localStorage.getItem("cartData")) == null) {
    cartProductInfoContent += `<p>Your Bag is Empty. Proceed to shop!</p>`;
  }
  $("#cart-items").html(cartProductInfoContent);
  $("#subtotal-price").text("$" + subtotal.toFixed(2));
  $("#total-points").text("+" + totalPointsEarned + " Points");
  if (window.location.pathname == "/review.html") {
    var decodedParams = parseURLParams();
    updateOrderSummary();
    updateShippingFee();
  }
  // Display Shipping Fee if totalPointsEarned is less than 200
  if (totalPointsEarned < 200) {
    $("#delivery-price").text("$" + deliveryPrice.toFixed(2));
    $("#total-price").text("$" + (subtotal + deliveryPrice).toFixed(2));
  } else {
    $("#total-price").text("$" + subtotal.toFixed(2));
  }

  // Disable cashback button if customer has points to redeem
  if (customerData != null) {
    if (
      customerData["points"] != null ||
      customerData["points"] != 0 ||
      customerData["points"] != NaN
    ) {
      $("#applyCashbackText").text(
        "Apply Cashback: $" + (customerData["points"] / 100).toFixed(2)
      );
    } else {
      $("#applyCashbackButton").prop("disabled", true);
    }
  } else {
    $("#applyCashbackButton").prop("disabled", true);
  }
}
function removeItemFromCart(buttonElement) {
  var productName = $(buttonElement)
    .closest(".card-body")
    .find(".product-name")
    .text();
  var productSize = $(buttonElement)
    .closest(".card-body")
    .find(".product-size")
    .text()
    .replace("Size ", "");

  // Remove Item from Cart on Local Storage
  localCart = JSON.parse(localStorage.getItem("cartData"));
  for (let i = 0; i < localCart.length; i++) {
    if (localCart[i][0]["name"] == productName) {
      localCart.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("cartData", JSON.stringify(localCart));
  displayCart();
  updateOverlayText();
  updateProgressBar();
  if (localStorage.getItem("customersData") != null) {
    updateCustomerDataToRestDB();
  }
}

function updateOrderSummary() {
  var decodedParams = parseURLParams();
  let cashbackRebate =
    decodedParams.applyCashback == true
      ? JSON.parse(localStorage.getItem("customerData"))["points"] / 100
      : 0;
  // Update Order Summary
  $("#cashbackRebateAmount").text(`-$${cashbackRebate.toFixed(2)}`);

  $("#totalAmount").text(
    `$${(
      parseFloat($("#subtotal-price").text().replace("$", "")) -
      parseFloat($("#shippingFeeAmount").text().replace("$", "")) -
      cashbackRebate
    ).toFixed(2)}`
  );
}

function updateShippingFee() {
  var decodedParams = parseURLParams();
  let shippingMethod = decodedParams.shippingDetails["shippingMethod"];

  let shippingFee;

  if (shippingMethod == "standardShipping") {
    shippingFee = 5.9;
  } else {
    if (parseFloat($("#subtotal-price").text().replace("$", "")) < 200) {
      shippingFee = 10.9;
    } else {
      shippingFee = 0;
    }
  }
  // Update Order Summary
  $("#shippingFeeAmount").text(`$${shippingFee.toFixed(2)}`);
}

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
$(document).ready(function () {
  // Use event delegation for dynamically added elements
  $("body").on("click", ".size-btn", function () {
    // Assuming this toggles a 'selected' class on the size buttons
    $(".size-btn").removeClass("selected"); // Remove 'selected' class from all buttons
    $(this).addClass("selected"); // Add 'selected' class to clicked button
  });

  $("#button-addon2").click(function (event) {
    event.preventDefault();
    var selectedSize = $(".size-btn.selected").text(); // Get the text of the selected size button
    if (selectedSize) {
      console.log("Selected size:", selectedSize); // Log if a size is selected
    } else {
      // No size selected, show the modal
      var myModal = new bootstrap.Modal(
        document.getElementById("sizeSelectionModal"),
        {
          keyboard: false,
        }
      );
      myModal.show();
      event.stopPropagation();
      return;
    }

    // Get name of Product added
    let itemName = $("#product-name").text();

    // Adding to cartArray
    for (let i = 0; i < productData.length; i++) {
      if (itemName == productData[i]["name"]) {
        var itemJSON = productData[i];
        var itemExistInCart = false;
        for (let i = 0; i < cartArray.length; i++) {
          if (
            itemName == cartArray[i][0]["name"] &&
            selectedSize == cartArray[i][2]
          ) {
            cartArray[i][1] = cartArray[i][1] + 1;
            itemExistInCart = true;
            break;
          }
        }
        if (itemExistInCart == false) {
          cartArray.push([itemJSON, 1, selectedSize]);
        }

        if (localStorage.getItem("customersData") != null) {
          for (
            let i = 0;
            i < JSON.parse(localStorage.getItem("customersData").length);
            i++
          ) {
            if (
              JSON.parse(localStorage.getItem("customerData"))["customerId"] ==
              JSON.parse(localStorage.getItem("customersData"))[i]["customerId"]
            ) {
              localStorage.setItem(
                "customerRestDBData",
                JSON.stringify(
                  JSON.parse(localStorage.getItem("customersData"))[i]
                )
              );
              break;
            }
          }
          updateCustomerDataToRestDB();
        }

        break;
      }
    }

    // Pushing cartArray to Local Storage
    console.log(cartArray);
    localStorage.setItem("cartData", JSON.stringify(cartArray));
    console.log(JSON.parse(localStorage.getItem("cartData")));
    updateOverlayText();

    // Redirect to productPage.html
    window.location.href = "productPage.html";
  });
});
