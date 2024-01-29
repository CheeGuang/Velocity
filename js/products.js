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
  // Create a new HTML element, for example, a div
  var newElement = document.createElement("div");

  // Add content to the new element
  newElement.innerHTML = `
<a class="card" href="productDetail.html">
    <div class="card-body">
        <div class="itemSummary">
            <h2 class="card-title">${productData["name"]}</h2>
            <p class="card-text">${productData["price"]} SGD</p>
        </div>
        <img src="../images/ShoePicture${productData["gender"]}/${productData[
    "imagePath"
  ]
    .split(",")[0]
    .trim()}" alt="..." />
    </div>
</a>
`;
  // onclick="addToCart()"
  // Find the section element with the id "productListing"
  var productListing = document.getElementById("productListing");

  // Append the new element as a child to the section
  productListing.appendChild(newElement);
}
