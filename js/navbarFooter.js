// Fetch and insert the footer HTML using JavaScript
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    initialiseProfilePicture();
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
  if (customerDataJSON["imageUrl"] != null) {
    document.getElementById("profile-image-login").src =
      customerDataJSON["imageUrl"];
  }
}
