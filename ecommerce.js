let products = [];

const getProduct = async () => {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        products = data;
        console.log(products);

        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        products.map((product, index) => {
            const div = document.createElement('div');
            div.style.border = '1px solid #ddd';
            div.style.padding = '15px';
            div.style.borderRadius = '8px';
            div.style.textAlign = 'center';
            div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.title;
            img.style.width = '100%';
            img.style.maxWidth = '150px';
            img.style.height = '150px';
            img.style.objectFit = 'contain';

            const title = document.createElement('h1');
            title.innerText = product.title.substring(0, 30) + '...';
            title.style.fontSize = '16px';
            title.style.margin = '10px 0';

            const price = document.createElement('h2');
            price.innerText = `$${product.price}`;
            price.style.fontSize = '20px';
            price.style.color = '#2e7d32';
            price.style.margin = '5px 0';

            const quantityDiv = document.createElement('div');
            quantityDiv.style.display = 'flex';
            quantityDiv.style.alignItems = 'center';
            quantityDiv.style.justifyContent = 'center';
            quantityDiv.style.gap = '10px';
            quantityDiv.style.margin = '10px 0';

            const incrementBtn = document.createElement('button');
            incrementBtn.innerText = "+";
            incrementBtn.style.padding = '5px 15px';
            incrementBtn.style.cursor = 'pointer';
            incrementBtn.style.fontSize = '18px';
            incrementBtn.style.border = '1px solid #ccc';
            incrementBtn.style.borderRadius = '4px';
            incrementBtn.style.backgroundColor = '#4CAF50';
            incrementBtn.style.color = 'white';

            const quantitySpan = document.createElement('span');
            quantitySpan.innerText = "0";
            quantitySpan.style.fontSize = '20px';
            quantitySpan.style.fontWeight = 'bold';
            quantitySpan.style.minWidth = '30px';

            const decrementBtn = document.createElement('button');
            decrementBtn.innerText = "-";
            decrementBtn.style.padding = '5px 15px';
            decrementBtn.style.cursor = 'pointer';
            decrementBtn.style.fontSize = '18px';
            decrementBtn.style.border = '1px solid #ccc';
            decrementBtn.style.borderRadius = '4px';
            decrementBtn.style.backgroundColor = '#f44336';
            decrementBtn.style.color = 'white';

            const addItemSpan = document.createElement('span');
            addItemSpan.innerText = "ADD ITEM";
            addItemSpan.style.display = 'block';
            addItemSpan.style.marginTop = '10px';
            addItemSpan.style.cursor = 'pointer';
            addItemSpan.style.color = 'white';
            addItemSpan.style.backgroundColor = '#1976d2';
            addItemSpan.style.padding = '8px';
            addItemSpan.style.borderRadius = '4px';
            addItemSpan.style.transition = 'background-color 0.3s';

            let quantity = 0;

            incrementBtn.addEventListener('click', function() {
                quantity++;
                quantitySpan.innerText = quantity;
                console.log(`Product ${index + 1} quantity: ${quantity}`);
            });

            decrementBtn.addEventListener('click', function() {
                if (quantity > 0) {
                    quantity--;
                    quantitySpan.innerText = quantity;
                    console.log(`Product ${index + 1} quantity: ${quantity}`);
                }
            });

            addItemSpan.addEventListener('click', function() {
                if (quantity > 0) {
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const existingIndex = cart.findIndex(item => item.id === product.id);
                    if (existingIndex !== -1) {
                        cart[existingIndex].quantity += quantity;
                    } else {
                        cart.push({
                            id: product.id,
                            image: product.image,
                            title: product.title,
                            price: product.price,
                            quantity: quantity
                        });
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`Added ${quantity} item(s) to cart!`);
                    window.location.href = "cart.html";
                    quantity = 0;
                    quantitySpan.innerText = quantity;
                } else {
                    alert('Please select quantity first!');
                }
            });

            addItemSpan.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#1565c0';
            });

            addItemSpan.addEventListener('mouseout', function() {
                this.style.backgroundColor = '#1976d2';
            });

            quantityDiv.appendChild(decrementBtn);
            quantityDiv.appendChild(quantitySpan);
            quantityDiv.appendChild(incrementBtn);

            div.appendChild(img);
            div.appendChild(title);
            div.appendChild(price);
            div.appendChild(quantityDiv);
            div.appendChild(addItemSpan);

            productContainer.appendChild(div);
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('product-container').innerHTML = `
            <p style="color: red;">Failed to load products.</p>
            <p>Error: ${error.message}</p>
            <p>Make sure you're running on a local server (Live Server)</p>
        `;
    }
}

getProduct();