const Products = () => {
    let products = JSON.parse(localStorage.getItem('products'))
    let productsContainer = document.querySelector(".products.container")

    if (products) {
        for (let i = 0; i < products.length; i++) {
            productsContainer.innerHTML += productHtml(products[i])
        }
        const renderdProducts = productsContainer.querySelectorAll(".product-img")
        for (let i = 0; i < renderdProducts.length; i++) {
            renderdProducts[i].addEventListener("mouseover", function (event) {
                const hoverimage = this.dataset.hover
                this.dataset.hover = this.style.backgroundImage;
                this.style.backgroundImage = hoverimage;
            })
        }
    }

    function productHtml(product) {
        return `<div class="about-product">
                    <div class="product-img" 
                        style="background-image:url(${product.picture})"
                        data-hover="url(${product.hover})">
                        <div class="add-in-cart">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                    <a href="#" class="product-details">${product.title}</a>
                    <span>$ ${product.price}</span>
                </div>`;
    }
};