import webSocketRoute from "./websocket.route.js";
import productsRoute from "./products.route.js";
import cartsRoute from "./cart.route.js";
import sessionRoute from "./session.route.js";
// import mockingRoute from './mocking.route.js';
import loggerRoute from "./logger.route.js";

import api from "./api/index.js";

import { Router } from "express";
const router = Router();

router.use("/chat", webSocketRoute);
router.use("/cart", cartsRoute);
router.use("/products", productsRoute);
router.use("/", sessionRoute);
router.use("/loggerTest", loggerRoute);
/*mockingRoute(router);
  loggerRoute(router);

  // API*/
router.use("/api", api);

router.use("*", (req, res) => res.status(404).render("404"));
export default router;
