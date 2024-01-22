const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const imagePreview = document.getElementById("image-preview");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("border-success");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("border-success");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("border-success");

  const files = e.dataTransfer.files;

  handleFiles(files);
});

fileInput.addEventListener("change", () => {
  const files = fileInput.files;

  handleFiles(files);
});

function handleFiles(files) {
  for (const file of files) {
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.classList.add("img-thumbnail");
      img.src = URL.createObjectURL(file);
      imagePreview.appendChild(img);
      fetch("/api/imageSearch")
        .then((response) => response.json())
        .then((details) => console.log(details));
      break;
    }
  }
}
