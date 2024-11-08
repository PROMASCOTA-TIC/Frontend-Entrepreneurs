import { TopMenu } from "@/components/ui/top-menu/TopMenu";
import TopNavbar from '@/components/ui/top-navbar/TopNavbar';
const items = [
    { name: 'Información personal', url: '/configurar-cuenta/cambiar-datospropietario' },
    { name: 'Información emprendimiento', url: '/configurar-cuenta/cambiar-datosemprendimiento' },
    { name: 'Horarios de atención', url: '/configurar-cuenta/cambiar-horario' },
    { name: 'Envíos y entregas', url: '/configurar-cuenta/cambiar-datosenvio' },
]

export default function ConfiguracionCuentaLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
             <TopNavbar/>
            <TopMenu listaItems={items} />
            {children}
        </main>
    );
}