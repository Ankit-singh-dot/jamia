import * as React from "react"
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaInbox, FaSearch, FaCog, FaUser, FaMagic, FaBolt, FaPenNib, FaLayerGroup, FaRecycle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: FaHome,
    },
    {
        title: "Ideation",
        url: "/ideation",
        icon: FaMagic,
    },
    {
        title: "Drafting",
        url: "/drafting",
        icon: FaPenNib,
    },
    {
        title: "Refinement",
        url: "/refine",
        icon: FaBolt,
    },
    {
        title: "Repurposing",
        url: "/repurpose",
        icon: FaRecycle,
    },
]

export function AppSidebar(props) {
    const location = useLocation();
    const { user, logout } = useAuth();

    return (
        <Sidebar collapsible="icon" {...props} className="z-50 border-r border-border/50 bg-sidebar/95 backdrop-blur">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 text-sidebar-foreground">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <FaBolt className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                            <span className="truncate font-semibold">Content Genie</span>
                            <span className="truncate text-xs">AI Assistant</span>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Features</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title} isActive={location.pathname === item.url}>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            {user ? (
                                <>
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">{user.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                        <span className="truncate font-semibold">{user.name}</span>
                                        <div className="flex justify-between items-center">
                                            <span className="truncate text-xs text-muted-foreground">Online</span>
                                            <FaSignOutAlt className="h-3 w-3 hover:text-red-500 cursor-pointer" onClick={logout} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg">?</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                        <span className="truncate font-semibold">Guest</span>
                                        <Link to="/sign-in" className="truncate text-xs hover:underline">Sign In</Link>
                                    </div>
                                </>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
