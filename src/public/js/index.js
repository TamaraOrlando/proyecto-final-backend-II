const socket = io('http://localhost:8080'); 

socket.on("connect", () => {

    console.log("Conectado al servidor WebSocket");

    socket.on("productos", (data) => {

        console.log("Productos recibidos del servidor:", data); 

        if (data && data.length > 0) {
            renderProductos(data);  
        } else {
            console.log("No se recibieron productos válidos.");
        }
    })

    const renderProductos = (productos) => {
        const contenedorProductos = document.getElementById("contenedorProductos");
        contenedorProductos.innerHTML = "";

        productos.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("productCard");

            const productId = item._id.toString();

            card.innerHTML =
                `
            <p class="textCard"> ${item.title} </p>
            <p class="textCard"> $${item.price} </p>
            <button class="deleteBtn" data-id="${productId}"> Eliminar </button>
        `

            contenedorProductos.appendChild(card);

        });

        document.querySelectorAll(".deleteBtn").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.getAttribute("data-id");
                socket.emit("deleteProduct", productId);
            });
        });
    };


    const formularioProducto = document.getElementById("formularioProducto");

    if (formularioProducto) {
        formularioProducto.addEventListener("submit", (e) => {
            e.preventDefault();


            const newProduct = {
                title: e.target.title.value,
                description: e.target.description.value,
                price: e.target.price.value
            };

            socket.emit("addProduct", newProduct);
            e.target.reset();
        });
    }
});
