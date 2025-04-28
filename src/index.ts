import "reflect-metadata";
import { AppDataSource } from "./config/database";
import app from "./app";
import http from "http";

const PORT = process.env.PORT || 3000;

// Crear el servidor HTTP con la app de Express
const server = http.createServer(app);

// Iniciar la aplicación
async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Base de datos inicializada correctamente");

    // Iniciar el servidor con soporte para WebSockets
    server.listen(PORT, () => {
      console.log(`Servidor en el puerto http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicacion", error);
  }
}
main();
