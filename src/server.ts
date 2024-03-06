import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyJwt, { JWT } from "@fastify/jwt";
import { fastifySession } from "@fastify/session";
import fastifySecureSession = require("@fastify/secure-session");
import { fastifySwagger } from "@fastify/swagger";
import { withRefResolver } from "fastify-zod";
import fastifyCookie = require("@fastify/cookie");
import fastifyStatic = require("@fastify/static");
import fastifyView = require("@fastify/view");
import userRoutes from "./modules/user/user.route";
import productRoutes from "./modules/product/product.route";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import { getUserData } from "./modules/user/user.service";
import { version } from "../package.json";
import assert = require("assert");
import Handlebars = require("handlebars");
import fs = require("fs");
const path = require("path");

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }

  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

function include(file: string): string {
  const filePath = path.join(__dirname, "public", "assets", "partials", file);
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading partial file: ${error}`);
    return "";
  }
}

function buildServer() {
  const server = Fastify();

  server.register(fastifyJwt, {
    secret: fs.readFileSync(path.join(__dirname, "../secret-key"), "utf8"),
    decode: { complete: true },
  });

  server.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
    prefix: "/public/",
  });

  server.register(fastifyView, {
    engine: {
      handlebars: Handlebars.create(),
    },
    root: path.join(__dirname, "public"),
    viewExt: "html",
    includeViewExtension: true,
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  for (const schema of [...userSchemas, ...productSchemas]) {
    server.addSchema(schema);
  }

  server.register(
    fastifySwagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Monitoring Tambak Udang",
          description: "API for some products",
          version,
        },
      },
    })
  );

  server.register(userRoutes, { prefix: "/api/users" });
  server.register(productRoutes, { prefix: "/api/products" });

  server.get("/", (req, reply) => {
    reply.view("assets/views/index", { ws: "het" });
  });

  // server.get("/login", (req, reply) => {
  //   reply.view("assets/views/login", {
  //     ws: "het",
  //     user: req.jwt.user,
  //   });
  // });

  server.get("/login", (req, reply) => {
    reply.view("assets/views/login", { ws: "het" });

    // const token = req.cookies.user;

    // if (token) {
    //   const decodedToken = server.jwt.decode(token) as {
    //     user: { id: number; email: string; name: string };
    //   };
    //   const { id, email, name } = decodedToken.user;

    //   reply.view("assets/views/login", {
    //     ws: "het",
    //     user: { id, email, name },
    //   });
    // } else {
    //   reply.view("assets/views/login", {
    //     ws: "het",
    //     user: null,
    //   });
    // }
  });

  server.get("/register", (req, reply) => {
    reply.view("assets/views/register", { ws: "het" });
  });

  server.get("/input", (req, reply) => {
    reply.view("assets/views/formInput", { ws: "het" });
  });

  server.get("/index", (req, reply) => {
    const footerContent = include("_footer.html");
    const navbarContent = include("_navbar.html");
    const sidebarContent = include("_sidebar.html");
    const settingsPanelContent = include("_settings-panel.html");

    reply.view("assets/views/dashboard", {
      ws: "het",
      footer: footerContent,
      navbar: navbarContent,
      sidebar: sidebarContent,
      settingpanel: settingsPanelContent,
    });
  });

  server.get("/table-user", (req, reply) => {
    const footerContent = include("_footer.html");
    const navbarContent = include("_navbar.html");
    const sidebarContent = include("_sidebar.html");
    const settingsPanelContent = include("_settings-panel.html");

    reply.view("assets/views/table", {
      ws: "het",
      footer: footerContent,
      navbar: navbarContent,
      sidebar: sidebarContent,
      settingpanel: settingsPanelContent,
    });
  });

  server.get("/form-user", (req, reply) => {
    const footerContent = include("_footer.html");
    const navbarContent = include("_navbar.html");
    const sidebarContent = include("_sidebar.html");
    const settingsPanelContent = include("_settings-panel.html");

    reply.view("assets/views/form", {
      ws: "het",
      footer: footerContent,
      navbar: navbarContent,
      sidebar: sidebarContent,
      settingpanel: settingsPanelContent,
    });
  });

  // server.get("/profile", async (req, reply) => {
  //   const footerContent = include("_footer.html");
  //   const navbarContent = include("_navbar.html");
  //   const sidebarContent = include("_sidebar.html");
  //   const settingsPanelContent = include("_settings-panel.html");

  //   try {
  //     const userId = req.jwt.user?.id;
  //     const userData = await getUserData(userId);
  //     reply.send(userData);
  //     reply.view("assets/views/profile", {
  //       ws: "het",
  //       footer: footerContent,
  //       navbar: navbarContent,
  //       sidebar: sidebarContent,
  //       settingpanel: settingsPanelContent,
  //     });
  //   } catch (error) {
  //     reply.status(500).send({ error: "Internal Server Error" });
  //     reply.redirect("/login");
  //   }
  // });

  server.get("/logout", (req, reply) => {
    req.session.destroy();
    reply.redirect("/login");
  });

  return server;
}

export default buildServer;
