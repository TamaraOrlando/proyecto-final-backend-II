// Funcionalidad de agregar al carrito

document.addEventListener('DOMContentLoaded', () => {

    
  fetch('/api/products')
  .then(response => response.json())
  .then(data => {
    console.log("Datos recibidos:", data);  
  })
  .catch(error => {
    console.error("Error al obtener productos:", error);
  });



    const addToCartButtons = document.querySelectorAll('#addToCart');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', async () => {
        try {
          

        const cartId = button.getAttribute("cart-id");
        const productId = button.getAttribute("product-id");

        console.log("Cart ID:", cartId);  
        console.log("Product ID:", productId);  

        if (!cartId || !productId) {
            console.error("cartId o productId no definido");
            return;
        }
  
          
          const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: 'POST',
          });
  
          const data = await response.json();
          console.log(data);
  
          
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  });
  