import { createId, createJob, pollJob, getJobDownloadUrl } from './lib/index';


const start = (file: string) => {
    console.log('[START]');
    const jobId = createId(14);
    return createJob(file, jobId)
        .then(pollJob)
        .then(getJobDownloadUrl);
}

const jobId = createId(3);
const file = "http://www.html5tutorial.info/media/vincent.mp3?" + jobId;


start(file)
    .then(e => {
        console.log('[DONE]');
        console.log(e);
    })
    .catch(e => {
        console.log('[EXIT ERROR]');
        console.log(e);
    });

