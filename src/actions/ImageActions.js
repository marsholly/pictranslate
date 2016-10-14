import API from '../API';

const ImageActions = {
  getAllImages: API.getAllImages,
  loadAllImages: API.loadAllImages,
  createImage(file, origLang, transLang) {
    API.createImage(file, origLang, transLang);
  },
  createImageFromUrl(url, origLang, transLang) {
    API.getImgTranslation(url, origLang, transLang);
  },
  deleteImage(id){
    API.deleteImage(id);
  }
}

export default ImageActions;
