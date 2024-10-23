#!/usr/bin/env node

import path from "path";
import compression from "compression";
import morgan from "morgan";
import express from "express";
import { Resvg, ResvgRenderOptions } from "@resvg/resvg-js";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import * as zod from "zod";
import {
  ImageSpec,
  imageSpecs,
  twitterEmoji,
} from "./components/utils/ImageOps";

const { createRequestHandler } = require("@expo/server/adapter/express");

const CLIENT_BUILD_DIR = path.join(process.cwd(), "dist/client");
const SERVER_BUILD_DIR = path.join(process.cwd(), "dist/server");

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

process.env.NODE_ENV = "production";

app.use(
  express.static(CLIENT_BUILD_DIR, {
    maxAge: "1h",
    extensions: ["html"],
  }),
);

app.use(morgan("tiny"));

async function attemptToLoadEmoji(emoji: string) {
  try {
    const url = twitterEmoji(emoji);
    const svg = await fetch(url);
    const svgContent = await svg.text();
    return svgContent;
  } catch (e) {
    console.error(e);
    const split = emoji.split("-").slice(0, -1).join("-");
    if (split !== emoji) {
      return attemptToLoadEmoji(split);
    }
    throw new Error("Could not load emoji");
  }
}

async function generateImage(color: string, emoji: string, spec: ImageSpec) {
  const { size, padding } = spec;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d")!;

  // draw color
  ctx.fillStyle = color as string;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const emojiSize = size - padding * 2;
  const emojiOffset = (size - emojiSize) / 2;
  const svg = await attemptToLoadEmoji(emoji as string);
  const opts: ResvgRenderOptions = {
    fitTo: { mode: "width", value: emojiSize },
  };
  const resvg = new Resvg(svg, opts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  const image = await loadImage(pngBuffer);

  // draw image
  ctx.drawImage(image, emojiOffset, emojiOffset, emojiSize, emojiSize);
  return canvas.toBuffer("image/png");
}

const requestValidator = zod
  .object({
    emoji: zod.string(),
    color: zod.string(),
  })
  .required()
  .strip();

app.get("/icon", async (req: express.Request, res: express.Response) => {
  const result = await requestValidator.safeParseAsync(req.query);
  if (!result.success) {
    res.send(400).json({ error: "Missing parameters" });
    return;
  }

  const { emoji, color } = result.data;
  const image = await generateImage(color, emoji, imageSpecs.icon);
  res.setHeader("Content-Type", "image/png").send(image);
});

app.get("/splash", async (req: express.Request, res: express.Response) => {
  const result = await requestValidator.safeParseAsync(req.query);
  if (!result.success) {
    res.send(400).json({ error: "Missing parameters" });
    return;
  }

  const { emoji, color } = result.data;
  const image = await generateImage(color, emoji, imageSpecs.splash);
  res.setHeader("Content-Type", "image/png").send(image);
});

app.get("/favicon", async (req: express.Request, res: express.Response) => {
  const result = await requestValidator.safeParseAsync(req.query);
  if (!result.success) {
    res.send(400).json({ error: "Missing parameters" });
    return;
  }

  const { emoji, color } = result.data;
  const image = await generateImage(color, emoji, imageSpecs.favicon);
  res.setHeader("Content-Type", "image/png").send(image);
});

app.all(
  "*",
  createRequestHandler({
    build: SERVER_BUILD_DIR,
  }),
);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
