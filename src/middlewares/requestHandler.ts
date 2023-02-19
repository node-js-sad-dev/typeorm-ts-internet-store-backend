import { EndpointReturnType, ExpressEndpointFunction } from "../core/types/router";
import { Response, Request } from "express";
import EndpointError from "../core/errors/BaseError";

export function requestHandler(func: ExpressEndpointFunction) {
  return function (req: Request, res: Response) {
    return func(req)
      .then((result) => sendResponseSuccess(res, result))
      .catch((err) => sendResponseFail(res, err));
  };
}

function sendResponseSuccess(res: Response, result: Awaited<EndpointReturnType>) {
  if (!result) return res.status(200);

  const { status = false, payload = false } = result;

  if (status && typeof status === "number" && payload) {
    return res.status(status).json(payload);
  } else if (status && typeof status === "number" && !payload) {
    return res.sendStatus(status);
  } else if (!status && payload) {
    return res.status(200).json(payload);
  } else {
    return res.status(200).json(result);
  }
}

function sendResponseFail(res: Response, error: EndpointError) {
  res.status(error.status || 400).json({ error: error.message });
}
