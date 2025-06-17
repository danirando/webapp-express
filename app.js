const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.static(`public`));
const movieRouter = require("./routers/movies");
const reviewRouter = require("./routers/reviews");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use("/movies", movieRouter);
app.use("/reviews", reviewRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log("Il server è in ascolto su http://localhost:" + port);
});
