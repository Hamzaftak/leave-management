import type { LeaveRequest } from "../lib/types/leave";

type LeaveRequestsTableProps = {
  requests: LeaveRequest[];
  onDelete: (id: string) => void;
};

export default function LeaveRequestsTable({
  requests,
  onDelete,
}: LeaveRequestsTableProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 text-slate-500">
          <tr>
            <th className="py-3 pr-4">Type</th>
            <th className="py-3 pr-4">Dates</th>
            <th className="py-3 pr-4">Jours</th>
            <th className="py-3">Statut</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-8 text-center text-slate-500">
                Aucune demande pour le moment.
              </td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="py-4 pr-4 font-medium">{request.type}</td>

                <td className="py-4 pr-4 text-slate-600">{request.dates}</td>

                <td className="py-4 pr-4">{request.days}</td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      request.status === "Approuvée"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Refusée"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="py-4">
                  {request.status === "En attente" && (
                    <button
                      type="button"
                      onClick={() => onDelete(request.id)}
                      className="font-bold text-red-600 hover:text-red-800"
                      title="Supprimer la demande"
                    >
                      ×
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
