const APIKEY = "65b03b109eb5ba00e57fa24e";

// If product data does not exist in local storage, get product data from RestDB and store it in local storage
if (localStorage.getItem("productData") == null) {
  getProductsData();
}
const FILTERDICTIONARY = {
  Men: "M",
  Women: "F",
  Walking: "walking shoe",
  Sportswear: "sportswear",
  Sneaker: "sneakers",
  Black: "Black",
  White: "White",
  Red: "Red",
  Blue: "Blue",
  Orange: "Orange",
  Grey: "Grey",
  Green: "Green",
  Yellow: "Yellow",
  Brown: "Brown",
};
const PRODUCTDATAJSON = JSON.parse(localStorage.getItem("productData"));
const decodedProduct = retrieveAndDecodeProductParam();
const filters = retrieveAndOrganizeFilterParams("filters"); // Adjust the parameter name as needed

if (
  window.location.pathname == "/productPage.html" ||
  window.location.pathname == "/productpage"
) {
  if (JSON.parse(localStorage.getItem("searchedImage")) != null) {
    for (let i = 0; i < PRODUCTDATAJSON.length; i++) {
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
  } else if (decodedProduct != null) {
    for (let i = 0; i < PRODUCTDATAJSON.length; i++) {
      if (decodedProduct == "menShoe") {
        if (PRODUCTDATAJSON[i]["gender"] == "M") {
          insertProductHTML(PRODUCTDATAJSON[i]);
          continue;
        }
      } else {
        if (PRODUCTDATAJSON[i]["gender"] == "F") {
          insertProductHTML(PRODUCTDATAJSON[i]);
          continue;
        }
      }
    }
  } else if (filters) {
    // Display filters in the document only if they exist
    for (let i = 0; i < PRODUCTDATAJSON.length; i++) {
      console.log(validateShoe(filters, PRODUCTDATAJSON[i]));
      if (validateShoe(filters, PRODUCTDATAJSON[i])) {
        insertProductHTML(PRODUCTDATAJSON[i]);
      }
    }
  } else {
    for (let i = 0; i < PRODUCTDATAJSON.length; i++) {
      insertProductHTML(PRODUCTDATAJSON[i]);
    }
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
  let newElement = document.createElement("div");
  newElement.style.display = "flex";
  newElement.style.alignItems = "center";
  newElement.className = "card";

  let redirectLink = document.createElement("a");
  redirectLink.setAttribute("href", "#");
  redirectLink.setAttribute("onclick", "redirectToProductDetail(event)");

  let content = document.createElement("div");
  content.className = "content";

  let image = document.createElement("div");
  image.className = "image mb-4";

  let title = document.createElement("div");
  title.className = "card-title mb-2";

  let shoeDesc = document.createElement("div");
  shoeDesc.className = "card-text mb-4 text-muted";

  let price = document.createElement("div");
  price.className = "card-text price";

  redirectLink.appendChild(image);
  redirectLink.appendChild(title);
  redirectLink.appendChild(shoeDesc);
  redirectLink.appendChild(price);
  content.appendChild(redirectLink);
  newElement.appendChild(content);

  // Add the data into the divs
  image.innerHTML = `<img src="../images/ShoePicture${
    productData["gender"]
  }/${productData["imagePath"].split(",")[0].trim()}" alt="..." />`;
  title.innerHTML = `${productData["name"]}`;

  if (productData["memberReq"]) {
    shoeDesc.innerHTML = `${gender} ${productData["type"]} <span>[Members Special]</span>`;
  } else {
    shoeDesc.innerHTML = `${gender} ${productData["type"]}`;
  }

  price.innerHTML = `SGD $${productData["price"]}`;

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

// Function to get a query parameter by name, with explicit decoding
function getQueryParam(paramName) {
  // Use URLSearchParams to parse query parameters
  const urlParams = new URLSearchParams(window.location.search);
  // Retrieve the parameter and explicitly decode it
  const value = urlParams.get(paramName);
  return value ? decodeURIComponent(value) : null;
}

// Function to retrieve, decode, and display the product parameter
function retrieveAndDecodeProductParam() {
  // Decode the product parameter from the URI
  const product = getQueryParam("product");

  return product;
}

$(document).ready(function () {
  // Listen for any changes on checkboxes within the specified section
  $("section").on("change", 'input[type="checkbox"]', function () {
    $("#productListing").empty();
    // Initialize empty arrays for each category
    var groups = {
      gender: [],
      color: [],
      price: [],
      type: [],
    };

    // Check which checkboxes are checked and categorize them
    $('input[type="checkbox"]:checked').each(function () {
      var checkboxId = $(this).attr("id");

      // Categorize based on the checkbox ID
      if (checkboxId.includes("Filter")) {
        var category = checkboxId.replace("Filter", "");
        if (category === "men" || category === "women") {
          groups.gender.push(
            FILTERDICTIONARY[
              `${category.charAt(0).toUpperCase() + category.slice(1)}`
            ]
          );
        } else {
          groups.type.push(
            FILTERDICTIONARY[
              `${category.charAt(0).toUpperCase() + category.slice(1)}`
            ]
          );
        }
      } else if (
        checkboxId.startsWith("under") ||
        checkboxId.startsWith("over")
      ) {
        groups.price.push($(this).next("label").text().trim());
      } else {
        groups.color.push(
          FILTERDICTIONARY[`${$(this).next("label").text().trim()}`]
        );
      }
    });

    if (
      groups.gender.length != 0 ||
      groups.color.length != 0 ||
      groups.price.length != 0 ||
      groups.type.length != 0
    ) {
      for (let i = 0; i < PRODUCTDATAJSON.length; i++) {
        console.log(validateShoe(groups, PRODUCTDATAJSON[i]));
        if (validateShoe(groups, PRODUCTDATAJSON[i])) {
          insertProductHTML(PRODUCTDATAJSON[i]);
        }
      }
    } else if (decodedProduct != null) {
      for (let i = 0; i < PRODUCTDATAJSON.length; i++) {
        if (decodedProduct == "menShoe") {
          if (PRODUCTDATAJSON[i]["gender"] == "M") {
            insertProductHTML(PRODUCTDATAJSON[i]);
            continue;
          }
        } else {
          if (PRODUCTDATAJSON[i]["gender"] == "F") {
            insertProductHTML(PRODUCTDATAJSON[i]);
            continue;
          }
        }
      }
    } else {
      for (let i = 0; i < PRODUCTDATAJSON.length; i++) {
        insertProductHTML(PRODUCTDATAJSON[i]);
      }
    }
  });
});

function validateShoe(selectedFilter, shoeObjToValidate) {
  console.log(selectedFilter);
  // Helper function to check if shoe attribute matches any of the selected filters
  function isMatch(attribute, filter) {
    // No filter selected means skip this filter
    if (filter.length === 0) {
      return true;
    }
    return filter.includes(attribute);
  }

  // Special handling for price to interpret ranges correctly
  function priceMatch(price, priceFilters) {
    if (priceFilters.length === 0) {
      return true; // Skip price filter if none selected
    }
    return priceFilters.some((filter) => {
      if (filter.startsWith("Under")) {
        return price < 50;
      } else if (filter.startsWith("Over")) {
        return price > 200;
      } else {
        const bounds = filter.match(/\d+/g);
        const lowerBound = parseInt(bounds[0], 10);
        const upperBound = parseInt(bounds[1], 10);
        return price >= lowerBound && price <= upperBound;
      }
    });
  }

  // Convert shoe type and color to match filter format
  const shoeGender = shoeObjToValidate.gender;
  const shoeType = shoeObjToValidate.type.toLowerCase();
  const shoePrice = shoeObjToValidate.price;
  const shoeColor = shoeObjToValidate.color;

  // Adjusting filter criteria to match the shoe object properties
  const genderFilters = selectedFilter.gender.map((g) => g);
  const typeFilters = selectedFilter.type.map((t) => t.toLowerCase());
  const priceFilters = selectedFilter.price;
  const colorFilters = selectedFilter.color;

  // Validate against each filter
  const genderMatch = isMatch(shoeGender, genderFilters);
  const typeMatch = isMatch(shoeType, typeFilters);
  const priceMatchResult = priceMatch(shoePrice, priceFilters);
  const colorMatch = isMatch(shoeColor, colorFilters);

  // Determine if the shoe passes all active filters
  return genderMatch && typeMatch && priceMatchResult && colorMatch;
}
function retrieveAndOrganizeFilterParams() {
  const urlParams = new URLSearchParams(window.location.search);
  let filters = {
    gender: [],
    color: [],
    price: [],
    type: [],
  };

  // Define the known values for each category
  const knownValues = {
    color: [
      "Black",
      "White",
      "Red",
      "Blue",
      "Orange",
      "Grey",
      "Green",
      "Yellow",
      "Brown",
    ],
    gender: ["M", "F"],
    price: ["Under S$50", "S$50 - S$100", "S$101 - S$199", "Over S$200"],
    type: ["walking shoe", "sportswear", "sneakers"],
  };

  if (urlParams.has("filters")) {
    for (let value of urlParams.getAll("filters")) {
      let decodedValue = decodeURIComponent(value);

      // Check and categorize each filter based on the known values
      if (knownValues.gender.includes(decodedValue)) {
        filters.gender.push(decodedValue);
      } else if (knownValues.color.includes(decodedValue)) {
        filters.color.push(decodedValue);
      } else if (knownValues.price.includes(decodedValue)) {
        filters.price.push(decodedValue);
      } else if (knownValues.type.includes(decodedValue)) {
        filters.type.push(decodedValue);
      }
    }
  }

  return filters;
}
