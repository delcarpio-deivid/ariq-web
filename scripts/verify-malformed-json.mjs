const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

const response = await fetch(`${baseUrl}/api/lead`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: '{ "nombre": "Test", "telefono": "987654321", "paquete": "pro"',
});

if (response.status !== 400) {
  throw new Error(`Expected HTTP 400, received ${response.status}`);
}

const payload = await response.json();
if (!String(payload.error ?? "").includes("JSON inválido")) {
  throw new Error(`Unexpected error payload: ${JSON.stringify(payload)}`);
}

console.log("Malformed JSON verification passed");
