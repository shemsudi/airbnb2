import { Router, Request, Response } from "express";
import Host from "../models/host";

const router: Router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/getHosts", async (req: Request, res: Response) => {
  try {
    console.log(req.query.category_tag);
    const homes = await Host.find({ structure: req.query.category_tag });
    console.log(homes)
    res.status(200).json(homes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
