// SHOPPING CART
function ShoppingCart() {
    // { id: numero de discos en el carrito }
     let cart = JSON.parse(sessionStorage.getItem('cart'));
     if (cart === null) {
        cart = {}
        sessionStorage.setItem('cart', JSON.stringify({}))
    }
    this.addOne = function(id) {
        if (cart[id])
            cart[id] += 1;
        else 
            cart[id] = 1;
        sessionStorage.setItem('cart', JSON.stringify(cart))
        return cart[id];
    }
    this.removeOne = function(id) {
        if (cart[id] && cart[id] >= 1) {
            cart[id] -= 1;
            sessionStorage.setItem('cart', JSON.stringify(cart))
        }
        return cart[id];
    }   
    this.get = function(){
        return cart;
    }
    this.getTotalById = function(id) {
        return cart[id] || 0
    }
    this.getTotalAmount = function(){
        let total = 0;
        Object.keys(cart).forEach(productId => {
            const price = db.getById(productId).price
            const totalAmount = cart[productId]
            total += price * totalAmount
        })
        return total;    
    }
    this.getTotalProducts = function(){
        let total = 0;
        Object.keys(cart).forEach(productId => {
            total += cart[productId]
        })  
        return total;      
    }   
}
function Product(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
}
var myShoppingCart = new ShoppingCart();

//MiniCart
 const shoppinCartEl = document.getElementById('miniCart');
 function miniCartbuildup(){
    const productsInCart = []   
     for (const productId in myShoppingCart.get())
     {
     if (myShoppingCart.get() [productId] > 0 )
        productsInCart.push(
      {
        quantity: myShoppingCart.get()[productId],
        title: db.getById(productId).name,
        image: db.getById(productId).src,
        price: db.getById(productId).price,
      })
    productsInCart.forEach(item =>{     
    const itemEl  = document.createElement("div");
    itemEl.className = "container content-center flex flex-wrap p-6 mx-auto";

    const imageEl = document.createElement("img");
    imageEl.src = item.image;
    imageEl.className = "h-24 w-24 rounded-full content-start mx-12"

    const miniSummaryEl = document.createElement("div");
    miniSummaryEl.className = "content-center flex flex-wrap m-6";

    const miniTitleEl = document.createElement("span");
    miniTitleEl.textContent = item.title;
    miniTitleEl.className = "text-4x1 text-gray items-center justify-center mx-auto"

   function totalprice(){
       let total = 0;
       const price = item.price;
       const quantity = item.quantity;
       total = price*quantity;
       return total
   }  
   const miniCartControlsEl = document.createElement("span");
   miniCartControlsEl.className = " m-auto p-auto  flex flex-wrap";
   
   const addBtnEl = document.createElement("button")
   addBtnEl.innerHTML = `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="fill-current  mx-6 my-2 py-auto text-yellow-900  " >
   <path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h2a1 1 0 0 1 0 2h-2v2a1
   1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2z"/>
   </svg>`

   const totalEl = document.createElement("span");
   totalEl.textContent = item.quantity;
   
   const removeBtnEl = document.createElement("button");
   removeBtnEl.innerHTML = `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="fill-current text-red-900 mx-6 my-2 py-auto" style="transform: rotate(45deg);">
   <path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2z"/>
   </svg>
   `
   //   removeBtnEl.addEventListener("click", () =>{
     
       // })
       
   const minipriceEl = document.createElement("span");
   minipriceEl.textContent =  "Total: $ " + totalprice();
   minipriceEl.className = "text-2x1 text-gray m-4 ml-12";
       
   addBtnEl.addEventListener("click", () =>{
     const newTotal = (item.quantity + 1);
     productsInCart.quantity = newTotal; 
     totalEl.textContent = productsInCart.quantity;
     return newTotal
   })

   shoppinCartEl.appendChild(itemEl);    
   itemEl.appendChild(imageEl);
   itemEl.appendChild(miniSummaryEl);
       
   miniSummaryEl.appendChild(miniTitleEl);
   miniSummaryEl.appendChild(miniCartControlsEl);
       
   miniCartControlsEl.appendChild(removeBtnEl);
   miniCartControlsEl.appendChild(totalEl);
   miniCartControlsEl.appendChild(addBtnEl);
   miniSummaryEl.appendChild(minipriceEl);     
    })   
  }
}
