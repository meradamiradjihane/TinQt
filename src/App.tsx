import './App.css';
import Histoire from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import cloud from './assets/homeimage/cloud1.png';
import arbre from './assets/homeimage/arbre.png';
import arbre2 from './assets/homeimage/arbre2.png';
import herbe from './assets/homeimage/herbe.png';
import QT2 from './assets/homeimage/QT2.png';
import His1 from './Histoires/H1';
import logo from './assets/homeimage/Logo.png'
import franceFlag from './assets/homeimage/Flag_of_France.png' 
import ukFlag from './assets/homeimage/Flag_of_the_United_Kingdom.png'
import His5 from './Histoires/H5';
import His2 from './Histoires/H2';
import His3 from './Histoires/H3';
import His4 from './Histoires/H4';
import His6 from './Histoires/H6';
import { useTranslation } from 'react-i18next';
function App() {
    const { t, i18n } = useTranslation()
  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(newLang)
  }
  const cloudClasses = [
    'cloud-top-left',
    'cloud-top-right',
    'cloud-center',
    'cloud-haut-right',
    'cloud-haut-left',
  ];

  const herbeClasses = [
    'herbe',
    'herbe1',
    'herbe2',
    'herbe3',
    'herbe4',
    'herbe5',
    'herbe6',
    'herbe7',
  ];


  return (
    <div className="app">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />

        <button className="switchlanguage" onClick={toggleLanguage}>
          <img
            src={i18n.language === 'fr' ? franceFlag : ukFlag}
            alt="language flag"
            className="flag-icon"
          />
          {t('changeLanguage')}
        </button>
      </header>
      <div className="clouds-container">
        {cloudClasses.map((cls, i) => (
          <img key={`cloud-${i}`} src={cloud} className={`cloud ${cls}`} alt={`cloud-${i}`} />
        ))}
        <img src={arbre} className="vert arbre" alt="tree-1" />
        <img src={arbre2} className="vert arbre2" alt="tree-2" />
        {herbeClasses.map((cls, i) => (
          <img key={`herbe-${i}`} src={herbe} className={`vert ${cls}`} alt={`grass-${i}`} />
        ))}
        
        <img src={QT2} className="vert QT2" alt="character-2" />
      </div>
      <Router>
      <Routes>
        <Route path="/" element={<Histoire />} />
        <Route path="/zoe" element={<His1 />} />
        <Route path="/stella" element={<His2 />} />
        <Route path="/nino" element={<His3/>} />
        <Route path="/leo" element={<His4 />} />
        <Route path="/loup" element={<His5 />} />
        <Route path="/max" element={<His6 />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
