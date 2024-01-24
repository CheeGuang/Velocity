document.getElementById("productListing").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    //This is to randomise the color blob (Return a value between 0 and 100)
    let hue = Math.floor(Math.random() * 100);
    let saturation = Math.floor(Math.random() * 100);
    let lightness = Math.floor(Math.random() * 100);

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};
