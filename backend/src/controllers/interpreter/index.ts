import Koa from "koa";
import { TInterpreterRequestBody } from "../../types/interpreter";
import interpretBrainfuck from "../../interpreters/brainfuckInterpreter.ts";

export const parseLanguage = async (ctx: Koa.Context) => {
  const { language, code } = ctx.request.body as TInterpreterRequestBody;
  if (!code) {
    ctx.status = 404;
    ctx.body = "Code not applied";
    return;
  }

  let coordinates;

  switch (language) {
    case "brainfuck":
      coordinates = interpretBrainfuck(code);
      break;
    default:
      ctx.status = 400;
      ctx.body = "Unsupported language";
      return;
  }
  ctx.body = { coordinates };
};
