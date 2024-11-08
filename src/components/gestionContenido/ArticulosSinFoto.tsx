import { Box } from '@mui/material';
import Link from 'next/link';

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';

interface Articulo {
    id: number;
    titulo: string;
    descripcion: string;
    link: string;
}

interface ArticulosSinFotoProps {
    articulos: Articulo[];
}

const ArticulosSinFoto: React.FC<ArticulosSinFotoProps> = ({ articulos }) => {
    return (
        <Box
            className='p-34 flex-column'
            sx={{
                gap: '21px'
            }}
        >
            {articulos.map((articulo) => (
                <div key={articulo.id} className='articulo_contenedor'>
                    <h2 className='h2-semiBold txtcolor-secondary txt-justify'>{articulo.titulo}</h2>
                    <p className='txt-justify'>{articulo.descripcion}</p>

                    {/* ************************************************************************* */}
                    {/* AQUI VAN LOS LINKS DE LOS ARTICULOS */}
                    <Link className='h2-semiBold txtcolor-secondary' style={{ textAlign: 'right' }} href={`/articulos/${articulo.id}`}>
                        Ver más
                    </Link>
                </div>
            ))}
        </Box>
    );
};

export default ArticulosSinFoto;