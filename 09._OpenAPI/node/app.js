// express server with swagger
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import usersRouter from "./routers/usersRouter.js";
import spacecraftsRouter from "./routers/spacecraftsRouter.js";

const app = express();
const port = 3000;

app.use(express.json());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Users API",
    version: "1.0.0",
    description: "A simple Express Users API",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routers/*.js"],
  explorer: true,
};

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerOptions))
);

app.use(usersRouter);

app.use(spacecraftsRouter);

app.get("/", (req, res) => res.send("<h1>Hello World!</h1>"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
