// Ejemplo de función en el frontend para manejar la compra y vaciado del carrito
async function handlePurchase() {
    try {
        // Realizar la solicitud para confirmar la compra con Stripe
        const response = await fetch('/api/orders/:oid/purchase', { method: 'POST' });
        const data = await response.json();

        // Verificar si la compra se realizó exitosamente
        if (response.status === 200) {
            // Vaciar el carrito en la interfaz de usuario
            clearCartUI();

            // Mostrar mensaje de éxito al usuario
            alert('Purchase completed successfully! Cart cleared.');

            // Opcionalmente, redirigir a una página de confirmación
            window.location.href = '/confirmation';
        } else {
            // Manejar errores si la compra no se realizó correctamente
            alert('Error completing purchase: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error completing purchase: ' + error.message);
    }
}

function clearCartUI() {
    // Código para vaciar el carrito en la interfaz de usuario
    // Por ejemplo, eliminar todos los elementos del carrito en la página
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => item.remove());
}
