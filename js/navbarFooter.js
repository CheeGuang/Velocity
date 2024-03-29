// Fetch and insert the footer HTML using JavaScript
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    initialiseProfilePicture();
    if (localStorage.getItem("cartData") != null) {
      updateOverlayText();
    }
  })
  .catch((error) => console.error(error));

// Fetch and insert the footer HTML using JavaScript
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch((error) => console.error(error));

// Search Function
// This is for the search bar pop up

// Define the search icon using jQuery
var searchIcon = $("#navbar-searchIcon");

// Use jQuery's 'on' method to handle click event
searchIcon.on("click", function () {
  // Toggle 'openSearch' class on the navbar
  $("#navbar").toggleClass("openSearch");

  // Check if the 'openSearch' class is applied and toggle icon classes accordingly
  if ($("#navbar").hasClass("openSearch")) {
    searchIcon.removeClass("fa-magnifying-glass").addClass("fa-xmark");
  } else {
    searchIcon.removeClass("fa-xmark").addClass("fa-magnifying-glass");
  }
});

// This is for autocomplete function

let suggestions = [
  "Black Shoes",
  "Black Sneakers",
  "Black Sports Shoe",
  "Black Walking Shoe",
  "Blue Shoes",
  "Blue Sneakers",
  "Blue Sports Shoe",
  "Blue Walking Shoe",
  "Green Shoes",
  "Green Sneakers",
  "Green Sports Shoe",
  "Green Walking Shoe",
  "Grey Shoes",
  "Grey Sneakers",
  "Grey Sports Shoe",
  "Grey Walking Shoe",
  "Member Shoes",
  "Men",
  "Newest Releases",
  "Non-Member Shoes",
  "Orange Shoes",
  "Orange Sneakers",
  "Orange Sports Shoe",
  "Orange Walking Shoe",
  "Purple Shoes",
  "Purple Sneakers",
  "Purple Sports Shoe",
  "Purple Walking Shoe",
  "Red Shoes",
  "Red Sneakers",
  "Red Sports Shoe",
  "Red Walking Shoe",
  "Running",
  "Sneakers",
  "Walking",
  "White Shoes",
  "White Sneakers",
  "White Sports Shoe",
  "White Walking Shoe",
  "Women",
  "Yellow Shoes",
  "Yellow Sneakers",
  "Yellow Sports Shoe",
  "Yellow Walking Shoe",
];

const searchWrapper = $("#search-bar-div"); //This is to access the entire search bar + autocom-box
const inputBox = $("#search-bar-input"); // This is to track user input in search field
const suggBox = $(".autocom-box"); //  This is to track the autocomplete box area

// Track if user presses any key and releases them (.onkeyup)
// Shorthand => is for function(){} calling a function statement
inputBox.onkeyup = (key) => {
  let userData = key.target.value; // User entered data
  let emptyArray = [];

  // If userData is not empty (because anything other than "" is truthy. "" is falsy)
  if (userData) {
    //Filter array "suggestions"
    emptyArray = suggestions.filter((data) => {
      //Match data (the strings) that starts with user entered letter
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    //End of Filtering array "suggestions"

    // add to emptyArray with html syntax there
    emptyArray = emptyArray.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
    // End of adding to emptyArray with html syntax there

    //This is to trigger the autobox and get autocomplete box to show
    searchWrapper.classList.add("active");
    //Write it to HTML document through the function 'showSuggestions'
    showSuggestions(emptyArray);

    let allList = suggBox.querySelectorAll("li");
    for (let count = 0; count < allList.length; count++) {
      // Add onclick attribute to all li tags
      allList[count].setAttribute("onClick", "select(this)");
    }
  } else {
    //else hide autocomplete box
    searchWrapper.classList.remove("active");
  }
};

// Function to write to the HTML document
function showSuggestions(list) {
  let listData;

  // If list is empty (only number 0 is falsy, rest are truthy)
  if (!list.length) {
    userValue = inputBox.value;
    listData = "<li> No results found </li>";
  } else {
    listData = list.join("");
  }

  // This is how to write
  suggBox.innerHTML = listData;
}

//Function to grab li and fill in immediately for the user, then close autocomplete box
function select(element) {
  let selectUserData = element.textContent;
  inputBox.value = selectUserData; //Passing user selected li data into text field
  searchWrapper.classList.remove("active"); // Then close the autocomplete box
}

function initialiseProfilePicture() {
  let customerDataJSONString = localStorage.getItem("customerData");
  let customerDataJSON = JSON.parse(customerDataJSONString);
  if (customerDataJSON != null) {
    $("#profile-image-login").attr("src", customerDataJSON["imageUrl"]);

    // Override hover effect by setting opacity directly on hover events
    $("#profile-image-login").hover(
      function () {
        // Mouse enters, set opacity to 1 or any desired value
        $(this).css("opacity", "1");
      },
      function () {
        // Mouse leaves, remove the inline style to let CSS take over again
        $(this).css("opacity", "");
      }
    );
  }
}

// Function to update the overlay text
function updateOverlayText() {
  // Get Number of Items in cart
  let NoOfItemsInCart = 0;
  let cartDataJSON = JSON.parse(localStorage.getItem("cartData"));
  if (cartDataJSON != null) {
    // Add Overlay Background Colour
    document.getElementById("shoppingCart-overlay-text").style.backgroundColor =
      " #ff5733";
    for (let i = 0; i < cartDataJSON.length; i++) {
      NoOfItemsInCart += cartDataJSON[i][1];
    }
    var overlayText = document.getElementById("shoppingCart-overlay-text");
    if (overlayText) {
      if (NoOfItemsInCart < 100) {
        overlayText.textContent = NoOfItemsInCart;
      } else {
        overlayText.textContent = "99+";
      }
    }
  }
  if (NoOfItemsInCart == 0) {
    $("#shoppingCart-overlay-text").css("display", "none");
  }
}

// Function to encode and redirect for men's shoes
function redirectToMenShoe() {
  var productName = encodeURIComponent("menShoe");
  var url = "productPage.html?product=" + productName;
  window.location.href = url;
}

// Function to encode and redirect for women's shoes
function redirectToWomenShoe() {
  var productName = encodeURIComponent("womenShoe");
  var url = "productPage.html?product=" + productName;
  window.location.href = url;
}
