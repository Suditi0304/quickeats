<script>

// 🛒 CART
let cart = [];
let total = 0;

// DATA
const restaurants = [
{
    name: "McDonald's",
    category: "American",
    menu: [
        {name:"Mc Aloo Tikki", price:80},
        {name:"Crispy Patty Burger", price:120},
        {name:"Cheesy Fries", price:100}
    ],
    img: "https://source.unsplash.com/400x300/?burger"
},
{
    name: "Taco Bell",
    category: "Mexican",
    menu: [
        {name:"Aloo Taco", price:90},
        {name:"Burrito", price:150}
    ],
    img: "https://source.unsplash.com/400x300/?tacos"
},
{
    name: "Domino's",
    category: "Italian",
    menu: [
        {name:"Margherita", price:200},
        {name:"Farmhouse", price:350},
        {name:"Garlic Bread", price:150}
    ],
    img: "https://source.unsplash.com/400x300/?pizza"
},
{
    name: "17 Degrees",
    category: "Desserts",
    menu: [
        {name:"Brownie", price:180},
        {name:"Chocolate Avalanche", price:250}
    ],
    img: "https://source.unsplash.com/400x300/?dessert"
},
{
    name: "Mocha",
    category: "Continental",
    menu: [
        {name:"Cold Coffee", price:160},
        {name:"Shake", price:180}
    ],
    img: "https://source.unsplash.com/400x300/?coffee"
}
];

// DISPLAY
function display(list) {
    const container = document.getElementById("restaurantList");
    container.innerHTML = "";

    list.forEach(r => {
        container.innerHTML += `
            <div class="card" onclick="showMenu('${r.name}', this)">
                <img src="${r.img}">
                <div class="card-content">
                    <h3>${r.name}</h3>
                    <p>${r.category}</p>
                </div>
            </div>
        `;
    });
}

// 🔥 SHOW MENU + HIGHLIGHT
function showMenu(name, element) {

    // Highlight selected
    document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
    element.classList.add("active");

    const r = restaurants.find(x => x.name === name);
    const details = document.getElementById("details");

    let html = `<img src="${r.img}">
                <h2>${r.name}</h2>
                <ul>`;

    r.menu.forEach(item => {
        html += `
            <li>
                ${item.name} - ₹${item.price}
                <button onclick="addToCart('${item.name}', ${item.price})">Add</button>
            </li>
        `;
    });

    html += `</ul>
             <h3>🛒 Cart: <span id="cartCount">${cart.length}</span> items | ₹${total}</h3>`;

    details.innerHTML = html;
}

// 🛒 ADD TO CART
function addToCart(name, price) {
    cart.push(name);
    total += price;

    document.getElementById("cartCount").innerText = cart.length;
}

// SEARCH
document.getElementById("search").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = restaurants.filter(r =>
        r.name.toLowerCase().includes(value)
    );
    display(filtered);
});

// CATEGORY FILTER
document.querySelectorAll(".cat").forEach(cat => {
    cat.addEventListener("click", () => {

        const type = cat.innerText;

        if (type === "All") display(restaurants);
        else {
            const filtered = restaurants.filter(r => r.category === type);
            display(filtered);
        }
    });
});

// INIT
display(restaurants);

</script>