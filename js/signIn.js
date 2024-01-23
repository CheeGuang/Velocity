const APIKEY = "65b03b109eb5ba00e57fa24e";

globalThis.handleCredentialResponse = async (response) => {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  //   responsePayload = decodeJwtResponse(response.credential);
  const responsePayload = decodeJwtResponse(response.credential);
  console.log("ID: " + responsePayload.sub);
  console.log("Full Name: " + responsePayload.name);
  console.log("Given Name: " + responsePayload.given_name);
  console.log("Family Name: " + responsePayload.family_name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email);

  // Storing New Google Account Information
  let customerId = responsePayload.sub;
  let customerEmail = responsePayload.email;
  let customerFirstName = responsePayload.given_name;
  let customerLastName = responsePayload.family_name;
  let customerImageURL = responsePayload.picture;

  // Storing Information as a JSON
  let jsondata = {
    customerId: customerId,
    email: customerEmail,
    firstName: customerFirstName,
    lastName: customerLastName,
    imageUrl: customerImageURL,
  };

  // Create AJAX settings
  let settings = {
    async: true,
    crossDomain: true,
    url: "https://velocity-554e.restdb.io/rest/customer",
    method: "POST", //POST Request
    headers: {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache",
    },
    processData: false,
    data: JSON.stringify(jsondata),
  };

  //Send ajax request over to the DB and print response of the RESTDB storage to console.
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
};

function decodeJwtResponse(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
