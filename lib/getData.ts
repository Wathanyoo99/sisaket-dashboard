import Papa from "papaparse";

export type Row = {
    year: number;
    district: string;
    villages: number;
    patients: number;
};

export async function getData(): Promise<Row[]> {
    const url = process.env.SHEET_CSV_URL;
    if (!url) {
        throw new Error("ไม่พบ SHEET_CSV_URL ใน .env.local");
    }

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`ดึงข้อมูลจาก Google Sheet ไม่สำเร็จ (${res.status})`);
    }
    const text = await res.text();

    const { data } = Papa.parse<Record<string, string>>(text, {
        header: true,
        skipEmptyLines: true,
    });

    return data
        .map((r) => ({
            year: Number(r["ปี"]),
            district: (r["อำเภอ"] ?? "").trim(),
            villages: Number(r["หมู่บ้าน/ชุมชน"]),
            patients: Number(r["ผู้ป่วยเข้ารับบำบัด"]),
        }))
        .filter((r) => r.district !== "" && !Number.isNaN(r.year));
}