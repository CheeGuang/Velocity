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

if (
  window.location.pathname == "/bag.html" ||
  window.location.pathname == "/checkout.html"
) {
  displayCart();
}

// Add to Cart Logic
function addToCart() {
  // Get name of Product added
  let itemName = $("#product-name").text();

  // Adding to cartArray
  for (let i = 0; i < productData.length; i++) {
    console.log(productData[i]["name"]);
    if (itemName == productData[i]["name"]) {
      var itemJSON = productData[i];
      var itemExistInCart = false;
      for (let i = 0; i < cartArray.length; i++) {
        if (itemName == cartArray[i][0]["name"]) {
          cartArray[i][1] = cartArray[i][1] + 1;
          itemExistInCart = true;
          break;
        }
      }
      if (itemExistInCart == false) {
        cartArray.push([itemJSON, 1]);
      }

      if (localStorage.getItem("customersData") != null) {
        for (
          let i = 0;
          i < JSON.parse(localStorage.getItem("customersData").length);
          i++
        ) {
          console.log(
            JSON.parse(localStorage.getItem("customerData"))["customerId"]
          );
          console.log(
            JSON.parse(localStorage.getItem("customersData"))[i]["customerId"]
          );
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
        var newCustomerJSON = JSON.parse(localStorage.getItem("customerData"));
        console.log(newCustomerJSON);
        newCustomerJSON["cart"] = cartArray;
        console.log(newCustomerJSON);
        console.log(
          JSON.parse(localStorage.getItem("customerRestDBData"))["_id"]
        );
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
}

function displayCart() {
  var cart = JSON.parse(localStorage.getItem("cartData"));
  var cartProductInfoContent = ``;
  var subtotal = 0;
  var deliveryPrice = 5.9;
  console.log(cart);

  for (let i = 0; i < cart.length; i++) {
    console.log(cart[0]);
    // Adding product info
    cartProductInfoContent += `
    <div class="card product-card">
        <div class="card-body" >
          <div class="d-flex">
            <img src="images/ShoePicture${cart[i][0]["gender"]}/${
      cart[i][0]["imagePath"].split(",")[0]
    }" class="product-image" alt="${
      cart[i][0]["name"]
    } Image" style="width: 220px; height: 220px">
            <div class="flex-grow-1">
              <h3 class="card-title product-name">${cart[i][0]["name"]}</h3>
              <p class="card-text">${
                cart[i][0]["gender"] == "M" ? "Men's" : "Women's"
              } Shoe</p>
              <p class="card-text">${cart[i][0]["color"]}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="size-quantity mt-3">
                  <span style="font-size: 20px; margin-right: 30px" class="product-size">Size 6.5</span> <span style="font-size: 20px">Quantity ${
                    cart[i][1]
                  }</span>
                </div>
              </div>
              <button class="btn btn-danger" onclick="removeIteFromCart(this)">
                Remove
                <i class="bi bi-trash"></i>
              </button>
            </div>
            <div class="d-flex align-items-start mt-2 flex-column">
              <div class="price"><h4>$${cart[i][0]["price"].toFixed(
                2
              )}</h4></div>
              <div class="price"><h4 style="color: #FF6B00;">+${
                Math.floor(cart[i][0]["price"]) * cart[i][1]
              } Points</h4></div>
            </div>
          </div>
        </div>
    </div>
    `;

    subtotal += cart[i][0]["price"];
  }

  if (subtotal == 0) {
    cartProductInfoContent += `<p>Your Bag is Empty. Proceed to shop!</p>`;
  }
  console.log("Hi");
  console.log($("#cart-items"));
  $("#cart-items").html(cartProductInfoContent);
  $("#subtotal-price").text("$" + subtotal.toFixed(2));
  $("#delivery-price").text("$" + deliveryPrice.toFixed(2));
  $("#total-price").text("$" + (subtotal + deliveryPrice).toFixed(2));
}
function removeIteFromCart(buttonElement) {
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
}
