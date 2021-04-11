import { NextApiRequest, NextApiResponse } from 'next'
import { getScreenshot } from './_lib/chromium'
import { getHtml } from './_lib/thumbnailTemplate'

const isDev = !process.env.AWS_REGION
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  const query = req.query

  try {
    const text = String(query.text);
    const bgColor = String(query.bgcolor);
    const textColor = String(query.textcolor);
    const textStyle = String(query.textstyle);
    const textWeigh = String(query.textweigh);
    const textAlign = String(query.textalign);
    const textFont = String(query.textfont);
    const textPosition = String(query.textposition);
    const textSize = String(query.textsize);
    const bgImage = decodeURIComponent(String(query.bgimage));
    const icon = decodeURIComponent(String(query.icon));

    const html = getHtml({ bgColor, text, textColor, textStyle, textWeigh, textAlign, textFont, textPosition, textSize, bgImage, icon })
    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html')
      res.end(html)

      return
    }

    const file = await getScreenshot(html, isDev)

    res.statusCode = 200

    res.setHeader('Content-Type', `image/png`)
    res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
    )

    res.end(file)

  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end(`<h1>Internal Error</h1><p>${e}</p>`)
    console.error(e)
    console.log(isDev)
  }
  
}
