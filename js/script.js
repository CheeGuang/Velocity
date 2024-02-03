function redirectToSignIn(event) {
  event.preventDefault();

  // Get the previousPath from the clicked element
  var previousPath = window.location.pathname;

  // Encode the previous Path for further processing or sending to another page
  var encodedPreviousPath = encodeURIComponent(previousPath);

  // Construct the URL with query parameters
  var redirectUrl = "signin.html" + "?previousPath=" + encodedPreviousPath;
  console.log(previousPath);
  console.log(encodedPreviousPath);
  console.log(redirectUrl);

  // Redirect to the product detail page with the query parameters
  window.location.href = redirectUrl;
}
