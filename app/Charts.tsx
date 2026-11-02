"use client";

import { useState } from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import type { Row } from "@/lib/getData";

type YearTotal = { year: number; patients: number };

export default function Charts({
    rows,
    byYear,
}: {
    rows: Row[];
    byYear: YearTotal[];
}) {
    const years = [...new Set(rows.map((r) => r.year))].sort((a, b) => a - b);
    const [year, setYear] = useState<number>(years[years.length - 1]);

    const byDistrict = rows
        .filter((r) => r.year === year)
        .sort((a, b) => b.patients - a.patients);

    return (
        <div className="space-y-10">
            <section>
                <h2 className="font-semibold mb-2">แนวโน้มรวมรายปี</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={byYear}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            dataKey="patients"
                            name="ผู้ป่วยรวม"
                            stroke="#2563eb"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </section>

            <section>
                <div className="flex gap-3 items-center mb-2">
                    <h2 className="font-semibold">รายอำเภอ ปี</h2>
                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="border p-1 rounded"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
                <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={byDistrict}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="district"
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                            height={90}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="patients" name="ผู้ป่วย" fill="#16a34a" />
                    </BarChart>
                </ResponsiveContainer>
            </section>
        </div>
    );
}