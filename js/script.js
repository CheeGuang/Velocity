// Allow customers to get redirected back to the page they left off before clicking Sign In
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

// Redirect User to Products Page with filter
function redirectToProductWithFilter(filterOptions) {
  // Encode filter options into a query string
  var queryString = $.param({ filters: filterOptions }, true);

  // Redirect to productPage.html with the encoded query string
  window.location.href = "productPage.html?" + queryString;
}
