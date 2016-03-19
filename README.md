# Convert

Converter Service that wraps a online service to convert files
written in Typescript.

```
npm install // will install deps, typings and triggers first build 
```

```
import { convertToWav } from 'convert';

const file = "http://www.html5tutorial.info/media/vincent.mp3"

convertToWav(file)
  .then(r => console.log(r.downloadURL)); // http://url.vincent.wav

```

# Development:
```
npm run watch // will trigger typescript watcher 
```
```
npm run start // will nodemon (watcher) that will restart server on changes 
```

