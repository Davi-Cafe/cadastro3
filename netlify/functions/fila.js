// Persistencia simples usando Netlify Blobs.
const { getStore } = require("@netlify/blobs");

const store = getStore({
  name: "fila",
  siteID: process.env.SITE_ID,
});

async function loadFila() {
  const text = await store.get("fila.json", { type: "text" });
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

async function saveFila(data) {
  await store.set("fila.json", JSON.stringify(data), {
    metadata: { contentType: "application/json" },
  });
}

exports.handler = async (event) => {
  // CORS permissive para demo; ajuste Origin se quiser restringir
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  if (event.httpMethod === "GET") {
    const fila = await loadFila();
    return { statusCode: 200, headers, body: JSON.stringify(fila) };
  }

  if (event.httpMethod === "POST") {
    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch (err) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
    }

    const { transporte, placa, entrada, chegada, tipo } = body;
    if (!transporte || !placa || !entrada || !chegada || !tipo) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Campos obrigatorios faltando" }) };
    }

    const fila = await loadFila();
    const id = Date.now().toString();
    fila[id] = {
      transporte,
      placa,
      entrada,
      chegada,
      tipo,
      timestamp: Date.now(),
    };
    await saveFila(fila);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, id }) };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
};
