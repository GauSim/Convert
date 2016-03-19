import { createId, createJob, pollJob, getJobDownloadUrl, FILETYPES } from './lib/index';


export function convertToWav(file: string) {
    return createJob(FILETYPES.wav, file)
        .then(pollJob)
        .then(getJobDownloadUrl);
}

const jobId = createId(3);
const file = "http://www.html5tutorial.info/media/vincent.mp3?" + jobId;


// Test
console.log('[START]');
convertToWav(file)
    .then(result => {
        console.log('[DONE]');
        console.log(result);
    })
    .catch(error => {
        console.log('[EXIT ERROR]');
        console.log(error);
    });

