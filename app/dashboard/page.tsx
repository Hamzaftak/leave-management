"use client";

import { useState } from "react";

import DashboardHeader from "../components/DashboardHeader";
import BalanceCard from "../components/BalanceCard";
import LeaveRequestsTable from "../components/LeaveRequestsTable";
import NewLeaveRequestModal from "../components/NewLeaveRequestModal";

import type { LeaveRequest } from "../lib/types/leave";

const leaveBalance = {
  acquired: 25,
  used: 8,
};

const initialRequests: LeaveRequest[] = [
  {
    id: "1",
    type: "Congés payés",
    dates: "02 nov. – 06 nov. 2026",
    days: 5,
    status: "En attente",
  },
  {
    id: "2",
    type: "Congés payés",
    dates: "10 août – 12 août 2026",
    days: 3,
    status: "Approuvée",
  },
];

export default function Home() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pendingDays, setPendingDays] = useState(2);

  const remaining = leaveBalance.acquired - leaveBalance.used;

  function handleNewRequest(request: LeaveRequest) {
    setRequests((previous) => [request, ...previous]);

    setPendingDays((previous) => previous + request.days);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardHeader />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Bonjour, Hamza 👋</h2>

          <p className="mt-2 text-slate-500">
            Retrouvez votre solde et gérez vos demandes de congés.
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BalanceCard
            title="Solde disponible"
            value={`${remaining} jours`}
            description="Après congés approuvés"
          />

          <BalanceCard
            title="Congés utilisés"
            value={`${leaveBalance.used} jours`}
            description="Sur l'année en cours"
          />

          <BalanceCard
            title="En attente"
            value={`${pendingDays} jours`}
            description="Demandes à valider"
          />
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Mes demandes</h3>

              <p className="mt-1 text-sm text-slate-500">
                Suivez l'état de vos demandes de congés.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              + Nouvelle demande
            </button>
          </div>

          <LeaveRequestsTable
            requests={requests}
            onDelete={(id) => {
              const request = requests.find((r) => r.id === id);

              setRequests((prev) => prev.filter((r) => r.id !== id));

              if (request?.status === "En attente") {
                setPendingDays((prev) => prev - request.days);
              }
            }}
          />
        </section>

        <p className="mt-8 text-center text-xs text-slate-400">
          Prototype — données fictives, non connectées à la base de données.
        </p>
      </div>

      <NewLeaveRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewRequest}
      />
    </main>
  );
}
