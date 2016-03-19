import * as express from 'express';
import * as DOMServer from 'react-dom/server';
import { convertToWav } from './convert';
import { Page } from './public/index';

const file = "http://www.html5tutorial.info/media/vincent.mp3?" + Date.now();
console.log(file);



const server = express();

server.use('/public', express.static('dist/public'));
server.use((req, res) => {


    // Test
    /*
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

*/

    const html = `  <html> 
                        <head>
                            <script src='/public/bundle.js'></script>
                            <link rel='stylesheet' id='main-css'  href='https://bootswatch.com/cosmo/bootstrap.min.css' type='text/css' media='all' />
                        </head>
                        <body>
                            <div id='root'>${DOMServer.renderToString(Page)}</div>
                        </body>
                    </html>`;

    res.end(html);

});

// start the server 
server.listen(1337, () => {
    console.log('server up');
});

