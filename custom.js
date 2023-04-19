//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');
let pagarBtn = document.querySelector('.btn-pagar');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions

//======================== Mensaje de gracias por tu compra
pagarBtn.addEventListener('click', function() {
alert('¡Gracias por tu compra!');
});

//==============Mostrar carrito flotante
function showCart(x){
            document.getElementById("products-id").style.display = "block";
        }
//===============cerrar carrito flotante
        function closeBtn(){
            document.getElementById("products-id").style.display = "none";
        }

//========================Funcionalidad del boton añadir al carrito
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
    
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}
// funcion del boton eliminar del carrito
function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    // El contador se quedaba con "1" aunque hubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}€</h5>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value=${amount} class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        
        // Funcionalidad del icono (mas y menos)
        //==============================================================================================================================================================
        const sumarIcono = row.querySelector('.sumar-cantidad');
        const restarIcono = row.querySelector('.restar-cantidad');
        const amountInput = row.querySelector('.carrito-item-cantidad');

        sumarIcono.addEventListener('click', () => {
            product.amount++;
            amountInput.value = product.amount;
            totalCard = parseFloat(totalCard) + parseFloat(price);
            totalCard = totalCard.toFixed(2);
            priceTotal.innerHTML = totalCard;
        });

        restarIcono.addEventListener('click', () => {
            if (product.amount > 1) {
                product.amount--;
                amountInput.value = product.amount;
                totalCard = parseFloat(totalCard) - parseFloat(price);
                totalCard = totalCard.toFixed(2);
                priceTotal.innerHTML = totalCard;
            }
        });

        containerBuyCart.appendChild(row);
    });

    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
}
        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
function clearHtml(){
    containerBuyCart.innerHTML = '';
}
