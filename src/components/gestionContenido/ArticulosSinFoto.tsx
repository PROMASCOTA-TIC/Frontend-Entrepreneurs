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
                    <h2
                        className="h2-semiBold txtcolor-secondary txt-justify"
                        style={{
                            wordBreak: "break-word", // Permite que el texto salte de línea
                            overflowWrap: "break-word", // Rompe la palabra si es necesario
                            whiteSpace: "normal", // Asegura que el texto fluya
                        }}
                    >
                        {articulo.titulo || "Sin título"}
                    </h2>

                    <p className="txt-justify"
                        style={{
                            whiteSpace: "pre-line",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                        }}>
                        {articulo.descripcion
                            ? articulo.descripcion.length > 315
                                ? `${articulo.descripcion.substring(0, 315)}...`
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