import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput } from "./product.schema";
import { createProduct, getProducts } from "./product.service";

export async function createProductHandler(
  request: FastifyRequest<{
    Body: CreateProductInput;
  }>,
  reply: FastifyReply
) {
  try {
    const product = await createProduct({
      ...request.body,
      ownerId: request.user.id,
    });

    return reply.status(201).send(product);
  } catch (error) {
    console.error("Failed to create product:", error);
    return reply.status(500).send("Failed to create product");
  }
}

// export async function createProductHandler(
//   request: FastifyRequest<{
//     Body: CreateProductInput;
//   }>
// ) {
//   const product = await createProduct({
//     ...request.body,
//     ownerId: request.user.id,
//   });

//   return product;
// }

export async function getProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await getProducts();

    return reply.send(products);
  } catch (error) {
    console.error("Failed to get products:", error);
    return reply.status(500).send("Failed to get products");
  }
}

// export async function getProductsHandler() {
//   const products = await getProducts();

//   return products;
// }
