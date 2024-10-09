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
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected to db.");
  })
  .catch((err) => {
    console.log(err, "failed to connect");
  });

server.listen(process.env.PORT, () => {
  console.log("port connected to 3000.");
});
