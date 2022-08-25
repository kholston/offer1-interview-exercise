import { Router } from "express";
import Home from "../models/home";

const HomeRouter = Router();

HomeRouter.get("/", async (req, res) => {
  try {
    const homes = await Home.find({})
      .populate({
        path: "property",
        populate: [
          {
            path: "address",
          },
          { path: "primaryOwner", populate: { path: "user" } },
        ],
      })
      .populate({
        path: "escrowCompany",
        populate: {
          path: "address",
        },
      })
      .populate({
        path: "titleCompany",
        populate: {
          path: "address",
        },
      })
      .populate({ path: "listingAgent", populate: { path: "user" } })
      .populate("includedItems")
      .populate("excludedItems")
      .exec();
    res.json(homes);
  } catch (error) {
    console.log(error);
  }
});

HomeRouter.get("/:id", async (req, res) => {
  try {
    const home = await Home.findById(req.params.id)
      .populate({
        path: "property",
        populate: [
          {
            path: "address",
          },
          { path: "primaryOwner", populate: { path: "user" } },
        ],
      })
      .populate({
        path: "escrowCompany",
        populate: {
          path: "address",
        },
      })
      .populate({
        path: "titleCompany",
        populate: {
          path: "address",
        },
      })
      .populate({ path: "listingAgent", populate: { path: "user" } })
      .populate("includedItems")
      .populate("excludedItems")
      .exec();
    if (home) {
      res.json(home);
    } else {
      res.status(404).json({ message: "Home not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default HomeRouter;
