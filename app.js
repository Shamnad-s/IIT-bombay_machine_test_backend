const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const memberRoutes = require("./routes/member");
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
mongoose
  .connect(
    "mongodb+srv://Amien:12345@cluster0.gului2c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("successfully connected to db.");
  })
  .catch((err) => {
    console.log(err, "failed to connect");
  });

server.listen(3000, () => {
  console.log("port connected to 3000.");
});
