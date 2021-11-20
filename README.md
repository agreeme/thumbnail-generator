# Thumbnail generator for agreeme.app

Allows to easily generate thumbnails for the articles posted on agreeme.app.

The function only necessitates the title of the article and a background image for the thumbnail.

The image can be provided as a path, a Buffer (for example using a base64 url with `Buffer.from(data, 'base64')`).

### Output
<img src="./doc/example-output.png" width="400">


## Running it locally

You can test this code rapidly with an imediately self invoked anonymous function.

```
import { buildThumbnail } from 'website-thumbnail-generator';
(async(){
  await buildThumbnail("Hello, World", path.resolve(__dirname, '../photos/undefined.bmp'));
})()
```

### TODOs
- [ ] Make it easier to change the colours of the wave/logo and other static assets on the flight (considering a transform step that CSS on the fly).
- [ ] Add automated tests for the multiple types of format on the website

### Completed Column ✓
- [x] Add support for multiple lines