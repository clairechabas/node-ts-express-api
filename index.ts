import express, { Express, Request, Response } from "express";
import tabsRoutes from "./modules/tabs/tabs.routes";
const PORT = 8000;
const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) =>
  res.send("👋 Welcome, let's take care of your tabs.")
);

app.use("/api", tabsRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
