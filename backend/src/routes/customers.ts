// backend/src/routes/customers.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Get all customers
router.get("/", async (req, res) => {
  const customers = await prisma.customer.findMany();
  res.json(customers);
});

// Add new customer
router.post("/", async (req, res) => {
  const { name, contact, phone, credit, followUp } = req.body;
  const customer = await prisma.customer.create({
    data: { name, contact, phone, credit, followUp },
  });
  res.json(customer);
});

// Delete customer
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.customer.delete({ where: { id: Number(id) } });
  res.json({ success: true });
});

export default router;
