// For Carousell
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
});
