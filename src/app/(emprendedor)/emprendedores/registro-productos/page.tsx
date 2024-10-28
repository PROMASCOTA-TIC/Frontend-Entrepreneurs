import React from 'react'
import TipoPublicacion from '../components/registro-productos/TipoPublicacion'
import TipoMascota from '../components/registro-productos/TipoMascota'
import FormularioRegistroProducto from '../components/registro-productos/FormularioProducto'
import ArchivosMultimedia from '../components/registro-productos/ArchivosMultimedia'





export default function RegistroProducto() {
  return (
    <>
    <TipoPublicacion/>
    <TipoMascota/>
    <FormularioRegistroProducto/>
    <ArchivosMultimedia/>
    </>

  )
}