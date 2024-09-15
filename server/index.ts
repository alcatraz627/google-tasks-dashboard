import Koa from "koa";
import Router from "koa-router";
import { authorize } from "./tasks";

const router = new Router();

router.get("/api/tasklist", async (ctx, next) => {
  ctx.header["content-type"] = "application/json";

  const auth = await authorize();

  console.log({ auth });

  ctx.response.body = { Hehe: 2 };
  // await authorize()
  //   .then(listTaskLists)
  //   .then((tasks) => {
  //     console.log("Tasks: ", tasks);
  //     ctx.response.body = { tasks };
  //   })
  //   .catch(console.error);
});

const PORT = 4009;

let appInstance = null;

const initApp = () => {
  const app = new Koa();

  app.use(router.routes());
  app.listen(PORT);
  return app;
};

console.log({ appInstance });

if (!appInstance) {
  appInstance = initApp();
}
