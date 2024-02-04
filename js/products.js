const APIKEY = "65b03b109eb5ba00e57fa24e";

// If product data does not exist in local storage, get product data from RestDB and store it in local storage
if (localStorage.getItem("productData") == null) {
  getProductsData();
} else {
  console.log(JSON.parse(localStorage.getItem("productData")));
}
const PRODUCTDATAJSON = JSON.parse(localStorage.getItem("productData"));

if (JSON.parse(localStorage.getItem("searchedImage")) != null) {
  for (let i = 0; i < PRODUCTDATAJSON.length; i++) {
    console.log(PRODUCTDATAJSON[i]["type"]);
    console.log(JSON.parse(localStorage.getItem("searchedImage"))["type"]);
    console.log(PRODUCTDATAJSON[i]["color"]);
    console.log(JSON.parse(localStorage.getItem("searchedImage"))["colour"]);
    if (
      PRODUCTDATAJSON[i]["type"] ==
        JSON.parse(localStorage.getItem("searchedImage"))["type"] &&
      PRODUCTDATAJSON[i]["color"] ==
        JSON.parse(localStorage.getItem("searchedImage"))["colour"]
    ) {
      insertProductHTML(PRODUCTDATAJSON[i]);
    }
  }
  localStorage.removeItem("searchedImage");
} else {
  for (let i = 0; i < PRODUCTDATAJSON.length; i++) {
    insertProductHTML(PRODUCTDATAJSON[i]);
  }
}

function getProductsData() {
  //Create our AJAX settings
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://velocity-554e.restdb.io/rest/product",
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache",
    },
  };

  //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
  //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links

  $.ajax(settings).done(function (response) {
    console.log(response);
    let productDataJSONString = JSON.stringify(response);
    localStorage.setItem("productData", productDataJSONString);
  });
}

function insertProductHTML(productData) {
  let gender = "Women's";
  if (productData["gender"] == "M") {
    gender = "Men's";
  }

  // Create a new HTML element, for example, a div
  var newElement = document.createElement("div");
  newElement.style.display = "flex";
  newElement.style.alignItems = "center";
  newElement.className = "card-flip";

  // let prodCard = document.createElement("div");
  // prodCard.className = "card";

  // let image = document.createElement("div");
  // image.className = "image";

  // let title = document.createElement("div");
  // title.className = "card-title";

  // let price = document.createElement("div");
  // price.className = "card-text";

  // prodCard.appendChild(image);
  // prodCard.appendChild(title);
  // prodCard.appendChild(price);

  // // Add the data into the divs
  // image.innerHTML = `<img src="../images/ShoePicture
  //     ${productData["gender"]}/${productData["imagePath"]
  //   .split(",")[0]
  //   .trim()}" alt="..." />`;
  // title.innerHTML = `${productData["name"]}`;
  // price.innerHTML = `SGD $${productData["price"]}`;

  //Add content to the new element
  newElement.innerHTML = `
    <div class="content">
      <div class="front">
         <a class="card front" href="#" onClick="redirectToProductDetail(event)">
          <div class="card-body">
              <div class="itemSummary">
                  <h2 class="card-title" style="height:75px">${
                    productData["name"]
                  }</h2>
                  <p class="card-text">SGD$ ${productData["price"]}</p>
              </div>
              <img src="../images/ShoePicture${
                productData["gender"]
              }/${productData["imagePath"].split(",")[0].trim()}" alt="..." />
          </div>
        </a>
      </div>
      <div class="back">
      <h2 class="card-title" style="height:75px">${productData["name"]}</h2>
      <p class="card-text col-10 mt-4">SGD $${productData["price"]}</p>
      <p class="card-text col-10 mt-4">${gender} ${productData["type"]}</p>
      <p class="card-text col-10 mt-4">Colour: ${productData["color"]}</p>
      <p class="card-text col-10 mt-4">Available Size: <br> ${
        productData["sizesAvailable"]
      }</p>
      </div>
    </div>
  `;
  onclick = "addToCart()";
  // Find the section element with the id "productListing"
  let productListing = document.getElementById("productListing");

  // Append the new element as a child to the section
  productListing.appendChild(newElement);
}

function redirectToProductDetail(event) {
  event.preventDefault();

  // Get the product name from the clicked element
  var productName =
    event.currentTarget.querySelector(".card-title").textContent;

  // Encode the product name for further processing or sending to another page
  var encodedProductName = encodeURIComponent(productName);

  // Construct the URL with query parameters
  var redirectUrl = "productDetail.html" + "?name=" + encodedProductName;
  console.log(productName);
  console.log(encodedProductName);
  console.log(redirectUrl);

  // Redirect to the product detail page with the query parameters
  window.location.href = redirectUrl;
}
