import "dotenv/config";
import app from "./app";
import http from "http";
import connectDb from "./config/db";

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
connectDb()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Database Connection Error: ${err}`));

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
