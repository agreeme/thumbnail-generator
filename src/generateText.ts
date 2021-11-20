import TextToSVG, { GenerationOptions } from "text-to-svg"
import sharp from 'sharp'
import { sentenceToLines } from './textOps'
import Color from 'color'

const poppins = require.resolve('@fontsource/poppins/files/poppins-all-700-normal.woff')

const SVG_TEXT_OPTS = {
  svgHeight: 60,
  wordsPerLine: 3,
  backgroundPadding: {
    vertical: 15,
    horizontal: 20
  },
  color: 'black',
  _originalFontSize: 72,
  backgroundColor: 'white'
};

const generateText = async (articleTitle: string) => {
  const backgroundColor = Color(SVG_TEXT_OPTS.backgroundColor)
  const textToSVG = TextToSVG.loadSync(poppins);
  const textToSVGOptions: GenerationOptions = {
    x: 0,
    y: 0,
    fontSize: SVG_TEXT_OPTS._originalFontSize,
    anchor: 'top',
    attributes: {
      fill: SVG_TEXT_OPTS.color
    }
  };

  const textForSVG = String.prototype.toUpperCase.apply(articleTitle)
  const svgText = textToSVG.getSVG(textForSVG, textToSVGOptions);

  const svgTextSharp = await sharp(Buffer.from(svgText))
    .resize({ height: SVG_TEXT_OPTS.svgHeight, fit: 'contain' })
    .toBuffer({ resolveWithObject: true })

  return await sharp(
      {
        create: {
          channels: 4,
          height: svgTextSharp.info.height + SVG_TEXT_OPTS.backgroundPadding.vertical,
          width: svgTextSharp.info.width + SVG_TEXT_OPTS.backgroundPadding.horizontal,
          background: {
            r: backgroundColor.red(),
            g: backgroundColor.green(),
            b: backgroundColor.blue(),
            alpha: backgroundColor.alpha()
          }
      }
    }
   )
    .composite([{
      input: svgTextSharp.data
    }])
    .png()
    .toBuffer({ resolveWithObject: true })
}

const textWithBackground = async (articleTitle: string) => {
  const lines = sentenceToLines(articleTitle, SVG_TEXT_OPTS.wordsPerLine)
  const toRender = lines.map(line => generateText(line))
  return await Promise.all(toRender)
}

const createLines = async (articleTitle: string, thumbnailOptions: any) => {
  const textGraphics = await textWithBackground(articleTitle)
  return textGraphics.map((textSharp, index) => {
    const lineHeight = index * (textSharp.info.height * 0.8);
    const widthCenter = Math.round((thumbnailOptions.width - textSharp.info.width) / 2);
    const heightCenter = (thumbnailOptions.height / 2) - ((textSharp.info.height * textGraphics.length) / 2);
    return {
      input: textSharp.data,
      top: Math.round(heightCenter + lineHeight),
      left: widthCenter
    }
  })
}

export { generateText, textWithBackground, createLines }