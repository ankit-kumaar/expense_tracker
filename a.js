let lastActivityTime = null;
const posts = [];

function updateLastUserActivityTime() {
  return new Promise((resolve) => {
    setTimeout(() => {
      lastActivityTime = new Date();
      resolve();
    }, 1000);
  });
}

function createPost(post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts.push(post);
      resolve();
    }, 2000);
  });
}

function deleteLastPost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length > 0) {
        const deletedPost = posts.pop();
        resolve(deletedPost);
      } else {
        reject("ERROR: ARRAY IS EMPTY");
      }
    }, 1000);
  });
}

// Call createPost and updateLastUserActivityTime promises together
createPost({ title: "Post 1" })
  .then(() => updateLastUserActivityTime())
  .then(() => {
    console.log("All promises resolved");
    console.log("Posts:", posts);
    console.log("Last Activity Time:", lastActivityTime);

    return deleteLastPost();
  })
  .then((const productTableBody = document.querySelector('#productTableBody');
  const productNameInput = document.querySelector('#productName');
  const productQuantityInput = document.querySelector('#productQuantity');
  const productPriceInput = document.querySelector('#productPrice');
  const addProductButton = document.querySelector('#addProductButton');
  const totalStockValueCell = document.querySelector('#totalStockValue');
  
  let products = [];
  
  // Adds a new product to the table and updates the total stock value.
  function addProduct() {
    const name = productNameInput.value.trim();
    const quantity = parseInt(productQuantityInput.value);
    const price = parseFloat(productPriceInput.value);
    if (!name || !quantity || !price) {
      alert('Please fill in all the fields.');
      return;
    }
    const totalValue = quantity * price;
    const product = { name, quantity, price, totalValue };
    products.push(product);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>$${product.totalValue.toFixed(2)}</td>
      <td><button class="deleteButton">Delete</button></td>
    `;
    const deleteButton = row.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => deleteProduct(product));
    productTableBody.appendChild(row);
    productNameInput.value = '';
    productQuantityInput.value = '';
    productPriceInput.value = '';
    updateTotalStockValue();
  }
  
  // Deletes a product from the table and updates the total stock value.
  function deleteProduct(product) {
    products = products.filter(p => p !== product);
    const row = productTableBody.querySelector(`tr:has(td:contains(${product.name}))`);
    productTableBody.removeChild(row);
    updateTotalStockValue();
  }
  
  // Updates the total stock value.
  function updateTotalStockValue() {
    const totalValue = products.reduce((acc, p) => acc + p.totalValue, 0);
    totalStockValueCell.innerText = `$${totalValue.toFixed(2)}`;
  }
  
  // Bind the addProduct function to the Add Product button.
  addProductButton.addEventListener('click', addProduct
  deletedPost) => {
    console.log("Deleted Post:", deletedPost);
    console.log("Updated Posts:", posts);
  })
  .catch((error) => {
    console.log(error);
  });