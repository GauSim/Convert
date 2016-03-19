import * as request from 'request';
import * as jsdom from 'jsdom';

interface IFileType {
    name: string;
    ext: string;
}
export class FILETYPES {
    static wav: IFileType = { name: 'wav', ext: '.wav' }
}

const SERVICE_HOST = "www.convertfiles.com";
const SERVICE_URL = `http://${SERVICE_HOST}`;
const REQUEST_HEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip,deflate,sdch",
    "Accept-Language": "de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4,nl;q=0.2",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "DNT": " 1",
    "Host": SERVICE_HOST,
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36"
};

export function createJob(fileType: IFileType, fileurl: string) {

    const jobId = createId(14);
    const form = {
        download_url: fileurl,
        file_or_url: 'url',
        youtube_mode: 'default',
        input_format: '.' + fileExtension(fileurl),
        output_format: fileType.ext,
        APC_UPLOAD_PROGRESS: jobId
    };

    return new Promise((ok, fail) => {
        request.post({ url: `${SERVICE_URL}/converter.php`, form: form, headers: REQUEST_HEADERS }, (error, r, body) => {
            if (!error && r.statusCode == 200)
                ok(jobId);
            else
                fail(error);
        });
    });
}

export function pollJob(id: string) {
    return new Promise((ok, fail) => {
        let done = false;
        let interval;
        const onDone = (r) => {
            clearInterval(interval);
            ok(r);
        }
        const onFail = (r) => {
            clearInterval(interval);
            fail(r);
        }

        setTimeout(() => {
            if (!done) {
                onFail(new Error('Timeout'));
            }
        }, 15000);


        const parseBody = (e, r, body) => {
            if (!e && r.statusCode == 200) {
                console.log("[PROGRESS]" + body);
                if (body == "100") {
                    done = true;
                    onDone(id);
                }
            } else {
                onFail(new Error('progress nicht gefunden'));
            }
        }
        interval = setInterval(() => {
            request.get({ url: `${SERVICE_URL}/getprogress.php?progress_key=${id}`, headers: REQUEST_HEADERS }, parseBody);
        }, 1000);
    });
}

export function getJobDownloadUrl(id: string) {
    return new Promise((ok, faik) => {
        let done = false;
        let interval;

        const onFail = (e) => {
            clearInterval(interval);
            onFail(e);
        }

        const onDone = (d) => {
            clearInterval(interval);
            ok(d);
        }

        setTimeout(() => {
            if (!done) {
                onFail(new Error('Timeout'));
            }
        }, 15000);

        const queryHtml = (error, window: any) => {
            if (error) {
                return onFail(error);
            }
            const downloadURL = window.$('a:eq(0)').attr("href");
            const deleteURL = window.$('a:eq(1)').attr("href")
            if (downloadURL && deleteURL) {
                done = true;
                return onDone({ id, downloadURL, deleteURL });
            }
            else {
                return onFail(new Error('Fail finding download URL'));
            }
        }

        const parseBody = (error, response, html) => {
            if (!error && response.statusCode == 200) {
                jsdom.env({
                    html: html,
                    scripts: ['http://code.jquery.com/jquery-1.9.1.min.js'],
                    done: queryHtml
                });
            } else {
                onFail(new Error('progress nicht gefunden'));
            }
        }

        interval = setInterval(() => {
            request.post({ url: `${SERVICE_URL}/convertrogressbar.php?progress_key=${id}&i=1` }, parseBody);
        }, 1000);
    });
}

export function createId(idLength) {
    const chars = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
    let unique_id = "";
    for (var i = 0; i < idLength; i++) {
        unique_id += chars[Math.floor(Math.random() * ((chars.length - 1) - 0 + 1) + 0)];
    }
    return unique_id;
}

export function fileExtension(file: string) {
    var file_name_array = file.split(".");
    var file_extension = file_name_array[file_name_array.length - 1];
    return file_extension.substr(0, 3);
}
