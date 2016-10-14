import React, { Component } from 'react';
import ImageActions from '../actions/ImageActions';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import DropDownMenu from 'material-ui/DropDownMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class FileUploader extends Component {
  constructor(){
    super();

    this.state = {
      file: '',
      imagePreviewURL: '',
      origLang: undefined,
      transLang: undefined,
      open1: false,
      open2: false,
      url: undefined
    }
    this._onInputChangeUrl = this._onInputChangeUrl.bind(this)
    this._onInputChangeUpload = this._onInputChangeUpload.bind(this)
    this._onSubmitUpload = this._onSubmitUpload.bind(this)
    this._onSubmitUrl = this._onSubmitUrl.bind(this)
    this.handleTouchTap1 = this.handleTouchTap1.bind(this)
    this.handleTouchTap2 = this.handleTouchTap2.bind(this)
    this.handleRequestClose1 = this.handleRequestClose1.bind(this)
    this.handleRequestClose2 = this.handleRequestClose2.bind(this)
    this.changeOrigLang = this.changeOrigLang.bind(this)
    this.changeTransLang = this.changeTransLang.bind(this)
  }

  handleTouchTap1(event) {
    event.preventDefault();

    this.setState({
      open1: true,
      anchorEl1: event.currentTarget,
    });
  };

  handleRequestClose1() {
    this.setState({
      open1: false,
    });
  };

  handleTouchTap2(event) {
    event.preventDefault();

    this.setState({
      open2: true,
      anchorEl2: event.currentTarget,
    });
  };

  handleRequestClose2() {
    this.setState({
      open2: false,
    });
  };

  _onSubmitUpload(e){
    let {file, origLang, transLang} = this.state;
    ImageActions.createImage(file, origLang, transLang);
  }

  _onSubmitUrl(e){
    let {url, origLang, transLang} = this.state;
    console.log('url:', url)
    ImageActions.createImageFromUrl(url, origLang, transLang);
  }

  _onInputChangeUpload(e){
    let reader = new FileReader();
    let file = e.target.files[0]
    reader.onloadend = () =>{
      this.setState({ file, imagePreviewURL: reader.result });
    };
    reader.readAsDataURL(file);
  }

  _onInputChangeUrl(e){
    this.setState({ url: e.target.value });
  }

  changeOrigLang(origLang) {
    this.setState({ origLang });
  }

  changeTransLang(transLang) {
    this.setState({ transLang });
  }

  render() {
    let { imagePreviewURL } = this.state;
    let ImagePreview = imagePreviewURL &&  <img src={imagePreviewURL} className="center-block img-rounded img-responsive" />

    return (
      <div>
        <div className='col-xs-12 col-md-6 uploadInput text-center'>
          <input type="file" className="btn chooseFile" onChange={this._onInputChangeUpload} />
          <RaisedButton
          onTouchTap={this._onSubmitUpload}
          label="Translate from Upload"
          secondary={true}
          className='text-center fromTo'
          />
        </div>
        <div className='col-xs-12 col-md-6 uploadInput text-center'>
          <input type="text" onChange={this._onInputChangeUrl} />
          <br/>
          <RaisedButton
          onTouchTap={this._onSubmitUrl}
          label="Translate from Url"
          secondary={true}
          className='text-center fromTo'
          />
        </div>
        <div className="text-center col-xs-12 col-md-12">
          <span>
            <RaisedButton
              onTouchTap={this.handleTouchTap1}
              label="From"
              className="fromTo"
            />
            <Popover
              open={this.state.open1}
              anchorEl={this.state.anchorEl1}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose1}
            >
              <Menu>
                <MenuItem primaryText="Auto Detect" onClick={this.changeOrigLang.bind(null, 'unk')}/>
                <MenuItem primaryText="Chinese (simplified)" onClick={this.changeOrigLang.bind(null, 'zh-Hans')}/>
                <MenuItem primaryText="Chinese (traditional)" onClick={this.changeOrigLang.bind(null, 'zh-Hant')}/>
                <MenuItem primaryText="Czech" onClick={this.changeOrigLang.bind(null, 'cs')}/>
                <MenuItem primaryText="Danish" onClick={this.changeOrigLang.bind(null, 'da')}/>
                <MenuItem primaryText="Dutch" onClick={this.changeOrigLang.bind(null, 'nl')}/>
                <MenuItem primaryText="English" onClick={this.changeOrigLang.bind(null, 'en')}/>
                <MenuItem primaryText="Finnish" onClick={this.changeOrigLang.bind(null, 'fi')}/>
                <MenuItem primaryText="French" onClick={this.changeOrigLang.bind(null, 'fr')}/>
                <MenuItem primaryText="German" onClick={this.changeOrigLang.bind(null, 'de')}/>
                <MenuItem primaryText="Greek" onClick={this.changeOrigLang.bind(null, 'el')}/>
                <MenuItem primaryText="Hungarian" onClick={this.changeOrigLang.bind(null, 'hu')}/>
                <MenuItem primaryText="Italian" onClick={this.changeOrigLang.bind(null, 'it')}/>
                <MenuItem primaryText="Japanese" onClick={this.changeOrigLang.bind(null, 'Ja')}/>
                <MenuItem primaryText="Korean" onClick={this.changeOrigLang.bind(null, 'ko')}/>
                <MenuItem primaryText="Norwegian" onClick={this.changeOrigLang.bind(null, 'nb')}/>
                <MenuItem primaryText="Polish" onClick={this.changeOrigLang.bind(null, 'pl')}/>
                <MenuItem primaryText="Portuguese" onClick={this.changeOrigLang.bind(null, 'pt')}/>
                <MenuItem primaryText="Russian" onClick={this.changeOrigLang.bind(null, 'ru')}/>
                <MenuItem primaryText="Spanish" onClick={this.changeOrigLang.bind(null, 'es')}/>
                <MenuItem primaryText="Swedish" onClick={this.changeOrigLang.bind(null, 'sv')}/>
                <MenuItem primaryText="Turkish" onClick={this.changeOrigLang.bind(null, 'tr')}/>
              </Menu>
            </Popover>
          </span>
          <span>
            <RaisedButton
              onTouchTap={this.handleTouchTap2}
              label="To"
              className="fromTo"
            />
            <Popover
              open={this.state.open2}
              anchorEl={this.state.anchorEl2}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose2}
            >
              <Menu>
                <MenuItem primaryText="English" onClick={this.changeTransLang.bind(null, 'en')}/>
                <MenuItem primaryText="French" onClick={this.changeTransLang.bind(null, 'fr')}/>
                <MenuItem primaryText="German" onClick={this.changeTransLang.bind(null, 'de')}/>
                <MenuItem primaryText="Chinese" onClick={this.changeTransLang.bind(null, 'zh')}/>
              </Menu>
            </Popover>
          </span>
        </div>
        { ImagePreview }
      </div>
    )
  }
}
