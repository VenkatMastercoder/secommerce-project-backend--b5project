const express = require("express");
const { PrismaClient } = require("@prisma/client");

// Express Server Instance
const app = express();

// Primsa Client
const prisma = new PrismaClient();

/**
 *  API : GET - http://localhost:3000/
 *
 *  API : GET - http://localhost:3000/:product_id
 *  **/

app.get("/", async (req, res) => {
  // 1.Data from Frontend

  // 2.DB Logic
  const productsData = await prisma.product.findMany();

  // 3.Data to Frontend
  res.json({ message: "Data Send Scuessfully", data: productsData });
});

app.get("/:product_id", async (req, res) => {
  // 1.Data from Frontend
  const { product_id } = req.params;

  // 2.DB Logic
  const productData = await prisma.product.findUnique({
    where: {
      product_id: product_id,
    },
  });

  if (productData === null) {
    res.status(404).json({ message: "No Product Found" });
  } else {
    // 3.Data to Frontend
    res
      .status(200)
      .json({ message: "Data Send Scuessfully", data: productData });
  }
});

app.listen(3000);
