import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveNewTranslation(newTranslation) {
    console.log('HELLOOOOO')
    AppDispatcher.dispatch({
      type: 'RECEIVE_NEW_TRANSACTION',
      payload: { newTranslation }
    })
  },
  receiveImages(images) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_IMAGES',
      images
    })
  },
  receiveOneImage(image) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ONE_IMAGE',
      image
    })
  },
  receiveAllTranslations(transactions) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ALL_IMAGES',
      payload: { transactions }
    })
  }
}

export default ServerActions;
