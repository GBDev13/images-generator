import { useEffect, useState } from "react"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Input, Select, Stack, Button, SimpleGrid } from "@chakra-ui/react"
import styles from '../styles/home.module.scss';
import { Thumbnail } from "../components/thumbnail";

export default function Home() {
  const [isChanging, setIsChanging] = useState(false);
  const [isChangingIcon, setIsChangingIcon] = useState(false);
  const [textPosition, setTextPosition] = useState('center');

  const [imageUrl, setImageUrl] = useState('');
  const [bgColor, setBgColor] = useState('#d8d8d8');
  const [updatedBgColor, setUpdatedBgColor] = useState('#d8d8d8');

  const [text, setText] = useState('Seu Texto');
  const [updatedText, setUpdatedText] = useState('Seu Texto');
  const [loading, setLoading] = useState(false);

  const [textColor, setTextColor] = useState('#363636');
  const [updatedTextColor, setUpdatedTextColor] = useState('#363636');

  const [textStyle, setTextStyle] = useState('');
  const [textWeigh, setTextWeigh] = useState('');
  const [textAlign, setTextAlign] = useState('center');
  const [textFont, setTextFont] = useState("");
  const [textSize, setTextSize] = useState('');
  const [bgImage, setBgImage] = useState('');
  
  const [icon, setIcon] = useState('');
  const [iconPosition, setIconPosition] = useState('center');

  const setPositionText = (position: string) => {
    setTextPosition(position)
    setIsChanging(false)
  }
  const setPositionIcon = (position: string) => {
    setIconPosition(position)
    setIsChangingIcon(false)
  }

  let textTimeout
  const handleSetText = (target: HTMLInputElement) => {
    setText(target.value)
    clearTimeout(textTimeout);
    textTimeout = setTimeout(() => {
      setUpdatedText(target.value)
    }, 3000)
    setLoading(true);
  }

  let colorTimeout
  const handleSetColor = (setUpdated, value: string) => {
    clearTimeout(colorTimeout);
    colorTimeout = setTimeout(() => {
      setUpdated(value)
    }, 3000)
    setLoading(true);
  }

  useEffect(() => {
    setLoading(false);
  }, [updatedText, updatedTextColor, updatedBgColor])

  useEffect(() => {
    const backgroundColor = updatedBgColor && `bgcolor=${updatedBgColor.split('#')[1]}`
    const backgroundImage = bgImage && `&bgimage=${encodeURIComponent(bgImage)}`
    const imageText = updatedText && `&text=${updatedText}`
    const imageTextStyle = textStyle && `&textstyle=${textStyle}`
    const imageTextWeigh = textWeigh && `&textweigh=${textWeigh}`
    const imageTextAlign = textAlign && `&textalign=${textAlign}`
    const imageTextFont = textFont && `&textfont=${textFont}`
    const imageTextSize = textSize && `&textsize=${textSize}`
    const imageTextPosition = textPosition && `&textposition=${textPosition}`
    const imageTextColor = updatedTextColor && `&textcolor=${updatedTextColor.split('#')[1]}`
    const imageIcon = icon && `&icon=${encodeURIComponent(icon)}`
    const params = `${backgroundColor}${backgroundImage}${imageText}${imageTextColor}${imageTextStyle}${imageTextWeigh}${imageTextAlign}${imageTextFont}${imageTextPosition}${imageIcon}${imageTextSize}`
    setImageUrl(`http://localhost:3000/api/image?${params}`)
    console.log('foi alterado')
  }, [updatedBgColor, updatedText, bgImage, updatedTextColor, textStyle, textWeigh, textAlign, textFont, textPosition, textSize, icon])

  return (
    <main className={styles.home}>
      <section>
        <div>
          {isChanging && (
            <div className={styles.textedit}>
              <span className="center" onClick={() => setPositionText('center')}>centro</span>
              <span onClick={() => setPositionText('lefttop')}>Clique para escolher<br /> (esquerda/topo)</span>
              <span onClick={() => setPositionText('righttop')}>Clique para escolher<br /> (direita/topo)</span>
              <span onClick={() => setPositionText('leftbottom')}>Clique para escolher<br /> (esquerda/baixo)</span>
              <span onClick={() => setPositionText('rightbottom')}>Clique para escolher<br /> (direita/baixo)</span>
            </div>
          )}
          
          {isChangingIcon && (
            <div className={styles.iconedit}>
              <span onClick={() => setPositionIcon('lefttop')}>Clique para escolher<br /> (esquerda/topo)</span>
              <span onClick={() => setPositionIcon('topcenter')}>Clique para escolher<br /> (centro/topo)</span>
              <span onClick={() => setPositionIcon('righttop')}>Clique para escolher<br /> (direita/topo)</span>

              <span onClick={() => setPositionIcon('leftcenter')}>Clique para escolher<br /> (esquerda/centro)</span>
              <span onClick={() => setPositionIcon('center')}>Clique para escolher<br /> (centro)</span>
              <span onClick={() => setPositionIcon('rightcenter')}>Clique para escolher<br /> (direita/centro)</span>

              <span onClick={() => setPositionIcon('leftbottom')}>Clique para escolher<br /> (esquerda/baixo)</span>
              <span onClick={() => setPositionIcon('bottomcenter')}>Clique para escolher<br /> (centro/baixo)</span>
              <span onClick={() => setPositionIcon('rightbottom')}>Clique para escolher<br /> (direita/baixo)</span>
            </div>
          )}
          <img src={imageUrl}/>
          {/* <Thumbnail text={text} icon={icon}/> */}
        </div>
      </section>
      
      <SimpleGrid columns={2} spacing={5}>
        <Button>
            <a href={imageUrl} download>Baixar a imagem</a>
        </Button>
        <Button>
            <a href={imageUrl} target="_blank">Ver a imagem</a>
        </Button>
      </SimpleGrid>
      {loading && <p>carregando</p> }
      <Box w="100%" bg="#fff">

        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>Texto</Tab>
            <Tab>Fundo</Tab>
            <Tab>Ícone/Imagem</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={2} spacing={5}>
                <Button onClick={() => setIsChanging(!isChanging)}>Posicionar o texto</Button>
                <Input variant="filled" placeholder="Texto" type="text" value={text} onChange={({target}) => handleSetText(target)}/>

                <Select variant="filled" placeholder="Estilo do seu Texto" value={textStyle} onChange={({target}) => setTextStyle(target.value)}>
                  <option value="normal">Normal</option>
                  <option value="italic">Italico</option>
                </Select>

                <Select variant="filled" placeholder="Tamanho do texto" value={textSize} onChange={({target}) => setTextSize(target.value)}>
                  <option value="1rem">Pequeno</option>
                  <option value="3rem">Médio</option>
                  <option value="8rem">Grande</option>
                  <option value="10rem">Gigante</option>
                </Select>

                <Select variant="filled" placeholder="Fonte do seu Texto" value={textFont} onChange={({target}) => setTextFont(target.value)}>
                  <option style={{fontFamily: "'Roboto', sans-serif"}} value="Roboto, sans-serif">Roboto</option>
                  <option style={{fontFamily: "'Gloria Hallelujah', cursive"}} value="Gloria Hallelujah, cursive">Gloria Hallelujah</option>
                  <option style={{fontFamily: "'Montserrat', sans-serif"}} value="Montserrat, sans-serif">Montserrat</option>
                  <option style={{fontFamily: "'Orbitron', sans-serif"}} value="Orbitron, sans-serif">Orbitron</option>
                  <option style={{fontFamily: "'Pacifico', cursive"}} value="Pacifico, cursive">Pacifico</option>
                </Select>

                <Select variant="filled" placeholder="Grossura da fonte" value={textWeigh} onChange={({target}) => setTextWeigh(target.value)}>
                  <option value="normal">Normal</option>
                  <option value="bold">Grossa</option>
                  <option value="lighter">Fina</option>
                </Select>

                <Select variant="filled" placeholder="Alinhamento do texto" value={textAlign} onChange={({target}) => setTextAlign(target.value)}>
                  <option value="center">Centro</option>
                  <option value="left">Esquerda</option>
                  <option value="right">Direita</option>
                  <option value="justify">Justificado</option>
                </Select>

                <div>
                  <label htmlFor="color">Cor do Texto</label>
                  <input type="color" id="color" value={textColor} onChange={({target}) => setTextColor(target.value)} onBlur={() => handleSetColor(setUpdatedTextColor, textColor)}/>
                </div>
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
            <SimpleGrid columns={2} spacing={5}>
              <Input variant="filled" placeholder="Imagem de fundo (URL)" type="text" value={bgImage} onChange={({target}) => setBgImage(target.value)}/>
            
              <div>
                <label htmlFor="bgcolor">Cor do Fundo</label>
                <input type="color" id="bgcolor" value={bgColor} onChange={({target}) => setBgColor(target.value)} onBlur={() => handleSetColor(setUpdatedBgColor, bgColor)}/>
              </ div>
            </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={2} spacing={5}>
                <Input variant="filled" placeholder="Ícone ou Imagem (URL)" type="text" value={icon} onChange={({target}) => setIcon(target.value)}/>
                <Button onClick={() => setIsChangingIcon(!isChangingIcon)}>Posicionar o ícone</Button>
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </main>
  )
}
