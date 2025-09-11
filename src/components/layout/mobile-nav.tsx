"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Icon } from "@iconify/react"

type UserRole = "admin" | "contractor" | "estimator"

interface NavItem {
  name: string
  href: string
  icon: any
  isAdmin?: boolean
}

const getRoleNavItems = (role: UserRole): NavItem[] => {
  switch (role) {
    case "admin":
      return [
        {
          name: "Dashboard",
          href: "/dashboard/admin",
          icon: "mage:dashboard",
          isAdmin: true,
        },
        {
          name: "User Management",
          href: "/dashboard/admin/user-management",
          icon: "mage:users",
          isAdmin: true,
        },
        {
          name: "Contractors",
          href: "/dashboard/admin/contractors",
          icon: "hugeicons:labor",
          isAdmin: true,
        },
        {
          name: "Estimators",
          href: "/dashboard/admin/estimators",
          icon: "hugeicons:estimate-01",
          isAdmin: true,
        },
        {
          name: "Settings",
          href: "/dashboard/admin/settings",
          icon: "solar:settings-linear",
          isAdmin: true,
        },
      ]
    case "contractor":
      return [
        {
          name: "Dashboard",
          href: "/dashboard/contractor",
          icon: "mage:dashboard",
        },
        {
          name: "Quotations",
          href: "/dashboard/contractor/quotations",
          icon: "solar:database-linear",
        },
        {
          name: "Estimates Management",
          href: "/dashboard/contractor/estimates-management",
          icon: "hugeicons:estimate-01",
        },
        {
          name: "Settings",
          href: "/dashboard/contractor/settings",
          icon: "solar:settings-linear",
        },
      ]
    case "estimator":
      return [
        {
          name: "Dashboard",
          href: "/dashboard/estimator",
          icon: "mage:dashboard",
        },
        {
          name: "Estimates",
          href: "/dashboard/estimator/estimates",
          icon: "hugeicons:estimate-01",
        },
        {
          name: "Settings",
          href: "/dashboard/estimator/settings",
          icon: "solar:settings-linear",
        },
      ]
    default:
      return [
        {
          name: "Dashboard",
          href: "/dashboard/estimator/overview",
          icon: "mage:dashboard",
          isAdmin: true,
        },
        {
          name: "Estimates",
          href: "/dashboard/estimator/estimates",
          icon: "hugeicons:estimate-01",
          isAdmin: true,
        },
        {
          name: "Settings",
          href: "/dashboard/estimator/settings",
          icon: "solar:settings-linear",
          isAdmin: true,
        },
      ]
  }
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const role = (session?.user?.user?.role?.toLowerCase() as UserRole) || "estimator"
  const navItems = getRoleNavItems(role)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="size-[42px] rounded-xl bg-white p-3 md:hidden">
          <Menu className="h-6 w-6 text-black" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col space-y-2 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Lumber Estimator</h2>
          </div>
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard/admin" ||
              item.href === "/dashboard/estimator" ||
              item.href === "/dashboard/contractor"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-12 ${
                    isActive ? "bg-primary hover:bg-primary/90 text-white" : "text-secondary hover:bg-accent"
                  }`}
                >
                  <Icon icon={item.icon} width="20" height="20" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
