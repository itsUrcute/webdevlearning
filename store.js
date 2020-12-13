function ready(){
        let removeButtons = document.getElementsByClassName('btn-red')
        for(let i=0; i<removeButtons.length;i++){
            let button = removeButtons[i]
            button.addEventListener('click',removeCart)
        }
        let quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for(let i=0; i<quantityInputs.length;i++){
            let qinp = quantityInputs[i]
            qinp.addEventListener('change',inpUpdate)
            total()

        }
        let addButton = document.getElementsByClassName("btn-shop-item")
        for(let i=0;i<addButton.length;i++){
            let button = addButton[i]
            button.addEventListener('click',addCart)
        }
        let purchaseButton = document.getElementsByClassName("btn-purchase")[0]
        purchaseButton.addEventListener('click',purchase)
}

function total(){
    let cartItem = document.getElementsByClassName('cart-items')[0]
    let row = cartItem.getElementsByClassName('cart-row')
    let totalcost=0
    for(let i=0; i<row.length;i++){
        let currentRow=row[i]
        let price=currentRow.getElementsByClassName('cart-price')[0]
        let quantity=currentRow.getElementsByClassName('cart-quantity-input')[0].value
        price = parseFloat(price.innerText.replace("$",""))
        totalcost+=(price*quantity)
    }
    totalcost = Math.round(totalcost*100)/100
    document.getElementsByClassName("cart-total-price")[0].innerText = `$${totalcost}`
}

function addCart(event){
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    let image = shopItem.getElementsByClassName("shop-item-image")[0].src
    addToCart(title,price,image)
}

function addToCart(title,price,image){
    let cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    let cartItemNames = cartItems.getElementsByClassName("cart-item-name")
    for (let i = 0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('this item is already in your cart')
            return
        }
    }
    let cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src=${image} width="100">
        <span class=cart-item-name>${title}</span>
    </div>
        <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-red">remove</button>
    </div>`
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    total()
    cartRow.getElementsByClassName('btn-red')[0].addEventListener('click',removeCart)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',total)
}

function inpUpdate(event){
    let input = event.target
    if(input.value<1 || isNaN(input.value)){
        input.value = 1
    }
    total()
}

function removeCart(event){
    let clicked = event.target
    clicked.parentElement.parentElement.remove()
    total()

}

function purchase(){
    let cartItems = document.getElementsByClassName("cart-items")[0]
    if(!cartItems.hasChildNodes()){
        return alert('there are no items in your cart')
    }
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    alert('thank you for your purchase')
    total()
}
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}

