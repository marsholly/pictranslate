import React, { Component } from 'react';
import { AppBar, Tabs, Tab } from 'material-ui';

import RouteActions from '../actions/RouteActions';

class NavBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <AppBar
        title="PicTranslate"
        className="AppBar"
        showMenuIconButton={false}
      >
        <Tabs>
          <Tab className="Tab" label="Home" onClick={RouteActions.route.bind(null, '/')} />
          <Tab className="Tab" label="Start Translating" onClick={RouteActions.route.bind(null, '/upload')} />
          <Tab className="Tab" label="Saved Translations" onClick={RouteActions.route.bind(null, '/all-translations')} />
        </Tabs>
      </AppBar>
    );
  }
}

export default NavBar;
