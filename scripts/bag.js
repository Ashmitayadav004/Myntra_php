const Convenience_fees = 99;
let bagItemObjects;
// let bagItems;
onLoad();

function onLoad() {
  //   let bagItemStr = localStorage.getItem("bagItems");
  // bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  loadBagItemObjects();
  displayBAgItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;

  bagItemObjects.forEach((bagItem) => {
    totalMRP += Number(bagItem.original_price); // fixed typo
    totalDiscount +=
      Number(bagItem.original_price) - Number(bagItem.current_price);
  });
  finalPayment = totalMRP - totalDiscount + Convenience_fees;

  bagSummaryElement.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order" onclick="placeOrder()">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}
function loadBagItemObjects() {
  console.log(bagItems);

  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

function displayBAgItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";
  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateHtml(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId !== itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBAgItems();
  displayBagSummary();
}
function generateHtml(item) {
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../images/${item.item_image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company_name}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.orginal_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">14 days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">10 Oct 2023</span>
              </div>
            </div>
            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
          </div>`;
}

function placeOrder() {
  let orderData = {
    items: bagItemObjects,
    total_items: bagItemObjects.length,
    total_mrp: bagItemObjects.reduce(
      (sum, item) => sum + item.original_price,
      0
    ),
    total_discount: bagItemObjects.reduce(
      (sum, item) => sum + (item.original_price - item.current_price),
      0
    ),
    final_amount:
      bagItemObjects.reduce((sum, item) => sum + item.current_price, 0) + 99,
  };

 fetch('../process_order.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
})

    .then((res) => res.json())
    .then((data) => alert(data.message))
    .catch((err) => console.error(err));
}
