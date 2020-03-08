import express from "express";
const app = express();

app.use((resquest, response, next) => {
  console.log(resquest.url);
  response.write("hi");
  next();
});
app.use((resquest, response, next) => {
  console.log(resquest.url);
  response.write("hi");
  next();
});
app.use((resquest, response, next) => {
  response.end();
});
app.listen(3000, () => {
  console.log("正在 listen 3000");
});
