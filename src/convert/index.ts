import { createId, createJob, pollJob, getJobDownloadUrl, FILETYPES } from './lib/index';

export function convertToWav(file: string) {
    return createJob(FILETYPES.wav, file)
        .then(pollJob)
        .then(getJobDownloadUrl);
}
