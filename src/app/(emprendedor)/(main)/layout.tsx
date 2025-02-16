
import TopNavbar from '@/components/ui/top-navbar/TopNavbar';
import { TopMenu } from "@/components/ui/top-menu/TopMenu";
import PieDePagina from "@/components/ui/footer/PieDePagina";
import Chatbot from '../gestion-contenido/chatbot/Chatbot';


const items = [
    { name: 'Inicio', url: '/inicio' },
    { name: 'Registro de Productos', url: '/registro-productos' },
    { name: 'Lista de Productos', url: '/lista-productos' },
    { name: 'Pedidos', url: '/lista-pedidos' },
    { name: 'Enlaces de Interés', url: '/gestion-contenido/enlaces-interes' },
    { name: 'Publi-Reportajes', url: '/gestion-contenido/preguntas-frecuentes' },
    { name: 'Preguntas Frecuentes', url: '/gestion-contenido/preguntas-frecuentes' },
    { name: 'Comisiones y Pago', url: '/comisiones-y-pagos' },
]


export default function ShopLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main style={{minHeight: '100vh'}}>
                <TopNavbar />
                <TopMenu listaItems={items}/>
                {children}
            </main>
            <Chatbot />
            <PieDePagina />
        </>
    );
}