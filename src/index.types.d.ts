declare namespace Express {
  interface Request {
    auth: string;
    owner: string;
    repo: string;
  }
}
