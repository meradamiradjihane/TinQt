import { useTranslation } from 'react-i18next'
import i18n from './i18n'
import { useRef, useState } from 'react'
import love from './assets/emotion/amour.png'
import calm from './assets/emotion/calm.png'
import joy from './assets/emotion/joy.png'
import anger from './assets/emotion/colere.png'
import fear from './assets/emotion/peur.png'
import exitment from './assets/emotion/exitement.png'
import Neutre from './assets/homeimage/QT1.png'
import pride from './assets/emotion/pride.png'
import courage from './assets/emotion/courageux.png'
import jealousy from './assets/emotion/jaloue.png'
import sadness from './assets/emotion/triste.png'
import anxiety from './assets/emotion/anxieux.png'
import shame from './assets/emotion/honte.png'
import regret from './assets/emotion/regret.png'
import relif from './assets/emotion/soulagement.png'

function His5() {
  const { t } = useTranslation()
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [image, setImage] = useState(Neutre)

  const emotionImages: Record<string, string> = {
    calmness: calm,
    love: love,
    joy: joy,
    fear: fear,
    anger: anger,
    excitement: exitment,
    pride: pride,
    courage: courage,
    jealousy: jealousy,
    sadness: sadness,
    anxiety: anxiety,
    shame: shame,
    regret: regret,
    relief: relif,
    neutral: Neutre,
  }

  const storyParagraphs = [
    { text: t("wolf.paragraph1"), emotion: t("wolf.emotion1") },
    { text: t("wolf.paragraph2"), emotion: t("wolf.emotion2") },
    { text: t("wolf.paragraph3"), emotion: t("wolf.emotion3") },
    { text: t("wolf.paragraph4"), emotion: t("wolf.emotion4") },
    { text: t("wolf.paragraph5"), emotion: t("wolf.emotion5") },
    { text: t("wolf.paragraph6"), emotion: t("wolf.emotion6") },
    { text: t("wolf.paragraph7"), emotion: t("wolf.emotion7") },
    { text: t("wolf.paragraph8"), emotion: t("wolf.emotion8") },
    { text: t("wolf.paragraph9"), emotion: t("wolf.emotion9") },
    { text: t("wolf.paragraph10"), emotion: t("wolf.emotion10") },
    { text: t("wolf.paragraph11"), emotion: t("wolf.emotion11") },
    { text: t("wolf.paragraph12"), emotion: t("wolf.emotion12") },
    { text: t("wolf.paragraph13"), emotion: t("wolf.emotion13") },
    { text: t("wolf.paragraph14"), emotion: t("wolf.emotion14") },
    { text: t("wolf.paragraph15"), emotion: t("wolf.emotion15") },
    { text: t("wolf.paragraph16"), emotion: t("wolf.emotion16") },
    { text: t("wolf.paragraph17"), emotion: t("wolf.emotion17") },
    { text: t("wolf.paragraph18"), emotion: t("wolf.emotion18") },
    { text: t("wolf.paragraph19"), emotion: t("wolf.emotion19") },
    { text: t("wolf.paragraph20"), emotion: t("wolf.emotion20") },
    { text: t("wolf.paragraph21"), emotion: t("wolf.emotion21") },
    { text: t("wolf.paragraph22"), emotion: t("wolf.emotion22") },
    { text: t("wolf.paragraph23"), emotion: t("wolf.emotion23") },
    { text: t("wolf.paragraph24"), emotion: t("wolf.emotion24") },
    { text: t("wolf.paragraph25"), emotion: t("wolf.emotion25") },
    { text: t("wolf.paragraph26"), emotion: t("wolf.emotion26") },
    { text: t("wolf.paragraph27"), emotion: t("wolf.emotion27") },
    { text: t("wolf.paragraph28"), emotion: t("wolf.emotion28") },
    { text: t("wolf.paragraph29"), emotion: t("wolf.emotion29") },
    { text: t("wolf.paragraph30"), emotion: t("wolf.emotion30") },
    { text: t("wolf.paragraph31"), emotion: t("wolf.emotion31") },
    { text: t("wolf.paragraph32"), emotion: t("wolf.emotion32") },
    { text: t("wolf.paragraph33"), emotion: t("wolf.emotion33") },
    { text: t("wolf.paragraph34"), emotion: t("wolf.emotion34") },
    { text: t("wolf.paragraph35"), emotion: t("wolf.emotion35") },
    { text: t("wolf.paragraph36"), emotion: t("wolf.emotion36") },
    { text: t("wolf.paragraph37"), emotion: t("wolf.emotion37") },
    { text: t("wolf.paragraph38"), emotion: t("wolf.emotion38") },
    { text: t("wolf.paragraph39"), emotion: t("wolf.emotion39") },
    { text: t("wolf.paragraph40"), emotion: t("wolf.emotion40") },
    { text: t("wolf.paragraph41"), emotion: t("wolf.emotion41") },
    { text: t("wolf.paragraph42"), emotion: t("wolf.emotion42") },
    { text: t("wolf.paragraph43"), emotion: t("wolf.emotion43") },
    { text: t("wolf.paragraph44"), emotion: t("wolf.emotion44") },
    { text: t("wolf.paragraph45"), emotion: t("wolf.emotion45") },
  ]

  let currentIndex = 0

  const speakNext = () => {
    if (currentIndex >= storyParagraphs.length) {
      setIsSpeaking(false)
      setIsPaused(false)
      return
    }

    const { text, emotion } = storyParagraphs[currentIndex]
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = i18n.language === 'fr' ? 'fr-FR' : 'en-US'
    speechSynthesis.speak(utterance)

    utterance.onend = () => {
      const imageToShow = emotionImages[emotion] || Neutre
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
    setImage(Neutre)
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
    <div style={{ padding: '5rem', maxWidth: '700px', margin: 'auto' }}>
      <h1>{t("wolf.title")}</h1>

      <div style={{ marginBottom: '1rem' }}>
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

      {storyParagraphs.map(({ text }, index) => (
        <p key={index}>{text}</p>
      ))}
      <div className="clouds-container">
        <img src={image}  className="vert QTH" />
      </div>
    </div>
  )
}

export default His5
