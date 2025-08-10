import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BarChart3,
    ClipboardList,
    Database,
    Github,
    LayoutDashboard,
    MapPin,
    MessageCircle,
    PillIcon,
    Stethoscope,
    UserCog,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Master Data',
        href: '/master-data',
        icon: Database,
        children: [
            {
                title: 'Pegawai',
                href: '/master-data/pegawai',
                icon: Users,
            },
            {
                title: 'Wilayah',
                href: '/master-data/wilayah',
                icon: MapPin,
            },
            {
                title: 'Pengguna',
                href: '/master-data/pengguna',
                icon: UserCog,
            },
            {
                title: 'Tindakan Medis',
                href: '/master-data/tindakan',
                icon: Stethoscope,
            },
            {
                title: 'Obat',
                href: '/master-data/obat',
                icon: PillIcon,
            },
        ],
    },
    {
        title: 'Transaksi',
        href: '/transaksi',
        icon: ClipboardList,
    },
    {
        title: 'Laporan',
        href: '/laporan',
        icon: BarChart3,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository Developer',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Github,
    },
    {
        title: 'Contact Me',
        href: 'https://wa.me/6287863302407',
        icon: MessageCircle,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
