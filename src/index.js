let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:"grey",
        tag:"grey shirt",
        price:15,
        incart:0
    
    },
    {
        name:"Brown",
        tag:"Brown shirt",
        price:20,
        incart:0
    
    },
    {
        name:"Green",
        tag:"Green shirt",
        price:25,
        incart:0
    
    },
    {
        name:"Amber",
        tag:"Amber shirt",
        price:30,
        incart:0
    
    },
    {
        name:"Blue",
        tag:"Blue shirt",
        price:35,
        incart:0
    
    },
    {
        name:"Maroon",
        tag:"Maroon shirt",
        price:15,
        incart:0
    
    }


];

function onLoadNumbers(){
    let productNumber = localStorage.getItem('cartnumbers');
    if(productNumber){
        document.querySelector('.cart span').textContent = productNumber;
    }
}

for(let i = 0;i<carts.length;i++){
    //console.log(i);
    carts[i].addEventListener('click',()=>{       
        cartNumbers(products[i]);
        totalCost(products[i]);
    })   

}

function cartNumbers(products){
    console.log('product clicked is:', products)

    let productNumber = localStorage.getItem('cartnumbers');
    console.log(productNumber);
    productNumber = parseInt(productNumber);

    console.log(typeof productNumber);
    if(productNumber){
        localStorage.setItem('cartnumbers',productNumber + 1);
        document.querySelector('.cart span').textContent = productNumber + 1;

 
    } else{
        localStorage.setItem('cartnumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(products);

}
function setItems(products){

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);    
    console.log('my cart items are', cartItems);

    if( cartItems !=null){
        if(cartItems[products.tag] == undefined ){
            
            cartItems ={
                ...cartItems,
                [products.tag]:products
            }

        }
        cartItems[products.tag].incart += 1

    }else{
        products.incart = 1;

        cartItems = {
            [products.tag]:products
        };
    }

    localStorage.setItem('productsInCart',JSON.stringify(cartItems));


}

function totalCost(products){
    let cartCost = localStorage.getItem('totalCost');   

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost',
        cartCost+ products.price
        
        );

    } else {
        localStorage.setItem('totalCost',products.price);

    }
  

    

}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    let productsTable = document.querySelector('.products-table tbody');

  
   
    if(cartItems && productsTable){
       productsTable.innerHTML = '';
      
       Object.values(cartItems).map(items =>{

        productsTable.innerHTML +=
        `
        <tr>        
        <td>
        <ion-icon name="close-circle" class ="cancle" ></ion-icon> 
        <span>${items.tag}</span>
        </td> 
        <td>${items.price}</td> 
        <td>
        <ion-icon name="caret-back-outline"  class="increase"></ion-icon>
         <span> ${items.incart}</span>
         <ion-icon name="caret-forward-outline" class="increase" ></ion-icon>
        </td> 
        <td>${items.price * items.incart}</td> 
        
        </tr>
        
        
        
        `;
        

       });

       


      

       


    }
    
}

 function displayTotals(){
let totalCost = localStorage.getItem('totalCost');
totalCost = JSON.parse(totalCost);

 document.querySelector('.sub-total-cost').textContent =`Ksh.${totalCost}.00`;
 document.querySelector('.total-cost').textContent =`Ksh.${totalCost}.00`;
    
 }


 document.querySelector('.cash-out').addEventListener('click',()=>{
     alert('Thanks for shopping with us');
 })


onLoadNumbers();

displayCart();

displayTotals();
   

    //console.log(typeof productNumber);
   