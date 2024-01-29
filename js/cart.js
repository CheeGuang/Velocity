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

// Add to Cart Logic
function addToCart() {
  // Get name of Product added
  //   let itemName = $("#productName").text();

  // Adding to cartArray
  let itemName = "Nike Cortez - Blue -";
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
}
