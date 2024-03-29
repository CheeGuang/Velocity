$(document).ready(function () {
  // Attach click event handler to the option buttons
  $("#walkingOption").click(function () {
    // If A is selected, encode "sneakers" to the query parameter "type"
    window.location.href = "shoeFinderQuizQ2.html?type=sneakers";
  });

  // Note: You have two buttons with the same ID "walkingOption".
  // IDs should be unique. Assuming the third button has a unique ID, e.g., "outdoorOption".
  $("#outdoorOption").click(function () {
    // If C is selected, encode "walking shoe" to the query parameter "type"
    window.location.href = "shoeFinderQuizQ2.html?type=walking%20shoe";
  });

  $("#runningOption").click(function () {
    // If B is selected, encode "sportswear" to the query parameter "type"
    window.location.href = "shoeFinderQuizQ2.html?type=sportswear";
  });
  // Attach event handlers to buttons
  $("#fOption").click(function () {
    redirectToQuestion3("F");
  });

  $("#mOption").click(function () {
    redirectToQuestion3("M");
  });

  // Attach click event handlers to the priority option buttons
  $("#comfortOption").click(function () {
    redirectToResultsWithPriority("comfort");
  });

  $("#speedOption").click(function () {
    redirectToResultsWithPriority("speed");
  });

  $("#qualityOption").click(function () {
    redirectToResultsWithPriority("quality");
  });
  if (window.location.pathname == "/shoeFinderQuizResult.html") {
    const type = retrieveAndDecodeProductParam("type");
    const gender = retrieveAndDecodeProductParam("gender");
    const priority = retrieveAndDecodeProductParam("priority");

    showAnimationContinuously();
    // Using the sleep function
    sleep(2000).then(() => {
      // This will run after 2 seconds
      document.querySelector("dotlottie-player").style.display = "none";
    });

    // Assuming type, gender, and priority are variables already defined
    let combination = `${type}-${gender}-${priority}`;

    switch (combination) {
      case "walking shoe-M-comfort":
        // Handle walking shoe, Male, Comfort
        console.log("HI");
        $("#result-image").attr("src", "../images/ShoePictureM/shoe19-1.jpeg");
        $(".result-text").text("Metcon 8  EQ21");
        break;
      case "walking shoe-M-speed":
        // Handle walking shoe, Male, Speed
        $("#result-image").attr("src", "../images/ShoePictureM/shoe15-1.jpg");
        $(".result-text").text("Air Force 1 Mid x Off White");
        break;
      case "walking shoe-M-quality":
        // Handle walking shoe, Male, Quality
        $("#result-image").attr("src", "../images/ShoePictureM/shoe22-1.jpeg");
        $(".result-text").text("Nike Dunk Low - Grey");
        break;
      case "walking shoe-F-comfort":
        // Handle walking shoe, Female, Comfort
        $("#result-image").attr("src", "../images/ShoePictureF/shoe11-1.jpeg");
        $(".result-text").text("Dunks Midnight Navy");
        break;
      case "walking shoe-F-speed":
        // Handle walking shoe, Female, Speed
        $("#result-image").attr("src", "../images/ShoePictureF/shoe3-1.jpeg");
        $(".result-text").text("Air Force 1 Gorge");
        break;
      case "walking shoe-F-quality":
        // Handle walking shoe, Female, Quality
        $("#result-image").attr("src", "../images/ShoePictureF/shoe14-1.jpeg");
        $(".result-text").text("Air Force 1 Brown");
        break;
      case "sneakers-M-comfort":
        // Handle sneakers, Male, Comfort
        $("#result-image").attr("src", "../images/ShoePictureM/shoe20-1.jpeg");
        $(".result-text").text("Air Force 1 Low");
        break;
      case "sneakers-M-speed":
        // Handle sneakers, Male, Speed
        $("#result-image").attr("src", "../images/ShoePictureM/shoe29-1.jpeg");
        $(".result-text").text("Air Jordan 1 Varsity");
        break;
      case "sneakers-M-quality":
        // Handle sneakers, Male, Quality
        $("#result-image").attr("src", "../images/ShoePictureM/shoe28-1.jpeg");
        $(".result-text").text("Air Jordan 1 Low Panda");
        break;
      case "sneakers-F-comfort":
        // Handle sneakers, Female, Comfort
        $("#result-image").attr("src", "../images/ShoePictureF/shoe2-1.jpeg");
        $(".result-text").text("Air Jordan 1 Crimson");
        break;
      case "sneakers-F-speed":
        // Handle sneakers, Female, Speed
        $("#result-image").attr("src", "../images/ShoePictureF/shoe2-1.jpeg");
        $(".result-text").text("Air Jordan 1 Crimson");
        break;
      case "sneakers-F-quality":
        // Handle sneakers, Female, Quality
        $("#result-image").attr("src", "../images/ShoePictureF/shoe10-1.jpeg");
        $(".result-text").text("Burgundy Crunch KW12");
        break;
      case "sportswear-M-comfort":
        // Handle sportswear, Male, Comfort
        $("#result-image").attr("src", "../images/ShoePictureM/shoe17-1.jpeg");
        $(".result-text").text("Metcon 9 Atomic Orange");
        break;
      case "sportswear-M-speed":
        // Handle sportswear, Male, Speed
        $("#result-image").attr("src", "../images/ShoePictureM/shoe16-1.jpeg");
        $(".result-text").text("Metcon 9 AMP");
        break;
      case "sportswear-M-quality":
        // Handle sportswear, Male, Quality
        $("#result-image").attr("src", "../images/ShoePictureM/shoe12-1.jpeg");
        $(".result-text").text("Air Jordan 1 - Limited Edt");
        break;
      case "sportswear-F-comfort":
        // Handle sportswear, Female, Comfort
        $("#result-image").attr("src", "../images/ShoePictureF/shoe7-1.jpeg");
        $(".result-text").text("Revolution 7 LV");
        break;
      case "sportswear-F-speed":
        // Handle sportswear, Female, Speed
        $("#result-image").attr("src", "../images/ShoePictureF/shoe6-1.jpeg");
        $(".result-text").text("Freak 5 Dimtrov");
        break;
      case "sportswear-F-quality":
        // Handle sportswear, Female, Quality
        $("#result-image").attr("src", "../images/ShoePictureF/shoe12-1.jpeg");
        $(".result-text").text("Air Jordan 1 - Grey");
        break;
      default:
        // Handle unknown combination
        break;
    }
  }
});

