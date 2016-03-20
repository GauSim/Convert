import * as express from 'express';
import * as DOMServer from 'react-dom/server';
import { convertToWav } from './convert';
import { Page } from './public/index';

const server = express();

server.use('/public', express.static('dist/public'));
server.use('/api/convert', (req, res) => {
    const url = req.query['url'];
    const type = req.query['type'];
    if (!url || !type) {
        throw new Error('missing param');
    }

    console.log('[START]');
    convertToWav(url)
        .then(result => {
            console.log('[DONE]');
            res.status(200);
            res.end(JSON.stringify(result));
        })
        .catch(error => {
            console.log('[EXIT ERROR]');
            res.status(500);
            res.end(JSON.stringify(error));
        });
});
server.use((req, res) => {
    res.end(`<html> 
                <head>
                    <script src='/public/bundle.js'></script>
                    <link rel='stylesheet' id='main-css'  href='https://bootswatch.com/cosmo/bootstrap.min.css' type='text/css' media='all' />
                    </head>
                <body>
                    <div id='root'>${DOMServer.renderToString(Page)}</div>
                </body>
            </html>`);
});

// start the server 
server.listen(1337, () => {
    console.log('server up');
});

