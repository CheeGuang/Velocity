var productName;
var selectedItem;

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function retrieveProductDetails() {
  // Get the encoded URI parameters
  const encodedProductName = getQueryParam("name");

  // Decode the URI parameters
  productName = decodeURIComponent(encodedProductName);
  console.log(productName);
  var productsDetail = JSON.parse(localStorage.getItem("productData"));

  for (let i = 0; i < productsDetail.length; i++) {
    // console.log(productsDetail[i]["name"]);
    if (productsDetail[i]["name"] == productName) {
      selectedItem = productsDetail[i];
      break;
    }
  }
  displayProduct(selectedItem);
}

// Call the retrieveProductDetails function when the page loads
window.onload = retrieveProductDetails;

function displayProduct(productObject) {
  console.log(productObject);
  let productImageUrlList = productObject["imagePath"].split(",");
  let pathHead =
    productObject["gender"] == "M"
      ? "images/ShoePictureM/"
      : "images/ShoePictureF/";
  for (let i = 1; i <= productImageUrlList.length; i++) {
    if (i == 1) {
      $("#main-product-image").attr(
        "src",
        pathHead + productImageUrlList[i - 1]
      );
    }
    console.log("#product_image" + i.toString());
    $("#product-image" + i.toString()).attr(
      "src",
      pathHead + productImageUrlList[i - 1]
    );
    console.log($("#product_image" + i.toString()));
  }
  //   $("#comfort").attr("aria-valuenow", productObject["comfort"]);
  //   console.log(productObject["comfort"]);
  updateProgressBar(productObject["comfort"], $("#comfort"));
  updateProgressBar(productObject["speed"], $("#speed"));
  updateProgressBar(productObject["quality"], $("#quality"));
  $("#product-name").text(productObject["name"]);
  $("#product-price").text("$" + productObject["price"]);
}

// Check if user clicks the productImages
// Get all elements with the class "clickable-image"
const images = document.querySelectorAll(".clickable-image");

// Add a click event listener to each image
images.forEach(function (image) {
  image.addEventListener("click", function () {
    // Handle the click event for each image here
    console.log(`Clicked on image with src: ${image.src}`);
    $("#main-product-image").attr("src", image.src);
  });
});

function updateProgressBar(amount, progressBar) {
  const percentage = (amount / 10) * 100;
  progressBar.css("width", percentage + "%");
  progressBar.text(amount + "/" + 10);
  progressBar.attr("aria-valuenow", amount);
}
