import { Router } from "express";
import productRoutes from "./products.routes";

const router: any = Router();

// Prefijo requerido por el ejercicio
router.use("/api/v1/products", productRoutes);

export default router;
