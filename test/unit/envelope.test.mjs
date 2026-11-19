import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { unwrapEnvelope } from "../../scripts/shared/ov-response.mjs";

describe("unwrapEnvelope", () => {
  it("unwraps /api/v1 responses ({status, result})", () => {
    const body = { status: "ok", result: { entries: [{ uri: "viking://x" }], stats: {} }, error: null };
    const out = unwrapEnvelope(body);
    assert.deepEqual(Object.keys(out).sort(), ["entries", "stats"]);
    assert.equal(out.entries.length, 1);
  });

  it("leaves flat responses (/health) untouched", () => {
    const body = { status: "ok", healthy: true, version: "0.5.3", auth_mode: "dev" };
    const out = unwrapEnvelope(body);
    assert.equal(out.version, "0.5.3");
    assert.equal(out.healthy, true);
  });

  it("does not touch arrays, strings or null", () => {
    assert.deepEqual(unwrapEnvelope([1, 2]), [1, 2]);
    assert.equal(unwrapEnvelope("text"), "text");
    assert.equal(unwrapEnvelope(null), null);
  });
});
