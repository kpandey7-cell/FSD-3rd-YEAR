const cartContainer = document.getElementById('cart-container');
const cartItems = document.getElementById('cart-items');
const totalSpan = document.getElementById('total-amount');

const cart = JSON.parse(localStorage.getItem('cart')) || [];

cartItems.innerHTML = '';

if (cart.length === 0) {
    cartItems.innerHTML = '<p style="color: #666;">Your cart is empty. <a href="ecommers.html">Start shopping</a></p>';
    totalSpan.innerText = '0.00';
} else {
    let total = 0;
    cart.forEach(item => {
        const div = document.createElement('div');
        div.style.border = '1px solid #ddd';
        div.style.padding = '15px';
        div.style.margin = '10px 0';
        div.style.borderRadius = '8px';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.gap = '20px';
        div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'contain';

        const infoDiv = document.createElement('div');
        infoDiv.style.flex = '1';

        const title = document.createElement('h3');
        title.innerText = item.title;

        const price = document.createElement('p');
        price.innerText = `Price: $${item.price}`;
        price.style.fontSize = '18px';
        price.style.color = '#2e7d32';
        price.style.fontWeight = 'bold';

        const quantitySpan = document.createElement('span');
        quantitySpan.innerText = `Quantity: ${item.quantity}`;
        quantitySpan.style.display = 'block';
        quantitySpan.style.marginTop = '10px';

        const itemTotal = item.price * item.quantity;
        const totalSpanItem = document.createElement('span');
        totalSpanItem.innerText = `Item total: $${itemTotal.toFixed(2)}`;
        totalSpanItem.style.display = 'block';
        totalSpanItem.style.marginTop = '5px';
        totalSpanItem.style.fontWeight = 'bold';

        infoDiv.appendChild(title);
        infoDiv.appendChild(price);
        infoDiv.appendChild(quantitySpan);
        infoDiv.appendChild(totalSpanItem);

        div.appendChild(img);
        div.appendChild(infoDiv);

        cartItems.appendChild(div);

        total += itemTotal;
    });

    totalSpan.innerText = total.toFixed(2);
}