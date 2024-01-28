document
  .getElementById("imageUploadForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

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
            ][0];
          console.log(labels);
          console.log(dominantColour);
        })
        .catch((error) => console.error("Error:", error));
    };

    reader.readAsDataURL(file);
  });
