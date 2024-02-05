// For Carousell
console.log("Running index.js");
$(document).ready(function () {
  // Initialize the carousel
  $("#myCarousel").carousel({
    interval: 4000, // Set the interval between slides (4 seconds in this example)
    pause: "hover", // Pause on mouse hover
  });

  // Enable navigation via custom buttons
  $(".carousel-control-prev").click(function (e) {
    e.preventDefault();
    $("#myCarousel").carousel("prev");
  });

  $(".carousel-control-next").click(function (e) {
    e.preventDefault();
    $("#myCarousel").carousel("next");
  });
  let customerData = JSON.parse(localStorage.getItem("customerData"));
  if (customerData != null) {
    getCustomersData();
    updateOverlayText();
  }
});

function getCustomersData() {
  console.log("Getting Customer Data");
  //[STEP 7]: Create our AJAX settings
  let settings = {
    async: false,
    crossDomain: true,
    url: "https://velocity-554e.restdb.io/rest/customer",
    method: "GET", // use GET to retrieve info
    headers: {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache",
    },
  };

  let customerDataJSONString = localStorage.getItem("customerData");
  let customerDataJSON = JSON.parse(customerDataJSONString);
  console.log(customerDataJSON);
  //[STEP 8]: Make our AJAX calls
  //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
  //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links
  let isNew = true;
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(JSON.stringify(response));
    localStorage.setItem("customersData", JSON.stringify(response));
    for (var i = 0; i < response.length; i++) {
      if (customerDataJSON["customerId"] == response[i]["customerId"]) {
        // Assign retrieved customer data to customerData in localStorage
        for (const key in response[i]) {
          if (response[i].hasOwnProperty(key)) {
            // Check to avoid inherited properties
            console.log(key, response[i][key]);
            customerDataJSON[key] = response[i][key];
          }
        }
        localStorage.setItem("customerData", JSON.stringify(customerDataJSON));
        // return customer is Not New
      }
    }
    console.log(`HI ${localStorage.getItem("cartData")}`);
    if (localStorage.getItem("cartData") == "{}") {
      localStorage.removeItem("cartData");
    }
  });
}
