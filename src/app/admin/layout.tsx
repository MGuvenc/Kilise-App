import { getUserContext } from "@/lib/auth/get-user-context";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, membership, church } = await getUserContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col bg-slate-950 text-white md:flex">
          <div className="border-b border-white/10 p-6">
            <h1 className="text-xl font-bold">Kilise App</h1>
            <p className="mt-1 text-sm text-slate-400">
              {church.name}
            </p>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <Link
                href="/admin"
                className="block rounded-lg px-4 py-3 text-sm hover:bg-white/10"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/members"
                className="block rounded-lg px-4 py-3 text-sm hover:bg-white/10"
              >
                Üyeler
              </Link>

              <Link
                href="/admin/announcements"
                className="block rounded-lg px-4 py-3 text-sm hover:bg-white/10"
              >
                Duyurular
              </Link>

              <Link
                href="/admin/events"
                className="block rounded-lg px-4 py-3 text-sm hover:bg-white/10"
              >
                Etkinlikler
              </Link>

              <Link
                href="/admin/settings"
                className="block rounded-lg px-4 py-3 text-sm hover:bg-white/10"
              >
                Ayarlar
              </Link>
            </div>
          </nav>

          <div className="border-t border-white/10 p-4">
            <p className="truncate text-sm">{user.email}</p>

            <p className="mt-1 text-xs text-slate-400">
              {membership.role}
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-8">
            <div>
              <h2 className="font-semibold">Yönetim Paneli</h2>
            </div>

            <div className="text-sm text-gray-500">
              {user.email}
            </div>
          </header>

          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}