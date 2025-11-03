const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();


//  middleware

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//  Import Routes

const userRoutes = require("./routes/userRoutes");
// const providerRoutes = require("./routes/serviceProviderRoutes");
// const serviceRequestRoutes = require("./routes/serviceRequestRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const ratingRoutes = require("./routes/ratingRoutes");


//  Health Check

app.get("/", (req, res) => {
  res.json({ message: "NearHands API running 🚀" });
});


//  Mount Routes

app.use("/api/users", userRoutes);
// app.use("/api/providers", providerRoutes);
// app.use("/api/service-requests", serviceRequestRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/ratings", ratingRoutes);


// Global Error Handler 
app.use((err, req, res, next) => {
  console.error(" Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
