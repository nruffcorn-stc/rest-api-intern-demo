import express from "express";
import {
  upsertOrder,
  deleteOrder,
  getOrderDetail,
  getOrders,
  deleteOrderItem,
  addOrderItems,
} from "./orders.service";
import {
  idItemIdUUIDRequestSchema,
  idUUIDRequestSchema,
  orderItemsDTORequestSchema,
  orderPOSTRequestSchema,
  orderPUTRequestSchema,
  pagingRequestSchema,
} from "../types";
import { validate } from "../../middleware/validation.middleware";
import { create } from "xmlbuilder2";

export const ordersRouter = express.Router();

ordersRouter.get("/", validate(pagingRequestSchema), async (req, res) => {
  const data = pagingRequestSchema.parse(req);
  const orders = await getOrders(data.query.skip, data.query.take);

  res.json(orders);
});

ordersRouter.get("/:id", validate(idUUIDRequestSchema), async (req, res) => {
  const data = idUUIDRequestSchema.parse(req);
  const order = await getOrderDetail(data.params.id);
  if (order != null) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order Not Found" });
  }
});

ordersRouter.post("/", validate(orderPOSTRequestSchema), async (req, res) => {
  const data = orderPOSTRequestSchema.parse(req);
  const order = await upsertOrder(data.body);
  if (order != null) {
    if (req.headers["accept"] == "application/xml") {
      res.status(201).send(create().ele("order", order).end());
    } else {
      res.status(201).json(order);
    }
  } else {
    if (req.headers["accept"] == "application/xml") {
      res
        .status(500)
        .send(create().ele("error", { message: "Creation failed" }).end());
    } else {
      res.status(500).json({ message: "Creation failed" });
    }
  }
});

ordersRouter.delete("/:id", validate(idUUIDRequestSchema), async (req, res) => {
  const data = idUUIDRequestSchema.parse(req);
  const order = await deleteOrder(data.params.id);
  if (order != null) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order Not Found" });
  }
});

ordersRouter.put("/:id", validate(orderPUTRequestSchema), async (req, res) => {
  const data = orderPUTRequestSchema.parse(req);
  const orderData = { customerId: "", ...data.body };
  const order = await upsertOrder(orderData, data.params.id);
  if (order != null) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order Not Found" });
  }
});

ordersRouter.delete(
  "/:id/items/:itemId",
  validate(idItemIdUUIDRequestSchema),
  async (req, res) => {
    const data = idItemIdUUIDRequestSchema.parse(req);
    const order = await deleteOrderItem(data.params.id, data.params.itemId);
    if (order != null) {
      if (req.headers["accept"] == "application/xml") {
        res.status(201).send(create().ele("order", order).end());
      } else {
        res.status(201).json(order);
      }
    } else {
      if (req.headers["accept"] == "application/xml") {
        res
          .status(404)
          .send(
            create().ele("error", { message: "Order or item not found" }).end()
          );
      } else {
        res.status(404).json({ message: "Order or item not found" });
      }
    }
  }
);

ordersRouter.post(
  "/:id/items",
  validate(orderItemsDTORequestSchema),
  async (req, res) => {
    const data = orderItemsDTORequestSchema.parse(req);
    const order = await addOrderItems(data.params.id, data.body);

    if (order != null) {
      if (req.headers["accept"] == "application/xml") {
        res.status(201).send(create().ele("order", order).end());
      } else {
        res.status(201).json(order);
      }
    } else {
      if (req.headers["accept"] == "application/xml") {
        res
          .status(500)
          .send(create().ele("error", { message: "Creation failed" }).end());
      } else {
        res.status(500).json({ message: "Creation failed" });
      }
    }
  }
);
