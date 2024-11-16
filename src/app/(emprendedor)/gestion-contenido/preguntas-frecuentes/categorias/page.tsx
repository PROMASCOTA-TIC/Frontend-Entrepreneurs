"use client";

import { useEffect, useState } from 'react';

import '/src/assets/styles/gestionContenido/general.css';
import ArticulosSinFoto from '@/components/gestionContenido/ArticulosSinFoto';

const articulos = [
    {
        id: 1,
        titulo: 'Título del Artículo 1',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nulla, lectus feugiat tristique per dui erat nullam posuere conubia, interdum parturient tempor quam aliquet dictumst cubilia. Iaculis risus quisque duis fusce sem vestibulum odio, penatibus nibh euismod dictum sodales porta laoreet, class orci venenatis porttitor tortor curae. Aliquet faucibus volutpat laoreet parturient erat feugiat blandit habitant penatibus quisque lacus augue nascetur proin primis, pretium nam accumsan gravida rhoncus ligula ac vivamus arcu quis eu praesent massa risus.',
        link: '/articulo/1',
    },
    {
        id: 2,
        titulo: 'Título del Artículo 2',
        descripcion: 'Descripción del Artículo 2Lorem ipsum dolor sit amet consectetur adipiscing elit nulla, lectus feugiat tristique per dui erat nullam posuere conubia, interdum parturient tempor quam aliquet dictumst cubilia. Iaculis risus quisque duis fusce sem vestibulum odio, penatibus nibh euismod dictum sodales porta laoreet, class orci venenatis porttitor tortor curae. Aliquet faucibus volutpat laoreet parturient erat feugiat blandit habitant penatibus quisque lacus augue nascetur proin primis, pretium nam accumsan gravida rhoncus ligula ac vivamus arcu quis eu praesent massa risus.',
        link: '/articulo/2',
    },
    {
        id: 3,
        titulo: 'Título del Artículo 3',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nulla, lectus feugiat tristique per dui erat nullam posuere conubia, interdum parturient tempor quam aliquet dictumst cubilia. Iaculis risus quisque duis fusce sem vestibulum odio, penatibus nibh euismod dictum sodales porta laoreet, class orci venenatis porttitor tortor curae. Aliquet faucibus volutpat laoreet parturient erat feugiat blandit habitant penatibus quisque lacus augue nascetur proin primis, pretium nam accumsan gravida rhoncus ligula ac vivamus arcu quis eu praesent massa risus.',
        link: '/articulo/3',
    },
];

const PF_Categorias = () => {
    // const [categoria, setCategoria] = useState('');
    // const [articulos, setArticulos] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         // Aquí obtendrás los datos de la base de datos
    //         // Reemplaza la URL con tu API real
    //         const response = await fetch('/api/articulos'); // API ficticia para el ejemplo
    //         const data = await response.json();

    //         setCategoria(data.categoria);
    //         setArticulos(data.articulos);
    //     };

    //     fetchData();
    // }, []);

    return (
        <div>
            {/* <h1 className='h1-bold colortext-primary' style={{ padding: '34px 0px 0px 55px' }}>{categoria}</h1> */}
            <h1 className='h1-bold txtcolor-primary' style={{ padding: '21px 0px 0px 55px' }}>Categoria</h1>

            <ArticulosSinFoto articulos={articulos} />
        </div>
    );
};

export default PF_Categorias;
