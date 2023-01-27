import { Request, Response, Router } from "express";
import crypto from "node:crypto";
const router = Router();
// import tabsHandlers form './tabs.handlers'

type TabRequestBody = { url: string };
type TabRequestParams = { tab_id: string };

interface Tab {
  id: string;
  createdAt: Date;
  url: string;
}

let tabs: Tab[] = [];

// router.route('/').post(tabsHandlers.createTab)

router.get("/tabs", (req: Request, res: Response) => {
  res.status(200).json({ tabs });
});

router.post("/tabs", (req: Request, res: Response) => {
  const body = req.body as TabRequestBody;
  const newTab: Tab = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    url: body.url,
  };

  tabs.push(newTab);

  return res.status(201).json({ message: "New tab created successfully." });
});

router.put("/tabs/:tab_id", (req: Request, res: Response) => {
  const body = req.body as TabRequestBody;
  const params = req.params as TabRequestParams;
  const tabIndexInDb = tabs.findIndex((tab) => tab.id === params.tab_id);

  if (tabIndexInDb >= tabs.length) {
    return res.status(404).json({
      message: `Not found. The tab with ID ${params.tab_id} doesn't exist.`,
    });
  }

  tabs[tabIndexInDb] = {
    ...tabs[tabIndexInDb],
    ...body,
  };

  return res.status(200).json({ message: "Tab updated successfully." });
});

router.delete("/tabs/:tab_id", (req: Request, res: Response) => {
  const params = req.params as TabRequestParams;
  tabs = tabs.filter((tab) => tab.id !== params.tab_id);

  return res.status(200).json({ message: "Tab deleted successfully." });
});

export default router;
