// Response-envelope helper for the OpenViking HTTP API.
//
// /health responds flat:        {"status":"ok","healthy":true,"version":"0.5.3"}
// /api/v1/* responds wrapped:   {"status":"ok","result":{...},"error":null}
//
// The plugin's fetchJSON returns the parsed body as-is, while recall-core
// (scripts/shared/recall-core.mjs:473) reads `res.result.entries`. Because the
// body is still wrapped at that point, `entries` is always undefined and the
// auto-recall silently injects nothing. Same for `pending_tokens` and
// `task_id`. This helper gives that contract a single implementation.

export function unwrapEnvelope(body) {
  if (
    body &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    Object.prototype.hasOwnProperty.call(body, "status") &&
    Object.prototype.hasOwnProperty.call(body, "result")
  ) {
    return body.result;
  }
  return body;
}
