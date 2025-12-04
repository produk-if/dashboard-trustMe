"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, ShoppingCart, Settings, BarChart3, Shield } from "lucide-react"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Shield, label: "Security", href: "/security" },
    { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="fixed left-0 top-0 z-50 hidden h-full md:block w-72 p-4">
            <div className="h-full w-full rounded-3xl border border-white/10 bg-black/20 backdrop-blur-2xl shadow-2xl overflow-hidden">
                <div className="space-y-4 py-6">
                    <div className="px-4 py-2">
                        <h2 className="mb-6 px-4 text-2xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
                                Trust Me
                            </span>
                        </h2>
                        <div className="space-y-2">
                            {sidebarItems.map((item) => (
                                <Button
                                    key={item.href}
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start rounded-xl px-4 py-6 transition-all duration-300",
                                        pathname === item.href
                                            ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-primary/20"
                                            : "hover:bg-white/5 hover:text-white hover:pl-6"
                                    )}
                                    asChild
                                >
                                    <Link href={item.href}>
                                        <item.icon className={cn("mr-3 h-5 w-5", pathname === item.href && "text-primary animate-pulse")} />
                                        <span className="font-medium text-base">{item.label}</span>
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
