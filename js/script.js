fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
  })
  .catch((error) => console.error(error));

// Load Nav Bar
let firstLoad = true;
function loadCartNavBar() {
  if (firstLoad) {
    fetch("navbarcart.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar-container").innerHTML = data;
      })
      .catch((error) => console.error(error));

    firstLoad = false;
  }
  try {
    if (localStorage.getItem("cart").length !== 2) {
      setTimeout(() => {
        updateCartCounter();
      }, "100");
    }
  } catch {}
}
