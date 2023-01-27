// import { Request, Response } from "express";
// import models from "./tabs.models";

// interface Tab {
//   id: string;
//   createdAt: string;
//   url: string;
// }

// const db = {
//   Tab: {
//     create(body: Tab) {
//       console.log(body);
//     },
//   },
// };

// export async function createTab(req: Request, res: Response) {
//   try {
//     await models.create(req.body);

//     return res.status(200).json({
//       message: "New tab created successfully.",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: "Sorry we were unable to create this tab. Try again.",
//       error,
//     });
//   }
// }
