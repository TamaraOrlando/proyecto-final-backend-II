
let cartId = localStorage.getItem("cartId");


if (!cartId) {
    cartId = `carrito_${Date.now()}`; 
    localStorage.setItem("cartId", cartId); 
}
console.log(`El ID del carrito es: ${cartId}`); 


async function agregarAlCarrito(productId) {
    let cartId = localStorage.getItem("cartId");
    console.log(`Agregando producto ${productId} al carrito ${cartId}`); 

    fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 1 }), 
    })
    .then(response => {
        console.log('Respuesta del servidor:', response);
        if (!response.ok) {
            throw new Error("Error al agregar el producto al carrito");
        }
        return response.json();
    })
    .then(carritoActualizado => {
        console.log("Carrito actualizado:", carritoActualizado);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un problema al agregar el producto al carrito.");
    });
}
