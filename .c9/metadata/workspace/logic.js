{"filter":false,"title":"logic.js","tooltip":"/logic.js","undoManager":{"mark":20,"position":20,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":33}},"text":"var request = require('request');"},{"action":"insertText","range":{"start":{"row":0,"column":33},"end":{"row":1,"column":0}},"text":"\r"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":141,"column":0}},"lines":["var jsdom = require('jsdom');","var helpers = require(\"./helpers\");","","","var config_service_url = 'http://www.convertfiles.com/converter.php';","var config_service_host = \"www.convertfiles.com\";","var config_headers = {","    \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\",","    \"Accept-Encoding\": \"gzip,deflate,sdch\",","    \"Accept-Language\": \"de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4,nl;q=0.2\",","    \"Cache-Control\": \"max-age=0\",","    \"Connection\": \"keep-alive\",","    \"DNT\": \" 1\",","    \"Host \": config_service_host,","    \"User-Agent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36\"","};","","var func_sendconvert = function (jobid, fileurl, callback) {","    ","    var form = {","        download_url: fileurl,","        file_or_url: 'url',","        youtube_mode: 'default',","        input_format: '.mp3',","        output_format: '.wav',","        APC_UPLOAD_PROGRESS: jobid","    };","    request.post({ url: config_service_url, form: form, headers: config_headers }, function (e, r, body) {","        ","        ","        if (!e && r.statusCode == 200)","            func_polljob(jobid,callback);","        else","            console.log(\"##### service nicht gefunden\");","    });","","};","var func_getdownloadurl = function (jobid,callback) {","    var url = \"http://www.convertfiles.com/convertrogressbar.php?progress_key=\" + jobid + \"&i=1\";","    ","    var done = false;","    ","    setTimeout(function() {","        if(!done){","            clearInterval(interval);","            console.log(\"timeout\");","            callback({ok:false});","        }    ","    }, 15000);","    ","    var interval = setInterval(function () {","        ","        request.post({ url: url}, function (e, r, html) {","        if (!e && r.statusCode == 200) {","            jsdom.env({","                html:html,","                scripts: [ 'http://code.jquery.com/jquery-1.9.1.min.js' ],","                done: function (errs, window) {","                    ","                    var _downloadurl = window.$('a:eq(0)').attr(\"href\");","                    var _deletedownloadurl = window.$('a:eq(1)').attr(\"href\")","                    ","                    console.log(\"call\");","                    ","                    if(_downloadurl && _deletedownloadurl){","                        clearInterval(interval);","                        done = true;","                        console.log(\"del dl @: \"+_deletedownloadurl);","                        console.log(\"dl ready @: \"+_downloadurl);","                        ","                        callback({ok:true, dl:_downloadurl, del:_deletedownloadurl});","                           ","                    }","                    else {","                        //callback({ok:false});","                    }","                }","            });","        } else {","            console.log(\"#### final nicht gefunden\");","            clearInterval(interval);","        }","    });","        ","    },1000);","    ","    ","","}","var func_polljob = function (jobid,callback) {","","    console.log(\"jobstarted: \"+jobid);","    ","    setTimeout(function() {","        if(!done){","            clearInterval(interval);","            console.log(\"timeout\");","            callback({ok:false});","        }    ","    }, 15000);","    ","    var interval = setInterval(function () {","        request.get({ url: \"http://www.convertfiles.com/getprogress.php?progress_key=\" + jobid, headers: config_headers }, function (e, r, body) {","            if (!e && r.statusCode == 200) {","","                console.log(\"jobprogress: \" + body);","                ","                if (body == \"100\") {","                    done = true;","                    clearInterval(interval);","                    console.log(\"yeah - job done\");","                    func_getdownloadurl(jobid,callback);","                }","            } else {","                console.log(\"#### progress nicht gefunden\");","                clearInterval(interval);","            }","        });","    }, 300)","}","","","","// create jobid","//var jobid = func_getID(14);","","exports.run = function (job, callback){","    func_sendconvert(job.jobid, job.dropboxurl, callback);","}","exports.func_getID = function (idLength) {","    var chars = \"0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z\";","    chars = chars.split(\",\");","    var min = 0;","    var max = chars.length - 1;","    var unique_id = \"\";","    for (var i = 0; i < idLength; i++) {","        unique_id += chars[Math.floor(Math.random() * (max - min + 1) + min)];","    }","    return unique_id;","}"]}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2,"column":0},"end":{"row":2,"column":35}},"text":"var helpers = require(\"./helpers\");"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":25},"end":{"row":34,"column":33}},"text":"[app.js]"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":33},"end":{"row":34,"column":34}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":34,"column":26},"end":{"row":34,"column":29}},"text":"app"},{"action":"insertText","range":{"start":{"row":34,"column":26},"end":{"row":34,"column":27}},"text":"l"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":27},"end":{"row":34,"column":28}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":28},"end":{"row":34,"column":29}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":29},"end":{"row":34,"column":30}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":34,"column":30},"end":{"row":34,"column":31}},"text":"c"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":46,"column":25},"end":{"row":46,"column":36}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":63,"column":33},"end":{"row":63,"column":44}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":68,"column":37},"end":{"row":68,"column":48}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":69,"column":37},"end":{"row":69,"column":48}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":80,"column":25},"end":{"row":80,"column":36}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":80,"column":36},"end":{"row":80,"column":41}},"text":"#### "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":92,"column":17},"end":{"row":92,"column":28}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":97,"column":25},"end":{"row":97,"column":36}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":106,"column":29},"end":{"row":106,"column":40}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":111,"column":33},"end":{"row":111,"column":44}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":115,"column":29},"end":{"row":115,"column":40}},"text":"[logic.js] "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":115,"column":40},"end":{"row":115,"column":45}},"text":"#### "}]}]]},"ace":{"folds":[],"scrolltop":1100,"scrollleft":0,"selection":{"start":{"row":130,"column":0},"end":{"row":130,"column":18},"isBackwards":true},"options":{"tabSize":4,"useSoftTabs":true,"guessTabSize":false,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":77,"mode":"ace/mode/javascript"}},"timestamp":1399673917919,"hash":"ce74644bb207059db5dd93caebbfeb2f97b971e6"}