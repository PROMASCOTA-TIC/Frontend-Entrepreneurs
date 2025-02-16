import BarraDeBusqueda from "@/components/gestionContenido/BarraBusqueda";
import EI_Categorias from "./EI_Categorias";
import EI_CompartirContenido from "./EI_CompartirContenido";
import { URL_BASE } from '@/config/config';

export default function EnlacesDeInteres() {
    return (
        <div>
            <BarraDeBusqueda
                endpoint={`${URL_BASE}links/search`}
                // endpoint="http://localhost:3001/api/links/search"
                seccion="enlaces-interes"
                placeholder="Escribe palabras de búsqueda"
            />
            <h1 className="h1-bold txtcolor-primary flex-center" style={{ padding: '21px 0px 0px 0px' }}>Categorías</h1>
            <EI_Categorias />
            <EI_CompartirContenido />
        </div>
    );
}  