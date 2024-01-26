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
      if (!itemExistInCart) {
        cartArray.push([itemJSON, 1]);
      }

      if (localStorage.getItem("customerData") != null) {
        // Updating cart of customer's account with cartArray in RestDB
        var settings = {
          async: true,
          crossDomain: true,
          url: `https://velocity-554e.restdb.io/rest/product/${JSON.parse(
            localStorage.getItem("customerRestDBData")["_id"]
          )}`,
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache",
          },
          processData: false,
          data: JSON.stringify(cartArray),
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      }
      break;
    }
  }

  // Pushing cartArray to Local Storage
  localStorage.setItem("cartData", JSON.stringify(cartArray));
  console.log(JSON.parse(localStorage.getItem("cartData")));
  console.log(cartArray);
}
