$(document).ready(function () {
  $("#submitBtn").click(function (event) {
    event.preventDefault(); // Prevent the default form submission

    var form = $(".needs-validation");
    if (form[0].checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.addClass("was-validated");
  });
});
