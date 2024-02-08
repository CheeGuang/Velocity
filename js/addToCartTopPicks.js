function redirectToProductDetailFromTopPick(event, productName) {
  event.preventDefault();

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
