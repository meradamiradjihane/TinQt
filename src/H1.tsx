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



function His1() {
  const { t } = useTranslation()
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [image, setImage] = useState(Neutre)
  const storyParagraphs = [
    { text: t('zoe.paragraph1'), emotion: 'love' },
    { text: t('zoe.paragraph2'), emotion: 'joy' },
    { text: t('zoe.paragraph3'), emotion: 'pride' },
    { text: t('zoe.paragraph4'), emotion: 'fear' },
    { text: t('zoe.paragraph5'), emotion: 'courage' },
    { text: t('zoe.paragraph6'), emotion: 'love' },
    { text: t('zoe.paragraph7'), emotion: 'love' },
    { text: t('zoe.paragraph8'), emotion: 'love' },
    { text: t('zoe.paragraph9'), emotion: 'pride' },
    { text: t('zoe.paragraph10'), emotion: 'sadness' },
    { text: t('zoe.paragraph11'), emotion: 'regret' },
    { text: t('zoe.paragraph12'), emotion: 'love' },
    { text: t('zoe.paragraph13'), emotion: 'relief' },
    { text: t('zoe.paragraph14'), emotion: 'pride' },
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
  
      switch (emotion) {
        case 'calmness':
          setImage(calm)
          break
        case 'love':
          setImage(love)
          break
        case 'joy':
          setImage(joy)
          break
        case 'fear':
          setImage(fear)
          break
        case 'anger':
          setImage(anger)
          break
        case 'excitement':
          setImage(exitment)
          break
        case 'pride':
          setImage(pride)
          break
        case 'courage':
          setImage(courage)
          break
        case 'jealousy':
          setImage(jealousy)
          break
        case 'sadness':
          setImage(sadness)
          break
        case 'anxiety':
          setImage(anxiety)
          break
        case 'shame':
          setImage(shame)
          break
        case 'regret':
          setImage(regret)
          break
        case 'relief':
          setImage(relif)
          break
        default:
          setImage(Neutre)
      }
      
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
    setImage(Neutre)  // Réinitialiser l'image avant de commencer à lire
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
      <h1>{t('zoe.title')}</h1>

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

      {storyParagraphs.map(({ text, emotion }, index) => (
        <p key={index} style={emotion === 'joy' ? { fontStyle: 'italic' } : {}}>
          {text}
        </p>
      ))}
      <div className="clouds-container" >
        <img
          src={image}
          alt="Emotion"className="vert QTH"
        />
      </div>
    </div>
  )
}

export default His1
