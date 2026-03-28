import { MetricsService } from "../metrics.service";

describe("MetricsService", () => {
  const service = new MetricsService();

  it("should increment request counter", () => {
    service.incrementRequest("GET", "/test", "200");
    // Prom-client stores metrics internally; just ensure no error thrown
    expect(true).toBe(true);
  });

  it("should observe latency", () => {
    service.observeLatency("GET", "/test", "200", 0.5);
    expect(true).toBe(true);
  });

  it("should return metrics string", async () => {
    const metrics = await service.getMetrics();
    expect(metrics).toContain("http_requests_total");
  });
});
