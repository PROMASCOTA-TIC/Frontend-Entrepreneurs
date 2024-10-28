import React from 'react'
import ResumenPedido from '../components/resumen-pedido/ResumenPedido'





const handleClose = () => {
    // Lógica para cerrar el diálogo
  };
  
  const handleDelivered = () => {
    // Lógica para marcar el pedido como entregado
  };
  

export default function ResumenPedidos() {
  return (
<ResumenPedido
  open={true}  
  onClose={handleClose}  
  orderNumber="12345"
  buyer="Juan Pérez"
  orderDate="2024-10-23"
  total="$150.00"
  paymentStatus="Pagado"
  paymentMethod="Tarjeta de Crédito"
  deliveryType="A domicilio"
  sector="Norte"
  address="Av. Siempre Viva 123"
  items={[
    { id: "1", name: "Producto 1", description: "Descripción del producto", price: "$50.00", quantity: "2", totalPrice: "$100.00" },
    { id: "2", name: "Producto 2", description: "Descripción del producto", price: "$25.00", quantity: "2", totalPrice: "$50.00" }
  ]}
  onDelivered={handleDelivered} 
/>

  )
}