import { Box } from '@mui/material';
import Link from 'next/link';

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';

interface Articulo {
    id: number;
    titulo: string;
    descripcion: string;
    link: string;
    imagen: string;
}

interface ArticulosConFotoProps {
    articulos: Articulo[];
}

const ArticulosConFoto: React.FC<ArticulosConFotoProps> = ({ articulos }) => {
    return (
        <Box
            className='p-34 flex-column'
            sx={{
                gap: '21px'
            }}
        >
            {articulos.map((articulo) => (
                <div key={articulo.id} className='categorias_articulo_contenedor'>
                    <div className='flex-column' style={{ width: '90%', gap: '8px', paddingRight: '34px' }}>
                        <h2 className='h2-semiBold txtcolor-secondary txt-justify'>{articulo.titulo}</h2>
                        <p className='txt-justify'>{articulo.descripcion}</p>


                        {/* ************************************************************************* */}
                        {/* AQUI VAN LOS LINKS DE LOS ARTICULOS */}
                        <Link className='h2-semiBold txtcolor-secondary' style={{ textAlign: 'right' }} href={`/articulos/${articulo.id}`}>
                            Ver más
                        </Link>

                    </div>
                    <img src={articulo.imagen} alt={articulo.titulo} className='categorias_articulo_imagen' style={{ width: '10%' }} />
                </div>
            ))}
        </Box>
    );
};

export default ArticulosConFoto;