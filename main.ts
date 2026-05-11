import { Application, send } from "./deps.ts";
import router from "./routes/programmes.ts";

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.url.pathname.startsWith("/css")) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/public`,
    });
    return;
  }

  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");

await app.listen({ port: 8000 });