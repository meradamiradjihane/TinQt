import { useTranslation } from 'react-i18next'
import H1 from './assets/homeimage/H1.webp'
import H2 from './assets/homeimage/H2.webp'
import H3 from './assets/homeimage/H3.webp'
import H4 from './assets/homeimage/H4.webp'
import H5 from './assets/homeimage/H5.png'
import H6 from './assets/homeimage/H6.webp'
import QT from './assets/homeimage/QT1.png';
import './App.css'
import { useNavigate } from 'react-router-dom'

function Histoire() {
  const { t } = useTranslation()
  const navigate = useNavigate()
 

  const stories = [
    { img: H2, title: t('stories.1'), onClick: () => navigate('/zoe') },
    { img: H1, title: t('stories.2'), onClick: () => navigate('/stella') },
    { img: H3, title: t('stories.3'), onClick: () => navigate('/nino') },
    { img: H4, title: t('stories.4'), onClick: () => navigate('/leo') },
    { img: H5, title: t('stories.5'), onClick: () => navigate('/loup') },
    { img: H6, title: t('stories.6'), onClick: () => navigate('/max') },
  ]

  return (
    <div className="App">
      
        <div className="button-grid">
          {stories.map((story, index) => (
            <button key={index} onClick={story.onClick}>
              <img src={story.img} alt={`Story ${index + 1}`} />
              <h4>{story.title}</h4>
            </button>
          ))}
        </div>
        <div className="clouds-container">
        
        <img src={QT} className="vert QT" alt="character-1" />
  
      </div>
    </div>
  )
}

export default Histoire
