import  React, { Component } from 'react';
import NavBar from './NavBar';
import UploadPage from './UploadPage';
import ImageActions from '../actions/ImageActions';

export default class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    ImageActions.loadAllImages();
  }

  render() {
    return (
      <div>
        <NavBar/>
        {this.props.children}
      </div>
    )
  }
}
