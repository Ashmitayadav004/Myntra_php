let bagItems;
onLoad();

function onLoad() {
  let bagItemStr = localStorage.getItem("bagItems");
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayItemOnHomePage();
  displayBagIcon();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCount = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagItemCount.style.visibility = "visible";

    bagItemCount.innerText = bagItems.length;
  } else {
    bagItemCount.style.visibility = "hidden";
  }
}

function displayItemOnHomePage() {
  let itemContainerElement = document.querySelector(".items-container");
  if(!itemContainerElement){
    return;
  }

  let innerHTML = "";

  items.forEach((item) => {
    innerHTML += `<div class="item-container">
            <img class="item-image" src="images/${item.item_image}"alt="item image">
            <div class="rating">
                ${item.rating.stars} ⭐ | ${item.rating.noOfReviews}
            </div>
            <div class="company-name">${item.company_name}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs${item.orginal_price} </span>
                <span class="dicount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add" onclick="addToBag(${item.id})">Add to Bag</button>


        </div>
`;
  });
  itemContainerElement.innerHTML = innerHTML;
}
