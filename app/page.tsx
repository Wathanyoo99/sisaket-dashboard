import { Suspense } from "react";
import { getData } from "@/lib/getData";
import Charts from "./Charts";

async function Dashboard() {
  const rows = await getData();

  const totals = new Map<number, number>();
  for (const r of rows) {
    totals.set(r.year, (totals.get(r.year) ?? 0) + r.patients);
  }
  const byYear = [...totals.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([year, patients]) => ({ year, patients }));

  return <Charts rows={rows} byYear={byYear} />;
}

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        ผู้ป่วยเข้ารับบำบัด จ.ศรีสะเกษ
      </h1>
      <Suspense fallback={<p>กำลังโหลดข้อมูลจาก Google Sheet...</p>}>
        <Dashboard />
      </Suspense>
    </main>
  );
}