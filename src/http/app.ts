import { env } from "@/config/env";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import Fastify from "fastify";
import { errorHandler } from "./errors/error-handler";
import { appRoutes } from "./routes";

export const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: "*",
  credentials: true, // allow cookies
});

app.register(cookie, {
  hook: "onRequest",
});

app.setErrorHandler(errorHandler);

app.register(jwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refresh_token",
    signed: false,
  },
  sign: {
    expiresIn: "7d",
  },
});

app.register(appRoutes, {
  prefix: "/api",
});
