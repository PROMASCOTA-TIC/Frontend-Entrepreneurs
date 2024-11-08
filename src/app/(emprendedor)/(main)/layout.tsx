
import TopNavbar from '@/components/ui/top-navbar/TopNavbar';
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

const items = [
    { name: 'Inicio', url: '/inicio' },
    { name: 'Registro de Productos', url: '/registro-productos' },
    { name: 'Lista de Productos', url: '/lista-productos' },
    { name: 'Pedidos', url: '/lista-pedidos' },
    { name: 'Enlaces de Interés', url: '/enlaces-interes' },
    { name: 'Publi-Reportajes', url: '/preguntas-frecuentes' },
    { name: 'Preguntas Frecuentes', url: '/preguntas-frecuentes' },
    { name: 'Comisiones y Pago', url: '/comisiones-y-pagos' },
]


export default function ShopLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <TopNavbar />
            <TopMenu listaItems={items}/>
            {children}
        </main>
    );
}