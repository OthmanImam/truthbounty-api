import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { MetricsService } from "./metrics.service";

@Controller("metrics")
export class MetricsController {
  constructor(private readonly service: MetricsService) {}

  @Get()
  async getMetrics(@Res() res: Response) {
    res.setHeader("Content-Type", "text/plain");
    res.send(await this.service.getMetrics());
  }
}