// Function to get a query parameter by name, with explicit decoding
function getQueryParam(paramName) {
  // Use URLSearchParams to parse query parameters
  const urlParams = new URLSearchParams(window.location.search);
  // Retrieve the parameter and explicitly decode it
  const value = urlParams.get(paramName);
  return value ? decodeURIComponent(value) : null;
}

// Function to retrieve, decode, and display the product parameter
function retrieveAndDecodeProductParam(paramName) {
  // Decode the product parameter from the URI
  const product = getQueryParam(paramName);

  return product;
}
function redirectToQuestion3(selectedGender) {
  // Dynamically construct the base URL for the next quiz question page
  var baseUrl = window.location.origin + "/shoeFinderQuizQ3.html";

  // Get the current page URL and its parameters
  var currentUrlParams = new URLSearchParams(window.location.search);

  // Set the gender parameter based on the button clicked
  currentUrlParams.set("gender", selectedGender);

  // Construct the final URL
  var finalUrl = baseUrl + "?" + currentUrlParams.toString();

  // Redirect to the next quiz question page with updated query parameters
  window.location.href = finalUrl;
}
function redirectToResultsWithPriority(priority) {
  // Dynamically construct the base URL for the results page
  var baseUrl = window.location.origin + "/shoeFinderQuizResult.html";

  // Get the current page URL and its parameters
  var currentUrlParams = new URLSearchParams(window.location.search);

  // Add or update the 'priority' query parameter
  currentUrlParams.set("priority", priority);

  // Construct the final URL
  var finalUrl = baseUrl + "?" + currentUrlParams.toString();

  // Redirect to the results page with the updated query parameters
  window.location.href = finalUrl;
}

function redirectToProductDetailShoeFinder(event) {
  event.preventDefault();

  // Get the product name from the clicked element
  var productName = $("#result-text-id").text();

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
