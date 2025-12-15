import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  mediaUploader: f({
    image: { maxFileSize: "16MB" },
    video: { maxFileSize: "32MB" },
    audio: { maxFileSize: "8MB" },
  }).onUploadComplete(({ file }) => {
    let type: "image" | "video" | "audio" = "image";

    if (file.name.match(/\.(mp4|mov|avi)$/i)) type = "video";
    else if (file.name.match(/\.(mp3|wav|ogg)$/i)) type = "audio";

    return {
      url: file.ufsUrl,
      type,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
