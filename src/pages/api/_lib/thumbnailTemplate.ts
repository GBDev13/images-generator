interface GetHtmlProps {
  bgColor: string;
  text:string;
  textColor:string;
  textStyle:string;
  textWeigh:string;
  textAlign:string;
  textFont:string;
  textPosition:string;
  textSize:string;
  bgImage: string;
  icon:string;
}

export function getHtml({
  bgColor,
  text,
  textColor,
  textStyle,
  textWeigh,
  textAlign,
  textFont,
  textPosition,
  textSize,
  bgImage,
  icon
}: GetHtmlProps) {
  let txtPosition;
  switch(textPosition){
    case 'lefttop':
      txtPosition = `top:3rem;left:3rem;`
      break;
    case 'leftbottom':
      txtPosition = `bottom:8rem;left:3rem;`
      break;
    case 'righttop':
      txtPosition = `top:3rem;right:3rem;`
      break;
    case 'rightbottom':
      txtPosition = `bottom:8rem;right:3rem;`
      break;
    case 'center':
      txtPosition = `top:50%;left:50%;transform: translate(-50%, -50%);width:100%;max-width:90%;`
      break;
    default: 
      txtPosition = `top:50%;left:50%;transform: translate(-50%, -50%);width:100%;max-width:90%;`
      break
    }
  return `<!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Montserrat:wght@300;400;700&family=Orbitron:wght@400;700&family=Oswald:wght@300;400;700&family=Pacifico&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
      <title>Image Generator</title>

      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          background: #${bgColor};
          background-image: url('${bgImage}');
          background-position:center;
          background-size:cover;
          padding: 1rem;
          font-family: Inter, Helvetica, sans-serif;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          width: 100%;
          height: 100vh;
          position:relative;
        }

        main h1 {
          position:absolute;
          color: #${textColor};
          font-size: ${textSize};
          text-align: ${textAlign};
          font-style:${textStyle};
          font-weight:${textWeigh};
          font-family: ${textFont};
          ${txtPosition}
        }

        main img {
          width:100%;
          max-width:130px;
          height:130px;
          object-fit: contain;
        }
    
      </style>
    </head>
    <body>
      <main>
        ${icon && `<img src='${icon}' />`}
        ${text && `<h1>${text}</h1>`}
      </main>
    </body>
  </html>`
}