# Convert

Converter Service that wraps a online service to convert files

you can convert:

mp3 => wav

# Example App
```
npm install // will install deps, typings and triggers first build 
npm start  // will serve universal react app on http://localhost:1337
```


# Lib
```
import { convertToWav } from 'convert';

const file = "http://www.html5tutorial.info/media/vincent.mp3"

convertToWav(file)
  .then(r => console.log(r.downloadURL)); // => http://url.vincent.wav

```

# Development:
```
npm run watch // will trigger typescript watcher 
```
```
npm run watch-serve // will trigger nodemon (watcher) that will restart server on changes 
```

# made with:
- TypeScript
- browserify
- jsdom
- react
- universal-fetch
- and love 
