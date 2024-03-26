import buildServer from "./server";

const server = buildServer();

async function main() {
  try {
    await server.listen(49086, "0.0.0.0");

    console.log(`Server ready at http://localhost:49086`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
