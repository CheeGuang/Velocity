// Fetch and insert the footer HTML using JavaScript
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    initialiseProfilePicture();
    updateOverlayText("99+"); // Change the overlay text to "5"
  })
  .catch((error) => console.error(error));

// Fetch and insert the footer HTML using JavaScript
// fetch("footer.html")
//   .then((response) => response.text())
//   .then((data) => {
//     document.getElementById("footer").innerHTML = data;
//   })
//   .catch((error) => console.error(error));

function initialiseProfilePicture() {
  let customerDataJSONString = localStorage.getItem("customerData");
  let customerDataJSON = JSON.parse(customerDataJSONString);
  if (customerDataJSON != null) {
    document.getElementById("profile-image-login").src =
      customerDataJSON["imageUrl"];
  }
}

// Function to update the overlay text
function updateOverlayText() {
  // Get Number of Items in cart
  let NoOfItemsInCart = 0;
  let cartDataJSON = JSON.parse(localStorage.getItem("cartData"));
  if (cartDataJSON != null) {
    for (let i = 0; i < cartDataJSON.length; i++) {
      NoOfItemsInCart += cartDataJSON[i][1];
    }
    var overlayText = document.getElementById("overlay-text");
    if (overlayText) {
      if (NoOfItemsInCart < 100) {
        overlayText.textContent = NoOfItemsInCart;
      } else {
        overlayText.textContent = "99+";
      }
    }
  }
}

// Example usage
