import { submitLead } from "@/lib/lead-provider";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request): Promise<Response> {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "JSON inválido en el cuerpo de la solicitud." },
      { status: 400 },
    );
  }

  const result = submitLead(body);

  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 400 });
  }

  return Response.json({ whatsappUrl: result.whatsappUrl }, { status: 202 });
}

export async function GET(): Promise<Response> {
  return methodNotAllowed();
}

export async function PUT(): Promise<Response> {
  return methodNotAllowed();
}

export async function PATCH(): Promise<Response> {
  return methodNotAllowed();
}

export async function DELETE(): Promise<Response> {
  return methodNotAllowed();
}

function methodNotAllowed(): Response {
  return Response.json({ error: "Method Not Allowed" }, { status: 405 });
}
