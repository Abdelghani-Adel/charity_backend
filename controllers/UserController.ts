import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserLogin } from "../database/UserQueries";
import Logger from "../startup/logging";
import IApiRes_Global from "../types/api_responses/IApiRes_Global";
import IApiRes_UserLogin from "../types/api_responses/IApiRes_UserLogin";
import IQR_UserLogin from "../types/query_results/IQR_UserLogin";
import config from "config";

const TOKEN_EXPIRATION = "1h"; // Define a constant for the token expiration duration

export async function userLoginHandler(req: Request, res: Response) {
  let response: IApiRes_Global<IApiRes_UserLogin> = {
    success: false,
  };

  // Getting the user from the database.
  const user: IQR_UserLogin | null = await getUserLogin(req.body.username, req.body.password);

  // If the user is not found, return an error message.
  if (!user) {
    Logger.info("Authentication failed for user: " + req.body.username);
    response.message = "Invalid username or password";
    return res.status(400).send(response);
  }

  // If the user is found, generate a token and return it to the user.
  Logger.info("Authentication successful for user: " + req.body.username);
  const tokenDetails = generateToken(user);
  response.success = true;
  response.data = {
    token: tokenDetails.token,
    tokenExpiration: tokenDetails.expirationTime,
  };
  return res.status(200).send(response);
}

function generateToken(user: IQR_UserLogin) {
  const KEY: string = "8werKVBCpy1IbzUo1DcYb8pFRBIrIekT";

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
      roles: user.roles,
      organization_id: user.organization_id,
    },
    KEY,
    {
      expiresIn: "30d",
    }
  );

  // Calculate expiration time in ISO format
  const expirationDuration = getMillisecondsFromExpiration(TOKEN_EXPIRATION);
  const expirationTime = new Date(Date.now() + expirationDuration).toISOString();

  return { token, expirationTime };
}

function getMillisecondsFromExpiration(expiration: string): number {
  const timeUnit = expiration.slice(-1);
  const timeValue = parseInt(expiration.slice(0, -1), 10);

  switch (timeUnit) {
    case "s": // seconds
      return timeValue * 1000;
    case "m": // minutes
      return timeValue * 60 * 1000;
    case "h": // hours
      return timeValue * 60 * 60 * 1000;
    case "d": // days
      return timeValue * 24 * 60 * 60 * 1000;
    default:
      throw new Error("Invalid expiration format");
  }
}
