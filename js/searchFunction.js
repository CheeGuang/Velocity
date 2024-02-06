// This is for the search bar pop up
const nav = $("#navbar");
$(document).ready(function () {
  $("#navbar-searchIcon").click(function () {
    nav.toggleClass("openSearch");

    if (nav.hasClass("openSearch")) {
      searchIcon.removeClass("fa-magnifying-glass").addClass("fa-xmark");
    } else {
      searchIcon.removeClass("fa-xmark").addClass("fa-magnifying-glass");
    }
  });
});

// This is for autocomplete function

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
