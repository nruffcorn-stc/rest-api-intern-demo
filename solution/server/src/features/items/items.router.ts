import express from "express";
import {
  upsertItem,
  deleteItem,
  getItemDetail,
  getItems,
} from "./items.service";
import {
  idNumberRequestSchema,
  itemPOSTRequestSchema,
  itemPUTRequestSchema,
} from "../types";
import { validate } from "../../middleware/validation.middleware";
import { create } from "xmlbuilder2";

export const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res) => {
  const items = await getItems();
  items.forEach((item) => {
    item.imageUrl = buildImageUrl(req, item.id);
  });

  if (req.headers["accept"] == "application/xml") {
    const root = create().ele("items");
    items.forEach((i) => {
      root.ele("item", i);
    });

    res.status(200).send(root.end({ prettyPrint: true }));
  } else {
    res.json(items);
  }
});

itemsRouter.get("/:id", validate(idNumberRequestSchema), async (req, res) => {
  const data = idNumberRequestSchema.parse(req);
  const item = await getItemDetail(data.params.id);
  if (item != null) {
    item.imageUrl = buildImageUrl(req, item.id);
    if (req.headers["accept"] == "application/xml") {
      res.status(200).send(create().ele("item", item).end());
    } else {
      res.json(item);
    }
  } else {
    if (req.headers["accept"] == "application/xml") {
      res
        .status(404)
        .send(create().ele("error", { message: "Item Not Found" }).end());
    } else {
      res.status(404).json({ message: "Item Not Found" });
    }
  }
});

itemsRouter.post("/", validate(itemPOSTRequestSchema), async (req, res) => {
  const data = itemPOSTRequestSchema.parse(req);
  const item = await upsertItem(data.body);
  if (item != null) {
    res.status(201).json(item);
  } else {
    res.status(500).json({ message: "Creation failed" });
  }
});

itemsRouter.delete(
  "/:id",
  validate(idNumberRequestSchema),
  async (req, res) => {
    const data = idNumberRequestSchema.parse(req);
    const item = await deleteItem(data.params.id);
    if (item != null) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item Not Found" });
    }
  }
);

itemsRouter.put("/:id", validate(itemPUTRequestSchema), async (req, res) => {
  const data = itemPUTRequestSchema.parse(req);
  const item = await upsertItem(data.body, data.params.id);
  if (item != null) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item Not Found" });
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildImageUrl(req: any, id: number): string {
  return `${req.protocol}://${req.get("host")}/images/${id}.jpg`;
}
