import axios from 'axios';
import ServerActions from './actions/ServerActions';
import uuid from 'uuid';

const API = {
  createImage(file, origLang, transLang) {
    let data = new FormData();
    data.append('image', file);
    axios.post('/api/translateds', data)
    .then(res => {
      API.getImgTranslation(res.data.url, origLang, transLang);
      // return res.data
    })
    // .then(ServerActions.receiveOneImage)
    .catch(console.error);
  },
  getImgTranslation(imgUrl, origLang, transLang) {
    console.log('imgUrl, origLang, transLang:', imgUrl, origLang, transLang)
    axios.post(`http://api.projectoxford.ai/vision/v1.0/ocr?detectOrientation=true`, {
      'url': imgUrl
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.COMPUTER_VISION_KEY
      }
    })
      .then(res => res.data)
      .then(obj => {
        let str = obj.regions[0].lines.map(line => {
          return line.words.map(word => {
            return word.text;
          }).join(' ');
        }).join('\n');
        let firstLine = obj.regions[0].lines[0].words.map(word => {
            return word.text;
          }).join(' ');
        let newTranslation = {
          url: imgUrl,
          timestamp: Date.now(),
          language: obj.language,
          name: firstLine,
          text: str,
        }
        return newTranslation;
      })
      .then(obj => API.languageTranslation(obj, transLang))
      .catch(console.error)
  },
  languageTranslation(obj, transLang) {
    axios.get(`https://www.googleapis.com/language/translate/v2?key=${process.env.CLIENT_ID}&q=${obj.text}&source=en&target=${transLang}`)
      .then(res => res.data.data)
      .then(transObj => {
        let translatedText = transObj.translations[0].translatedText;

        let translation = {
          language: transLang,
          text: translatedText
        };

        obj.translation = translation;
        API.saveTranslationObj(obj);
      })
      .catch(console.error);
  },
  saveTranslationObj(obj) {
    axios.post('/api/translations', obj)
      .then(res => res.data)
      .then(ServerActions.receiveNewTranslation)
      .catch(console.error);
  },
  loadAllImages() {
    axios.get('/api/translations')
      .then(res => res.data)
      .then(ServerActions.receiveAllTranslations)
      .catch(console.error)
  }
};

export default API;
