import { getUserContext } from "@/lib/auth/get-user-context";

export default async function SettingsPage() {
  const { church, membership, user } =
    await getUserContext();

  return (
    <div className="max-w-4xl space-y-8">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Ayarlar
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Kilise ve hesap ayarları.
        </p>
      </div>

      <section className="rounded-xl border bg-white">

        <div className="border-b px-6 py-5">
          <h2 className="font-semibold">
            Kilise Bilgileri
          </h2>
        </div>

        <div className="space-y-5 p-6">

          <div>
            <label className="text-sm font-medium text-slate-700">
              Kilise adı
            </label>

            <input
              disabled
              value={church.name}
              className="mt-2 w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Slug
            </label>

            <input
              disabled
              value={church.slug}
              className="mt-2 w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm"
            />
          </div>

        </div>

      </section>

      <section className="rounded-xl border bg-white">

        <div className="border-b px-6 py-5">
          <h2 className="font-semibold">
            Hesap
          </h2>
        </div>

        <div className="space-y-4 p-6">

          <div>
            <div className="text-sm text-slate-500">
              E-posta
            </div>

            <div className="mt-1 font-medium">
              {user.email}
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-500">
              Rol
            </div>

            <div className="mt-1 font-medium">
              {membership.role}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}