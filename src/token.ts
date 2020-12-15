import fetch from "node-fetch";
import querystring from "querystring";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const refreshAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string; expiry: string }> => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          CLIENT_ID + ":" + CLIENT_SECRET,
          "utf-8"
        ).toString("base64")}`,
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });
    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: refreshToken,
      expiry: new Date(
        new Date().getTime() + data.expires_in * 1000
      ).toString(),
    };
  } catch (error) {
    throw error;
  }
};
