import { RequestHandler } from "express";
import { refreshAccessToken } from "./token";

export const authenticateUser: RequestHandler = async (req, res, next) => {
  try {
    if (
      !req.session ||
      !req.session.accessToken ||
      !req.session.refreshToken ||
      !req.session.expiry
    ) {
      res.status(401).json("no session found");
    } else {
      const expire_in =
        (new Date(req.session.expiry).getTime() - new Date().getTime()) /
        1000 /
        60;

      if (expire_in < 5) {
        const newToken = await refreshAccessToken(req.session.refreshToken);
        req.session.accessToken = newToken.accessToken;
        req.session.refreshToken = newToken.refreshToken;
        req.session.expiry = newToken.expiry;
        next();
      } else {
        next();
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("internal server error");
  }
};
