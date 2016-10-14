import React, { Component } from 'react';
import ImageActions from '../actions/ImageActions';
import TranslatedStore from '../stores/TranslatedStore';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class TranslationView extends Component {
  constructor(props){
    super(props);

    this.state = {
      transaction: TranslatedStore.getTranslation(props.params.id),
      open: false
    }
    this._onChange = this._onChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    TranslatedStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TranslatedStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ transaction: TranslatedStore.getTranslation(this.props.params.id) });
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  render() {

    let { transaction } = this.state;
    let { name, url, timestamp, language, text, translation } = transaction;

    return (
      <div>
        <h1 className='text-center'>{name}</h1>
        <div className="col-xs-12 col-md-3">
          <img src={url} className='viewThumbnail' onClick={this.handleOpen}/>
          
        </div>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <img src={url}/>
        </Dialog>
      </div>
    )
  }
}
