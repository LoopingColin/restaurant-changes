class Store {
    constructor() {

        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0
        }

        this.menu = {
            item1: {
                id: 1,
                dish: 'grilled hotdogs',
                img: 'media/banner1.jpg',
                alt: 'bbq hotdogs',
                price: 9.99,
                qty: 0

            },

            item2: {
                id: 2,
                dish: 'RIBS',
                img: 'media/banner2.jpg',
                alt: 'RIBS',
                price: 15.99,
                qty: 0
            },

            item3: {
                id: 3,
                dish: 'BRISKET',
                img: 'media/banner3.jpg',
                alt: 'BRISKET',
                price: 21.99,
                qty: 0
            },

            item4: {
                id: 4,
                dish: 'SHISH KABOB',
                img: 'media/banner4.jpg',
                alt: 'shish kabob',
                price: 15.40,
                qty: 0
            },

            item5: {
                id: 5,
                dish: 'Chicken Plate',
                img: 'media/banner5.jpg',
                alt: 'chicken plate',
                price: 10.99,
                qty: 0
            },

            item6: {
                id: 6,
                dish: 'porkchop',
                img: 'media/banner6.jpg',
                alt: 'porkchop',
                price: 8.99,
                qty: 0
            },

            item7: {
                id: 7,
                dish: 'smoked hamburger',
                img: 'media/heroBg.jpg',
                alt: 'smoked hamburger',
                price: 14.99,
                qty: 0
            },

            item8: {
                id: 8,
                dish: 'pulled pork',
                img: 'media/img6.jpg',
                alt: 'pulled pork',
                price: 18.99,
                qty: 0
            }
        }
    }

    init() {
        this.loadItems();
        this.addToCart();
        // this.displayCheckoutItems();
        this.checkout();
        this.homeSwitch();
        this.confirmOrder();
    }

    loadItems() {
        let ProductDiv = document.getElementById('ProductDiv');
        // console.log(ProductDiv);

        for (const key in this.menu) {
            const item = this.menu[key];
            const product = document.createElement('div');
            product.className = 'col-md-3';
            product.innerHTML = `
                    <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img">
                    <p class="caption" id="itemCaption">${item.dish} <span class="price" id="itemPrice">${item.price}</span></p>
                    <button class="btn menu-btn" id="menuBtn" data-id="${item.id}">add to cart</button>
                `;
            // console.log(product)
            ProductDiv.append(product);
        }
    }

    addToCart() {
        // set variables
        let buttons = document.querySelectorAll('.menu-btn');
        let cartItems = document.getElementById('cartItems');
        let cartSubtotal = document.getElementById('cartSubtotal');
        let itemCount = 0;
        let price = 0;


        let subTimesQty = 0;
        let subtotalValue = document.getElementById('subtotalValue');
        let taxValue = document.getElementById('taxValue');
        let tax = 0;
        // let deliveryValue = document.getElementById('deliveryValue');
        // let checkoutItemCount = document.getElementById('checkoutItemCount');
        // let deliveryFee = 6; 
        let total = 0;
        let totalValue = document.getElementById('totalValue');


        for (const key in this.menu) {
            const item = this.menu[key];
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    if (button.dataset['id'] == item.id) {
                        // console.log(item.id);
                        itemCount++;
                        price += item.price;
                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subtotal = price;

                        item.qty++;
                        // console.log(item);
                        // console.log(this.itemsInCart);

                        subTimesQty = (item.price * item.qty).toFixed(2);
                        // console.log(subTimesQty);
                        tax = this.itemsInCart.subtotal * .07;

                        total = (this.itemsInCart.subtotal + tax + deliveryFee).toFixed(2);

                    }

                    // send back to DOM
                    cartItems.innerText = itemCount;
                    cartSubtotal.innerText = price.toFixed(2);
                    subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2);
                    deliveryValue.innerText = deliveryFee.toFixed(2);

                    taxValue.innerText = tax.toFixed(2)

                    totalValue.innerText = total;

                    if (this.itemsInCart.itemCount == 1) {
                        checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                    } else {
                        checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
                    }
                })
            })
        }

    }

    checkout() {
        let cartBtn = document.getElementById('cartBtn');
        let checkoutPage = document.getElementById('checkoutPage');
        let menuSection = document.getElementById('menuSection');
        let table = document.getElementById('tbody');

        let subTimesQty = 0;

        cartBtn.addEventListener('click', () => {
            // console.log('clicked')

            if (menuSection.classList.contains('d-none')) return
            checkoutPage.classList.remove('d-none');
            menuSection.classList.add('d-none')

            for (const key in this.menu) {
                const item = this.menu[key];

                if (item.qty > 0) {
                    subTimesQty = (item.qty * item.price).toFixed(2);
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'item-checkout';

                    tableRow.innerHTML += `
                        <td id="itemImg">
                            <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img">
                        </td>
                        <td class="unit-price">${item.price.toFixed(2)}</td>
                        <td class="item-quantity">${item.qty}</td>
                        <td class="item-subtotal">${subTimesQty}</td>
                    `;

                    table.append(tableRow);
                }
            }
        })


    }

}

let restaurant = new Store();

restaurant.init();





