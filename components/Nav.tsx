"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/", label: "Visão Geral" },
  { href: "/carteira", label: "Carteira" },
  { href: "/carteira-risco", label: "Carteira em Risco" },
  { href: "/books", label: "Books" },
  { href: "/alavancas", label: "Alavancas" },
  { href: "/diretrizes", label: "Diretrizes" },
  { href: "/novos-clientes", label: "Novos Clientes" },
  { href: "/war-week", label: "War Week" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return null;

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="gx-nav">
      <div className="gx-nav-inner">
        <span className="gx-logo">
          GROWTH<span>X</span>
        </span>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`gx-link ${pathname === link.href ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
        <button onClick={handleLogout} className="gx-logout" type="button">
          Sair
        </button>
      </div>
    </nav>
  );
}
