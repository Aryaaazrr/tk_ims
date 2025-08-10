import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface NavMainProps {
    items: NavItem[];
}

export function NavMain({ items = [] }: NavMainProps) {
    const { url } = usePage();

    const renderMenuItem = (item: NavItem) => {
        if (item.children && item.children.length > 0) {
            return (
                <SidebarMenuItem key={item.title}>
                    <Collapsible defaultOpen={url.startsWith(item.href)} className="group/collapsible w-full">
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton isActive={url.startsWith(item.href)}>
                                {item.icon && <item.icon className="h-5 w-5" />}
                                <span className="ml-2 flex-1">{item.title}</span>
                                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {item.children.map((child) => (
                                    <SidebarMenuSubItem key={child.title}>
                                        <Link
                                            href={child.href}
                                            className={`flex items-center px-4 py-2 text-sm ${
                                                url === child.href ? 'font-medium text-primary' : 'text-muted-foreground'
                                            }`}
                                            prefetch
                                        >
                                            {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                                            {child.title}
                                        </Link>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarMenuItem>
            );
        }

        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={url.startsWith(item.href)} tooltip={{ content: item.title }}>
                    <Link href={item.href} prefetch>
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span className="ml-2">{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarMenu>{items.map(renderMenuItem)}</SidebarMenu>
        </SidebarGroup>
    );
}
