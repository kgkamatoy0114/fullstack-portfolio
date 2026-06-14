import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

const dataPath = path.join(process.cwd(), "data", "projects.json");

export async function GET() {
  try {
    const raw = await readFile(dataPath, "utf8");
    const projects = JSON.parse(raw);
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json(
      { message: "Failed to load projects." },
      { status: 500 }
    );
  }
}
