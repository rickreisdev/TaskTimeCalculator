import { useState } from "react";
import {
  TimeEntryEsperado,
  TimeEntryFormEsperado,
} from "../components/modoEsperado/TImeEntryFormEsperado";

function parseTime(time: string): [number, number] {
  const match = time.match(/(\d{1,2})h(\d{1,2})?/);
  if (!match) return [0, 0];
  return [parseInt(match[1]), parseInt(match[2] || "0")];
}

function calculateWorkTime(start: string, end: string, lunch: string): number {
  const [sh, sm] = parseTime(start);
  const [eh, em] = parseTime(end);
  const [lh, lm] = parseTime(lunch);
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  const lunchMin = lh * 60 + lm;
  return Math.max(0, endMin - startMin - lunchMin);
}

const ModoEsperadoPage = () => {
  const [entries, setEntries] = useState<TimeEntryEsperado[]>([]);
  const [totalMinutes, setTotalMinutes] = useState<number | null>(null);

  const addEntry = (entry: TimeEntryEsperado) => {
    setEntries((prev) => [...prev, entry]);
  };

  const handleCalculate = () => {
    const total = entries.reduce(
      (sum, e) => sum + calculateWorkTime(e.start, e.end, e.lunch),
      0
    );
    setTotalMinutes(total);
  };

  const decimalHours = totalMinutes
    ? (totalMinutes / 60).toFixed(2).replace(".", ",")
    : "0.00";
  const formatted = totalMinutes
    ? `${Math.floor(totalMinutes / 60)}h${String(totalMinutes % 60).padStart(
        2,
        "0"
      )}`
    : "0h00";

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Cálculo de Horas Trabalhadas na Task</h1>
      <TimeEntryFormEsperado onAdd={addEntry} />
      <ul>
        {entries.map((e, i) => (
          <li key={i}>
            {e.start} - {e.end} (Almoço: {e.lunch})
          </li>
        ))}
      </ul>
      <button onClick={handleCalculate}>Confirmar</button>
      {totalMinutes !== null && (
        <p>
          Tempo total: <strong>{decimalHours}</strong> horas ({formatted})
        </p>
      )}
    </div>
  );
};

export default ModoEsperadoPage;
