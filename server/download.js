import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = `https://www.youtube.com/shorts/${videoId}`;
    console.log(`Realizando o download do video: ${videoId}`);

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationsMs / 1000;

        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior do que 60 segundos.");
        }
      })
      .on("end", () => {
        console.log("Donwload do video finalizado.");
        resolve();
      })
      .on("error", (err) => {
        console.log(
          `Não foi possível fazer o download do vídeo. Detalhes do erro: ${err}`
        );
        reject(err);
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"));
  });
