import BarraDeBusqueda from "@/components/gestionContenido/BarraBusqueda";
import PF_Categorias from "./PF_Categorias";

import "/src/assets/styles/gestionContenido/general.css";
import "/src/assets/styles/gestionContenido/estilos.css";
import { URL_BASE } from "@/config/config";

export default function PreguntasFrecuentes() {
    return (
        <div>
            <BarraDeBusqueda
                // endpoint="http://localhost:3001/api/faqs/search"
                endpoint={`${URL_BASE}faqs/search`}
                seccion="preguntas-frecuentes"
                placeholder="Escribe palabras de búsqueda"
            />
            <h1 className="h1-bold txtcolor-primary flex-center" style={{ padding: '21px 0px 0px 0px' }}>Categorías</h1>
            <PF_Categorias />
        </div>
    );
}  