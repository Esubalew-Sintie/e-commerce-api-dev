const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimiter = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const app = express();
const {
  getPort,
  getWindow,
  getMaxRequest,
  getRateLimitMessage,
} = require("./utils/Configs");
const port = getPort();
const windowMs = getWindow();
const max = getMaxRequest();
const message = getRateLimitMessage();

const { apiDocumentation } = require("./swagger/apiDocs");
const { cacheClient } = require("./cache/cacheDBInit");
const {
  handleUnknownRoute,
  handleError,
} = require("./middlewares/handleError");

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");

app.use(rateLimiter({ windowMs, max, message }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRouter);

app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.all("*", handleUnknownRoute);
app.use(handleError);

app.listen(port, async () => {
  try {
    await cacheClient.connect();
    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
