let basket = JSON.parse(localStorage.getItem("data")) || [];
let cartAmount = localStorage.getItem("cartAmount") || 0;

document.getElementById("cartAmount").innerHTML = cartAmount;

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let generateCartItems = () => {
  if (basket.length > 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        const { itemId, count } = x;
        const cartItem = shopItemsData.find((x) => x.id === itemId);
        return `
        <div class="cart-item">
            <img src = ${cartItem.img} width = "100" height = "110px">
            <div class = "details">
                <div class = "title-price-x">
                    <h4 class = "title-price">
                    <p>${cartItem.name}</p>
                    <p class = "cart-item-price">$${cartItem.price}</p>
                    </h4>
                    <i onclick = "removeItem('${itemId}', ${count})" class="bi bi-x-lg"></i>
                </div>
                <div class="buttons">
                    <i onclick = "decrement('${itemId}')" class="bi bi-dash-lg"></i>
                    <div id = "${itemId}" class="quantity">
                        ${count}
                    </div>
                    <i onclick = "increment('${itemId}')" class="bi bi-plus-lg"></i>
                </div>
             <h3>$${count * cartItem.price}</h3>
            </div>
        </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href = "index.html">
      <button class = "home-button"> Back to Home</button>
    </a>
    `;
  }
};

generateCartItems();

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
  generateCartItems();
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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  localStorage.setItem("cartAmount", cartAmount);
};

const update = (id, count) => {
  document.getElementById(id).innerHTML = count;
  document.getElementById("cartAmount").innerHTML = cartAmount;
  totalAmount();
};

const removeItem = (itemId, count) => {
  basket = basket.filter((x) => x.itemId != itemId);
  cartAmount -= count;
  document.getElementById("cartAmount").innerHTML = cartAmount;
  localStorage.setItem("data", JSON.stringify(basket));
  localStorage.setItem("cartAmount", cartAmount);
  generateCartItems();
  totalAmount();
};

const totalAmount = () => {
  if (basket.length > 0) {
    let itemsCost = basket.map((x) => {
      const { itemId, count } = x;
      const cartItem = shopItemsData.find((x) => x.id == itemId);
      return count * cartItem.price;
    });
    let totalAmount = 0;
    for (let cost of itemsCost) totalAmount += cost;
    label.innerHTML = `
    <h2>Total Bill : $ ${totalAmount}</h2>
    <button class = "checkout"> Checkout</button>
    <button onclick = "clearCart()" class = "clear-cart">Clear Cart</button>
    `;
  }
};

totalAmount();

const clearCart = () => {
  basket = [];
  cartAmount = 0;
  localStorage.setItem("data", JSON.stringify(basket));
  localStorage.setItem("cartAmount", cartAmount);
  document.getElementById("cartAmount").innerHTML = cartAmount;
  generateCartItems();
};
