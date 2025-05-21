"use client";
import { Home, Menu } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function HomeNav() {
  const [User, setUser] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON?.parse(
        global?.window?.localStorage.getItem("INVENTORY_USER") || "{}"
      );
      setUser(user);
    }
  }, []);

  const navLinks = [
    { title: "DashBoard", href: "/home" },
    { title: "Sales Activity", href: "/home/SalesActivity" },
    { title: "Daily Sales Overview", href: "/home/SalesOverview" },
    { title: "Warehouse Inventory Summary", href: "/home/WareHouseInventorySummary" },
    { title: "Store Inventory Summary", href: "/home/StoreInventorySummary" },
  ];

  const DisplayNavLinks = navLinks.map((link) => (
    <Link
      href={link.href}
      key={link.title}
      className={`py-2 px-2 border-b-2 ${
        pathname === link.href ? "border-blue-600 text-blue-600" : "border-transparent"
      } hover:text-blue-500`}
      onClick={() => setMenuOpen(false)}
    >
      {link.title}
    </Link>
  ));

  return (
    <div className="p-5 border-b border-slate-300 bg-white">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center">
            <Home className="text-slate-800" />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-slate-900">
              Welcome, {User?.username}
            </p>
            <span className="text-sm text-slate-600">{User?.fullName}</span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-md focus:outline-none"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-5">
        {/* Desktop */}
        <div className="hidden md:flex gap-6 ml-1">{DisplayNavLinks}</div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="flex flex-col gap-3 mt-4 md:hidden">{DisplayNavLinks}</div>
        )}
      </nav>
    </div>
  );
}

export default HomeNav;
