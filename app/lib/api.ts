import { type Project } from "../types/project";

type ProjectsResponse = { projects: Project[] };
type ContactPayload = { name: string; email: string; message: string };
type ContactResponse = { message: string };

async function requestJson<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  const data = (await response.json()) as T;

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : "Something went wrong.";
    throw new Error(message);
  }
  return data;
}

export async function getProjects() {
  const data = await requestJson<ProjectsResponse>("/api/projects");
  return data.projects;
}

export async function submitContact(payload: ContactPayload) {
  return requestJson<ContactResponse>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
