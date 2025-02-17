import { Storage } from "@google-cloud/storage";
import fs from 'fs';
import ffmpeg from "fluent-ffmpeg";

const storage = new Storage();

const rawVideoBucketName = "chuma-raw-videos";
const processedideoBucketNamr = "chuma-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * Creates the local directories for raw and processed videos.
 */

export function setupDirectories(){

}

/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to conert to {@link localProcessedVideoPath}
 * @returns A promise that resolves when the video has been converted.
 */

export function conertVideo (rawVideoName: string, processedVideoName: string){
    ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
        .outputOption("-vf", "scale=-1:360")
        .on("end", ()=>{
            console.log("Processing finished successfully.");
        })
        .on("error", (err) => {
            console.log(`An error occured: ${err.message}`);
            console.log(`Internal Server Error: ${err.message}`);
        })
        .save(`${localProcessedVideoPath}/${processedVideoName}`);
}