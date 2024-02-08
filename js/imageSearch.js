document
  .getElementById("imageUploadForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Using the sleep function
    showModal();

    const file = document.getElementById("imageInput").files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAfODrfyamagW_DLjezjgVJRZ8XsXSkUCQ",
        {
          method: "POST",
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64String,
                },
                features: [
                  {
                    type: "LABEL_DETECTION",
                  },
                  {
                    type: "IMAGE_PROPERTIES",
                  },
                ],
              },
            ],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let labels = data["responses"][0]["labelAnnotations"];
          let dominantColour =
            data["responses"][0]["imagePropertiesAnnotation"]["dominantColors"][
              "colors"
            ][0]["color"];
          console.log(labels);
          console.log(dominantColour);

          let searchedProduct = {
            type: "Undefined",
            colour: "Undefined",
          };
          for (let i = 0; i < labels.length; i++) {
            if (
              [
                "Walking shoe",
                "Sportswear",
                "Sneakers",
                "Sports gear",
                "Atheletic shoe",
              ].includes(labels[i]["description"])
            ) {
              if (
                ["Sportswear", "Sports Gear", "Atheletic Shoe"].includes(
                  labels[i]["description"]
                )
              ) {
                console.log("sportswear");
                searchedProduct["type"] = "sportswear";

                break;
              }
              console.log(labels[i]["description"].toLowerCase());
              searchedProduct["type"] = labels[i]["description"].toLowerCase();
              break;
            }
          }
          console.log(
            getColorNameFromRGB(
              dominantColour["red"],
              dominantColour["green"],
              dominantColour["blue"]
            )
          );
          searchedProduct["colour"] = getColorNameFromRGB(
            dominantColour["red"],
            dominantColour["green"],
            dominantColour["blue"]
          );
          localStorage.setItem(
            "searchedImage",
            JSON.stringify(searchedProduct)
          );

          sleep(2000).then(() => {
            window.location.href = "productPage.html";
          });
        })
        .catch((error) => console.error("Error:", error));
    };

    reader.readAsDataURL(file);
  });

function getColorNameFromRGB(r, g, b) {
  // Define thresholds for colors (very basic example)
  if (r > 200 && g > 200 && b < 100) return "Orange";
  if (r <= 100 && g <= 100 && b >= 50 && g < b) return "Blue";
  if (r < 100 && g > 200 && b < 100) return "Green";
  if (r > 150 && g < 150 && b > 150) return "Purple";
  if (r >= 190 && g >= 140 && b < 100) return "Yellow";
  if (r > 200 && g > 200 && b > 200) return "White";
  if (Math.abs(r - g) <= 10 && Math.abs(g - b) <= 10 && Math.abs(b - r) <= 10)
    return "Grey";
  if (r >= 60 && g >= 40 && b <= 50) {
    return "Brown";
  }
  if (r < 100 && g > 200 && b > 200) return "Cyan";
  if (r > g && r > b && r > 100) return "Red";
  if (r < 100 && g < 100 && b < 100) return "Black";
  if (g > r && g > b) return "Green";
  if (r <= 100 && g <= 115 && b >= 160) return "Blue";

  // Default to 'Undefined' if no match
  return "Undefined";
}

function showModal() {
  $("#modal-backdrop")
    .css("display", "block")
    .delay(10)
    .queue(function (next) {
      $(this).css("opacity", "1"); // Fade in the backdrop
      next();
    });

  $("#animation-modal")
    .css("display", "block")
    .delay(10)
    .queue(function (next) {
      $(this).css({ opacity: "1", transform: "translate(-50%, -50%)" }); // Fade in and move the modal into place
      next();
    });
  $("#custom-lottie-target-animation").css("display", "block");
}
