window.onload = () => {
    let productName = document.querySelector('#productName')
    let productPrice = document.querySelector('#productPrice')
    let productPicture = document.querySelector('#productPicture')
    let productHover = document.querySelector('#productHover')
    let addProductBtn = document.querySelector('.add-product-btn')
    addProductBtn.addEventListener('click', ()=>{
        let newProduct = {
           title : productName.value,
           price:productPrice.value,
           picture:productPicture.value,
           hover:productHover.value,
           id:new Date().getTime()

        }
        let products = JSON.parse(localStorage.getItem('products'))
        if (!products){
            products = []
        }
        products.push(newProduct)
        localStorage.setItem("products",JSON.stringify(products))
        
    })
}

