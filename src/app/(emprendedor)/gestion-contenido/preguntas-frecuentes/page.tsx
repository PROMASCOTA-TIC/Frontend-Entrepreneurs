import BarraDeBusqueda from "@/components/gestionContenido/BarraBusqueda";
import PF_Categorias from "./PF_Categorias";

export default function EnlacesDeInteres() {
    return (
        <div>
            <BarraDeBusqueda />
            <h1 className="h1-bold txtcolor-primary flex-center" style={{ padding: '21px 0px 0px 0px' }}>Categorías</h1>
            <PF_Categorias />
        </div>
    );
}  