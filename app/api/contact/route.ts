import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
const submissionsPath = path.join(dataDir, "contact-submissions.json");

function validateContact(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) {
    return "Invalid request body.";
  }
  const p = payload as Record<string, unknown>;
  const name = String(p.name ?? "").trim();
  const email = String(p.email ?? "").trim();
  const message = String(p.message ?? "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2) return "Please enter your name.";
  if (!emailPattern.test(email)) return "Please enter a valid email address.";
  if (message.length < 10)
    return "Please enter a message with at least 10 characters.";

  return null;
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const validationError = validateContact(payload);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const p = payload as Record<string, unknown>;
  const submission = {
    id: randomUUID(),
    name: String(p.name).trim(),
    email: String(p.email).trim(),
    message: String(p.message).trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    await mkdir(dataDir, { recursive: true });
    let submissions: unknown[] = [];
    try {
      const raw = await readFile(submissionsPath, "utf8");
      submissions = JSON.parse(raw);
    } catch {
      // file doesn't exist yet — start fresh
    }
    submissions.unshift(submission);
    await writeFile(submissionsPath, JSON.stringify(submissions, null, 2) + "\n");
  } catch {
    return NextResponse.json(
      { message: "Failed to save your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Thanks, your message was saved successfully." },
    { status: 201 }
  );
}
