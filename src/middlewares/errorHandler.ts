import { Request, Response, NextFunction } from "express";

export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "NOT_FOUND_ENDPOINT" });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { message, status } = err;

  // TODO -> redo it to suit my needs

  switch (err.name) {
    case "UnauthorizedError":
      return res.status(401).json({
        error: "UNAUTHORIZED",
      });

    default:
      console.error(message);
      return res.status(status || 500).json({ message });
  }
};
