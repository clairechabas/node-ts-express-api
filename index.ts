import express, { Express, Request, Response } from "express";
const PORT = 8000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => res.send("Hey me again 👋"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
