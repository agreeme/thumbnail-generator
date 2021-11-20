import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'
import crypto from 'crypto';
import { createLines } from './generateText';
import Color from 'color'

const logoSVG = fs.readFileSync(path.join(__dirname, './assets/logo.svg'))
const stopWatchSVG = fs.readFileSync(path.join(__dirname, './assets/stopwatch/stopwatch.svg'))
const plusSVG = fs.readFileSync(path.join(__dirname, './assets/stopwatch/plus.svg'))
const waveSVG = fs.readFileSync(path.join(__dirname, './assets/wave.svg'))

type SharpInput = Buffer
  | Uint8Array
  | Uint8ClampedArray
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array
  | string

const THUMBNAIL_OPTS = {
  width: 850,
  height: 560,
  overlayColor :'#f0f7ff'
};

const LOGO_OPTS = {
  width: 170,
  offsetTop: 10,
  offsetLeft: 10,
}


const buildThumbnail = async (articleTitle: string, backgroundImage: SharpInput) => {
  const outputDir = path.join(__dirname, '../out')
  const overlayColor = Color(THUMBNAIL_OPTS.overlayColor);

  if (!fs.existsSync(outputDir)) {
    console.info('Creating output directory')
    fs.mkdirSync(outputDir)
  }

  console.info(`Generating thumbnail for "${articleTitle}"`)

  const articleTitleHash = crypto.createHash('md5').update(articleTitle).digest('hex')
  const outputFile = path.join(outputDir, './article-thumbnail-' + articleTitleHash + '.png')
  const textToLines = await createLines(articleTitle, THUMBNAIL_OPTS)

  try {
    const logo = await sharp(logoSVG)
      .resize({
        width: LOGO_OPTS.width,
        fit: 'contain'
      })
      .trim()
      .toBuffer({ resolveWithObject: true})

    const stopwatch = await sharp(stopWatchSVG)
      .resize({
        width: LOGO_OPTS.width,
        fit: 'contain'
      })
      .trim()
      .toBuffer({ resolveWithObject: true })

    const wave = await sharp(waveSVG)
      .resize({
        width: THUMBNAIL_OPTS.width,
        fit: 'contain'
      })
      .png()
      .toBuffer({ resolveWithObject: true })

    const plus = await sharp(plusSVG)
      .resize({
        width: 50,
        fit: 'contain'
      })
      .trim()
      .toBuffer({ resolveWithObject: true })

      const background = await sharp(backgroundImage)
        .resize({
          width: THUMBNAIL_OPTS.width,
          height: THUMBNAIL_OPTS.height,
        })
        .toBuffer()

    const overlay = await sharp({
      create: {
        width: THUMBNAIL_OPTS.width,
        height: THUMBNAIL_OPTS.height,
        channels: 4,
        background: {
          r: overlayColor.red(),
          g: overlayColor.green(),
          b: overlayColor.blue(),
          alpha: .3
        }
      }
    })
    .png()
    .resize({
      width: THUMBNAIL_OPTS.width,
      height: THUMBNAIL_OPTS.height,
      fit: 'cover'
    })
    .toBuffer()

    const createOps = await sharp({
      create: {
        width: THUMBNAIL_OPTS.width,
        height: THUMBNAIL_OPTS.height,
        channels: 3,
        background: {
          r: 255,
          g: 255,
          b: 255,
        }
      }
    })
    .png()
    .toBuffer()

    const flat = await sharp(createOps)
      .composite([
        {
          input: background
        },
        {
          input: stopwatch.data,
          blend: 'overlay',
          left: Math.round(THUMBNAIL_OPTS.width - stopwatch.info.width - 20),
          top: 40
        },
        {
          input: plus.data,
          top: Math.round(THUMBNAIL_OPTS.height - wave.info.height - 60),
          blend: 'overlay',
          left: 30,
        },
        {
          input: overlay,
          blend: 'over',
          gravity: 'center'
        },
        {
          input: wave.data,
          gravity: 'south'
        },
        {
          input: logo.data,
          left: Math.round((THUMBNAIL_OPTS.width - LOGO_OPTS.width) - 20),
          top: Math.round(THUMBNAIL_OPTS.height - logo.info.height - LOGO_OPTS.offsetTop),
          blend: 'over',
        },
        ...textToLines
      ])
      .png()
      .toBuffer()

   await sharp(flat)
     .resize({
       width: THUMBNAIL_OPTS.width,
       height: THUMBNAIL_OPTS.height
    })
    .toFile(outputFile)
    console.info(`Thumbnail created "${outputFile}"`)
  } catch (e) {
    console.error(e)
  }
}

export { buildThumbnail}