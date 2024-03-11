let shop = document.getElementById("shop");

let cartAmount = localStorage.getItem("cartAmount") || 0;

document.getElementById("cartAmount").innerHTML = cartAmount;

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((itemData) => {
      let { id, name, price, desc, img } = itemData;
      const currentItem = basket.find((x) => x.itemId === id);
      return `
    <div id = "product-id-${id}" class="item">
        <img width="220" src = ${img} alt="" height ="250px"/>
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$${price}</h2>
            <div class="buttons">
                <i onclick = "decrement('${id}')" class="bi bi-dash-lg"></i>
                <div id = "${id}" class="quantity">
                ${currentItem ? currentItem.count : 0}
                </div>
                <i onclick = "increment('${id}')" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

const increment = (id) => {
  /*The find function in JavaScript is an array method used to search
   for an element in an array that satisfies a specified condition. 
   It returns the first element in the array that meets the condition, or
    undefined if no such element is found */
  let isItemExists = basket.find((x) => {
    return x.itemId === id;
  });
  if (isItemExists) {
    isItemExists.count += 1;
    ++cartAmount;
    update(id, isItemExists.count);
  } else {
    basket.push({
      itemId: id,
      count: 1,
    });
    ++cartAmount;
    update(id, 1);
  }
  localStorage.setItem("data", JSON.stringify(basket));
  localStorage.setItem("cartAmount", cartAmount);
};

const decrement = (id) => {
  let isItemExists = basket.find((x) => {
    return x.itemId === id;
  });
  if (isItemExists) {
    if (isItemExists.count > 0) {
      isItemExists.count -= 1;
      --cartAmount;
      update(id, isItemExists.count);
    }
  }
  /*useless to store the items which have count zero */
  basket = basket.filter((x) => x.count !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
  localStorage.setItem("cartAmount", cartAmount);
};

const update = (id, count) => {
  document.getElementById(id).innerHTML = count;
  document.getElementById("cartAmount").innerHTML = cartAmount;
};
