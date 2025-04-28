import { Response } from "express";

export class BaseController {
  protected sendSuccess(res: Response, msg: string, data?: any) {
    return res.json({
      ok: true,
      msg,
      data: data || null,
    });
  }

  protected sendError(
    res: Response,
    msg: string,
    statusCode: number = 400,
    data?: any
  ) {
    return res.status(statusCode).json({
      ok: false,
      msg,
      data: data || null,
    });
  }
}
