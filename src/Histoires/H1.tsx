import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { useRef, useState } from 'react'
import love from '../assets/emotion/amour.png'
import calm from '../assets/emotion/calm.png'
import joy from '../assets/emotion/joy.png'
import anger from '../assets/emotion/colere.png'
import fear from '../assets/emotion/peur.png'
import excitement from '../assets/emotion/exitement.png'
import neutral from '../assets/homeimage/QT1.png'
import pride from '../assets/emotion/pride.png'
import courage from '../assets/emotion/courageux.png'
import jealousy from '../assets/emotion/jaloue.png'
import sadness from '../assets/emotion/triste.png'
import anxiety from '../assets/emotion/anxieux.png'
import shame from '../assets/emotion/honte.png'
import regret from '../assets/emotion/regret.png'
import relief from '../assets/emotion/soulagement.png'
import zoe from '../assets/character/Zoe_la_souris.png'



function His1() {

  const { t } = useTranslation()
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [image, setImage] = useState(neutral)
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number | null>(null)
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([])


  const emotionImages: Record<string, string> = {
    calmness: calm,
    love: love,
    joy: joy,
    fear: fear,
    anger: anger,
    excitement: excitement,
    pride: pride,
    courage: courage,
    jealousy: jealousy,
    sadness: sadness,
    anxiety: anxiety,
    shame: shame,
    regret: regret,
    relief: relief,
    neutral: neutral,
  }
  const storyParagraphs = Array.from({ length: 14 }, (_, i) => ({
    text: t(`zoe.paragraph${i + 1}`),
    emotion: t(`zoe.emotion${i + 1}`),
  }));
  
  let currentIndex = 0
  const speakNext = () => {
    if (currentIndex >= storyParagraphs.length) {
      setIsSpeaking(false)
      setIsPaused(false)
      setCurrentParagraphIndex(null)
      return
    }
  
    const { text, emotion } = storyParagraphs[currentIndex]
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = i18n.language === 'fr' ? 'fr-FR' : 'en-US'
  
    setCurrentParagraphIndex(currentIndex)
  
    setTimeout(() => {
      paragraphRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 100)
  
    speechSynthesis.speak(utterance)
  
    utterance.onend = () => {
      const imageToShow = emotionImages[emotion] || neutral
      setImage(imageToShow)
      currentIndex++
      speakNext()
    }
  }
  

  const speakStory = () => {
    if (speechSynthesis.speaking || speechSynthesis.paused) {
      speechSynthesis.cancel()
    }

    currentIndex = 0
    setIsSpeaking(true)
    setIsPaused(false)
    setImage(neutral)
    speakNext()
  }

  const pauseSpeech = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause()
      setIsPaused(true)
    }
  }

  const resumeSpeech = () => {
    speechSynthesis.resume()
    setIsPaused(false)
  }

  const stopSpeech = () => {
    if (speechSynthesis.speaking || speechSynthesis.paused) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsPaused(false)
    }
  }

  return (
    <div>
      <div style={{ marginTop: '7rem',marginBottom:'2rem' }}>
      <h1>{t("zoe.title")}</h1>
      
        <button onClick={speakStory} style={{ marginRight: '1rem' }}>
          🔊 {i18n.language === 'fr' ? 'Écouter l’histoire' : 'Listen to the story'}
        </button>
        {isSpeaking && !isPaused && (
          <button onClick={pauseSpeech} style={{ marginRight: '1rem' }}>
            ⏸️ {i18n.language === 'fr' ? 'Pause' : 'Pause'}
          </button>
        )}
        {isSpeaking && isPaused && (
          <button onClick={resumeSpeech} style={{ marginRight: '1rem' }}>
            ▶️ {i18n.language === 'fr' ? 'Reprendre' : 'Resume'}
          </button>
        )}
        {isSpeaking && (
          <button onClick={stopSpeech}>
            ⏹️ {i18n.language === 'fr' ? 'Arrêter' : 'Stop'}
          </button>
        )}
      </div>
    <div className='histoire'>
      
  
      
  
      {storyParagraphs.map(({ text }, index) => (
        <p
          key={index}
          ref={(el) => (paragraphRefs.current[index] = el)}  
          style={{
            fontWeight: currentParagraphIndex === index ? 'bold' : 'normal',
            fontSize: currentParagraphIndex === index ? '1.4rem' : '1rem',
            backgroundColor: currentParagraphIndex === index ?'#FDE3DF': 'transparent',
            padding: '0.5rem',
            borderRadius: '8px',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {text}
        </p>
      ))}
  
      <div className="clouds-container">
        <img src={image}  className="vert QTH" />
        <img src={zoe}  className="vert zoe" />
      </div>
    </div>
    </div>
  )
  
  
}

export default His1
