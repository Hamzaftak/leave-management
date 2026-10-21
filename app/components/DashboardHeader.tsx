import { logout } from "../login/actions";

export default function DashboardHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <p className="text-sm font-medium text-blue-700">
            ESPACE COLLABORATEUR
          </p>

          <h1 className="mt-1 text-2xl font-bold">Gestion des congés</h1>
        </div>

        <details className="relative">
          <summary
            aria-label="Menu du compte"
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-800 hover:bg-blue-200"
          >
            H
          </summary>

          <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
            <p className="px-4 py-2 text-sm text-slate-500">Mon compte</p>

            <div className="border-t border-slate-100 pt-2">
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Se déconnecter
                </button>
              </form>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
