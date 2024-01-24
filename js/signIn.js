const APIKEY = "65b03b109eb5ba00e57fa24e";

globalThis.handleCredentialResponse = async (response) => {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  const responsePayload = decodeJwtResponse(response.credential);

  // Storing New Google Account Information
  let customerId = responsePayload.sub;
  let customerEmail = responsePayload.email;
  let customerFirstName = responsePayload.given_name;
  let customerLastName = responsePayload.family_name;
  let customerImageURL = responsePayload.picture;

  // Logging User Details
  console.log("ID: " + customerId);
  console.log("Email: " + customerEmail);
  console.log("Given Name: " + customerFirstName);
  console.log("Family Name: " + customerLastName);
  console.log("Image URL: " + customerImageURL);

  //prettier-ignore
  let customerJSON = {
    "customerId": customerId,
    "email": customerEmail,
    "firstName": customerFirstName,
    "lastName": customerLastName,
    "imageUrl": customerImageURL,
  };

  let customerJSONString = JSON.stringify(customerJSON);
  localStorage.setItem("customerData", customerJSONString);

  getCustomersData();

  // Storing Information as a JSON
  let jsondata = {
    customerId: customerId,
    email: customerEmail,
    firstName: customerFirstName,
    lastName: customerLastName,
    imageUrl: customerImageURL,
  };

  // Create AJAX settings
  // prettier-ignore
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://velocity-554e.restdb.io/rest/customer",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
    // let customerJSON = {

    // }
  });

  //   localStorage.setItem(customer, customerJSON)
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
// getCustomersData();
function getCustomersData() {
  //[STEP 7]: Create our AJAX settings
  let settings = {
    async: true,
    crossDomain: true,
    url: "https://velocity-554e.restdb.io/rest/customer",
    method: "GET", // use GET to retrieve info
    headers: {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache",
    },
  };

  let customerJSONString = localStorage.getItem("customerData");
  let customerJSON = JSON.parse(customerJSONString);
  //[STEP 8]: Make our AJAX calls
  //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
  //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links
  $.ajax(settings).done(function (response) {
    console.log(response);
    let isNew = true;
    for (var i = 0; i < response.length; i++) {
      if (customerJSON["customerId"] == response[i]["customerId"]) {
        isNew = false;
      }
    }
    console.log(isNew);
  });
}