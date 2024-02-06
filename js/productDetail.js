let productName;
let selectedItem;

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
  let productsDetail = JSON.parse(localStorage.getItem("productData"));

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

  // Insert Product Images
  insertProductImages(productObject);

  // Update Progress Bar
  updateProgressBar(productObject["comfort"], $("#comfort"));
  updateProgressBar(productObject["speed"], $("#speed"));
  updateProgressBar(productObject["quality"], $("#quality"));
  $("#product-name").text(productObject["name"]);
  $("#product-price").text("$" + productObject["price"]);

  // Insert available shoe sizees
  createSizeButtons(productObject["sizesAvailable"].split(","));

  // Update Product Information
  updateProductInfo(productObject);

  // Update Product About
  updateProductAbout(productObject);

  // Display Member Login if required
  insertAddToCartLogic(productObject);
}

function updateProgressBar(amount, progressBar) {
  const percentage = (amount / 10) * 100;
  progressBar.css("width", percentage + "%");
  progressBar.attr("aria-valuenow", amount);
}

function createSizeButtons(sizes) {
  const $container = $("#sizing");
  $.each(sizes, function (index, size) {
    const $button = $("<button></button>", {
      type: "button",
      class: "btn me-2 mb-2 size-btn",
      text: size,
    }).click(function () {
      // Remove 'active' class from all size buttons
      $(".size-btn").removeClass("active");
      // Add 'active' class to the clicked button
      $button.addClass("active");
    });

    $container.append($button);
  });
}

function insertProductImages(productObject) {
  var productInfoContent = `
  `;
  var productImagePathList = productObject["imagePath"].split(",");
  console.log(productImagePathList);
  $("#main-product-image").attr(
    "src",
    "images/ShoePicture" +
      productObject["gender"] +
      "/" +
      productImagePathList[0]
  );

  for (let i = 1; i <= productImagePathList.length; i++) {
    // Add image to main-product-image

    productInfoContent += `<img id="product-image${i}" src="images/ShoePicture${
      productObject["gender"]
    }/${
      productImagePathList[i - 1]
    }" alt="Shoe Image ${i}"class="row mb-2 clickable-image" style="height: 25%">`;
  }
  $("#product-images").html(productInfoContent);

  // Make Image go to main-product-image when its clicked
  makeImagesClickable();
}
function makeImagesClickable() {
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
}
function updateProductInfo(productObject) {
  var productInfoContent = `
    <p class="mb-2"><strong>Type:</strong> ${productObject["type"]}</p>
    <p class="mb-2"><strong>Color:</strong> ${productObject["color"]}</p>
    <p class="mb-2"><strong>Comfort:</strong> ${productObject["comfort"]}</p>
    <p class="mb-2"><strong>Speed:</strong> ${productObject["speed"]}</p>
    <p class="mb-2"><strong>Quality:</strong> ${productObject["quality"]}</p>
  `;

  $("#product-info").html(productInfoContent);
}

function updateProductAbout(productObject) {
  var productDescription = productObject["description"];
  productDescription = productDescription.replace(
    "{name}",
    productObject["name"]
  );
  var productAboutContent = `
    <p>${productDescription}</p>
  `;

  $("#product-about").html(productAboutContent);
}

function insertAddToCartLogic(productObject) {
  var productAboutContent = "";
  if (productObject["memberReq"]) {
    if (JSON.parse(localStorage.getItem("customerDate")) == null) {
      productAboutContent = `
      <h3 class="mb-2">Unlock this design</h3>
      <p>Now available for members only. Join the club for free and be the first to catch our latest series.</p>
      <div>
          <div id="add-to-cart-button" class="input-group mt-3 mb-3">
          <a href="signin.html">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Login / Sign Up</button>
          <a/>
          </div>
      </div>
    `;
      $("#add-to-cart").html(productAboutContent);
    }
  }
}
