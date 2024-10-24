import FileSaver from "file-saver";
import JSZip from "jszip";

function loadImageAsync(uri: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const imageSource = new Image();
    imageSource.crossOrigin = "anonymous";
    imageSource.onload = () => resolve(imageSource);
    imageSource.onerror = () => reject(imageSource);
    imageSource.src = uri;
  });
}

function drawImageScaled(
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  padding: number,
) {
  // scale the image to fit the canvas while maintaining aspect ratio and accounting for padding
  const canvas = ctx.canvas;
  const aspectRatio = img.width / img.height;
  const pad = padding * 2;
  const width =
    aspectRatio < 1 ? (canvas.height - pad) * aspectRatio : canvas.width - pad;
  const height =
    aspectRatio > 1 ? (canvas.width - pad) / aspectRatio : canvas.height - pad;
  const offsetX = (canvas.width - width) / 2;
  const offsetY = (canvas.height - height) / 2;
  ctx.drawImage(img, offsetX, offsetY, width, height);
}

export async function createAppIcon({
  color,
  imageUrl,
  emojiId,
  size,
  padding,
}: {
  color: string;
  imageUrl?: string;
  emojiId?: string;
  size: number;
  padding: number;
}): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d")!;

  // draw color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (imageUrl) {
    const imageSource = await loadImageAsync(imageUrl);
    drawImageScaled(imageSource, ctx, padding);
  } else if (emojiId) {
    const emojiUrl = twitterEmoji(emojiId);
    // const emojiPadding = size * 0.125;
    const emojiSize = size - padding * 2;
    const emojiOffset = (size - emojiSize) / 2;
    const imageSource = await loadImageAsync(emojiUrl);
    // draw image
    ctx.drawImage(imageSource, emojiOffset, emojiOffset, emojiSize, emojiSize);
  }

  // defaults to PNG with no loss
  return canvas.toDataURL();
}

// twemoji.maxcdn.com
export function twitterEmoji(id: string): string {
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${id}.svg`;
}

function imageUriToBase64(imageUri: string): string {
  return imageUri.substring(imageUri.indexOf("base64,") + "base64,".length);
}

export type ImageSpec = {
  size: number;
  padding: number;
};

export const imageSpecs: Record<string, ImageSpec> = {
  icon: {
    size: 1024,
    padding: 128,
  },
  splash: {
    size: 2048,
    padding: 832,
  },
  favicon: {
    size: 48,
    padding: 0,
  },
  adaptive: {
    size: 1024,
    padding: 290,
  },
};

export async function generateImagesAsync({
  emojiId,
  image,
  color,
}: {
  emojiId?: string;
  image?: string;
  color: string;
}): Promise<void> {
  const splash = await createAppIcon({
    color,
    emojiId: emojiId,
    imageUrl: image,
    size: imageSpecs.splash.size,
    padding: imageSpecs.splash.padding,
  });

  const icon = await createAppIcon({
    color,
    emojiId: emojiId,
    imageUrl: image,
    size: imageSpecs.icon.size,
    padding: imageSpecs.icon.padding,
  });
  const faviconPng = await createAppIcon({
    color: "transparent",
    emojiId: emojiId,
    imageUrl: image,
    size: imageSpecs.favicon.size,
    padding: imageSpecs.favicon.padding,
  });

  const iconB64 = imageUriToBase64(icon);
  const splashB64 = imageUriToBase64(splash);
  const faviconB64 = imageUriToBase64(faviconPng);

  const content = await zipImagesAsync({
    icon: iconB64,
    splash: splashB64,
    favicon: faviconB64,
  });

  const folderName = image
    ? `app-icons-${image.slice(0, 10)}.zip`
    : `app-icons-${emojiId}-${color}.zip`;

  FileSaver.saveAs(content, folderName);
}

async function zipImagesAsync({
  icon,
  splash,
  favicon,
}: {
  icon: string;
  splash: string;
  favicon: string;
}) {
  const zip = new JSZip();
  // icon 1024x1024 - emoji padding - 128
  // splash 2048x2048 - emoji padding - 1000 (524 icon)
  zip.file("icon.png", icon, { base64: true });
  zip.file("splash.png", splash, { base64: true });
  zip.file("favicon.png", favicon, { base64: true });
  const content = await zip.generateAsync({ type: "blob" });
  return content;
}
