import { NextFunction, Request, Response } from 'express';

export const parseHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (typeof req.headers.auth !== 'string') {
    return res.json({
      error: 'Auth header must be a string',
      status: 406,
      data: null,
    });
  }

  if (typeof req.headers.owner !== 'string') {
    return res.json({
      error: 'Owner header must be a string',
      status: 406,
      data: null,
    });
  }

  if (typeof req.headers.repo !== 'string') {
    return res.json({
      error: 'Repo header must be a string',
      status: 406,
      data: null,
    });
  }

  req.auth = req.headers.auth;
  req.owner = req.headers.owner;
  req.repo = req.headers.repo;

  next();
};
