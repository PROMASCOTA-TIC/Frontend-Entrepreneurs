import { Box } from '@mui/material';
import Link from 'next/link';

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';

interface Articulo {
    id: number;
    titulo: string;
    descripcion: string;
}

interface ArticulosSinFotoProps {
    articulos: Articulo[];
    basePath: string;
}

const ArticulosSinFoto: React.FC<ArticulosSinFotoProps> = ({ articulos, basePath }) => {
    if (!articulos || articulos.length === 0) {
        return <p className="h2-bold txtcolor-primary txt-center">No se encontraron artículos.</p>;
    }
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
                    <p className="txt-justify">
                        {articulo.descripcion
                            ? articulo.descripcion.length > 400
                                ? `${articulo.descripcion.substring(0, 400)}...`
                                : articulo.descripcion
                            : "Sin descripción"}
                    </p>
                    <Link
                        className='h2-semiBold txtcolor-secondary'
                        style={{ textAlign: 'right' }}
                        href={`${basePath}/${articulo.id}`}
                    >
                        Ver más
                    </Link>
                </div>
            ))}
        </Box>
    );
};

export default ArticulosSinFoto;