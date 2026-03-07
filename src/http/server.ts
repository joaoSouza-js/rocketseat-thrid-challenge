import { env } from "@/config/env"
import cookie from "@fastify/cookie"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import Fastify from "fastify"
import { appRoutes } from "./routes"

export const app = Fastify({
    logger: true,
})


app.register(cors, {
    origin: "*",
    credentials: true, // allow cookies
})


app.register(cookie, {

})


app.register(jwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refresh_token",
        signed: false,
    },
    sign: {
        expiresIn: "7d"
    }
})

app.register(appRoutes, {
    prefix: "/api"
})

app.listen({
    port: env.PORT,
    host: "0.0.0.0",
}).then(() => {
    console.log("HTTP server running on http://localhost:3333")

}
)