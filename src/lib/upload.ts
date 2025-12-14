import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  mediaUploader: f({ image: {}, video: {}, audio: {} }).onUploadComplete(
    ({ file }) => {
      // Instead of reading fileType/mimeType, detect type from file name
      let type: "image" | "video" | "audio" = "image";
      if (file.name.match(/\.(mp4|mov|avi)$/i)) type = "video";
      else if (file.name.match(/\.(mp3|wav|ogg)$/i)) type = "audio";

      return {
        url: file.url,   // always present
        type,            // custom property
      };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
