declare namespace Express {
  interface Request {
    accessToken: string;
  }
  interface Session {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    expiry: string | undefined;
  }
  interface Partial<SessionData> {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    expiry: string| undefined;
  }
}
