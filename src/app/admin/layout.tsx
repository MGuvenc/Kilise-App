import { getUserContext } from "@/lib/auth/get-user-context";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, membership, church } = await getUserContext();

  const isSuperAdmin = membership.role === "SUPER_ADMIN";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-72 shrink-0 flex-col bg-slate-950 text-white md:flex">

          <div className="border-b border-white/10 px-6 py-6">
            <div className="text-xl font-bold">
              Kilise App
            </div>

            <div className="mt-1 text-sm text-slate-400">
              Yönetim Paneli
            </div>
          </div>

          <div className="border-b border-white/10 px-6 py-5">
            <div className="text-sm font-medium">
              {church.name}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {church.slug}.kilise.app
            </div>
          </div>

          <nav className="flex-1 p-4">

            <NavItem
              href="/admin"
              label="Dashboard"
              icon="⌂"
            />

            {isSuperAdmin && (
              <NavItem
                href="/admin/churches"
                label="Kiliseler"
                icon="▣"
              />
            )}

            <NavItem
              href="/admin/members"
              label="Üyeler"
              icon="◉"
            />

            <NavItem
              href="/admin/announcements"
              label="Duyurular"
              icon="!"
            />

            <NavItem
              href="/admin/events"
              label="Etkinlikler"
              icon="◷"
            />

            <NavItem
              href="/admin/settings"
              label="Ayarlar"
              icon="⚙"
            />

          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="truncate text-sm">
              {user.email}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {membership.role}
            </div>
          </div>

        </aside>

        {/* MAIN */}
        <main className="min-w-0 flex-1">

          <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-8">
            <div>
              <h2 className="font-semibold text-slate-900">
                Yönetim Paneli
              </h2>
            </div>

            <div className="text-sm text-slate-500">
              {user.email}
            </div>
          </header>

          <div className="p-4 md:p-8">
            {children}
          </div>

        </main>

      </div>
    </div>
  );
}

function NavItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
    >
      <span className="w-5 text-center">
        {icon}
      </span>

      {label}
    </Link>
  );
}