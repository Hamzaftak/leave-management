"use client";

import { useState } from "react";
import type { LeaveRequest } from "../lib/types/leave";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: LeaveRequest) => void;
};

function countWorkingDays(start: string, end: string) {
  const current = new Date(`${start}T12:00:00`);
  const last = new Date(`${end}T12:00:00`);
  let days = 0;

  while (current <= last) {
    const day = current.getDay();

    if (day !== 0 && day !== 6) {
      days++;
    }

    current.setDate(current.getDate() + 1);
  }

  return days;
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function NewLeaveRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const [type, setType] = useState("Congés payés");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!startDate || !endDate || startDate > endDate) {
      setError("Veuillez sélectionner des dates valides.");
      return;
    }

    const days = countWorkingDays(startDate, endDate);

    if (days === 0) {
      setError("Sélectionnez au moins un jour ouvré.");
      return;
    }

    onSubmit({
      id: crypto.randomUUID(),
      type,
      dates: `${formatDate(startDate)} – ${formatDate(endDate)}`,
      days,
      status: "En attente",
      reason,
    });

    setStartDate("");
    setEndDate("");
    setReason("");
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="leave-form-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="leave-form-title" className="text-xl font-bold">
            Nouvelle demande de congés
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="text-2xl text-slate-500 hover:text-slate-800"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Type de congés
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            >
              <option>Congés payés</option>
              <option>RTT</option>
              <option>Congé sans solde</option>
              <option>Congé exceptionnel</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Date de début
            </label>

            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Date de fin
            </label>

            <input
              type="date"
              required
              min={startDate || undefined}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />
          </div>

          {startDate && endDate && startDate <= endDate && (
            <p className="text-sm text-slate-600">
              Nombre de jours ouvrés : {countWorkingDays(startDate, endDate)}
            </p>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Motif (facultatif)
            </label>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-300 p-3"
              placeholder="Précisez votre demande..."
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-3"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Envoyer la demande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
