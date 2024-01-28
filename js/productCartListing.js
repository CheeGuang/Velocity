function CardCreation(product) {
  let itemCard = document.createElement("li");
  itemCard.className = "itemCard";

  //Second container for itemImg
  let itemImageContainer = document.createElement("div");
  itemImageContainer.className = "itemImageContainer";

  //Second container for itemTitle and itemCount
  let itemDetailContainer = document.createElement("div");
  itemDetailContainer.className = "itemDetailContainer";

  //These are the child containers
  let itemImg = document.createElement("img");
  itemImg.className = "itemImg";

  let itemTitle = document.createElement("div");
  itemTitle.className = "itemTitle";

  // Store the itemCount + delBtn
  let actionCount = document.createElement("div");
  actionCount.className = "actionCount";

  let itemCount = document.createElement("div");
  itemCount.className = "itemCount";

  //Append the child to the parent itemCard
  itemImageContainer.appendChild(itemImg);
  itemDetailContainer.appendChild(itemTitle);
  actionCount.appendChild(delBtn);
  actionCount.appendChild(itemCount);
  actionCount.appendChild(addItemBtnBag);
  itemDetailContainer.appendChild(actionCount);

  itemCard.appendChild(itemImageContainer);
  itemCard.appendChild(itemDetailContainer);

  // Get Quantity from local storage
  let quantity = 0;
  for (let i = 0; i < cartData.length; i++) {
    if (product["name"] == cartData[i][0]["name"]) {
      quantity = cartData[i][1];
    }
  }

  itemImg.src = product["imagePath"];
  itemTitle.innerHTML = product["name"];
  itemCount.innerHTML = `Qty: ${quantity}`;

  return itemCard;
}
