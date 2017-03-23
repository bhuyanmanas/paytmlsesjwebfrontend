import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logoutAllDevicesThroughSocket } from '../../../web-mobile-common/access/authentication/actionGenerators';
import { emptyMapStateToProps } from '../../../web-mobile-common/common/misc';

class LogoutAllDevices extends Component {
    constructor(props) {
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount() {
        this.props.logoutAllDevicesThroughSocket();
    }

    render() {
        return (
          <div className="container">
              <div className="row main">
                  <div className="col-md-4 col-md-offset-4">
                    <h1 className="title">Logged Out</h1>
                    <p>You are now logged out.</p>
                  </div>
              </div>
          </div>
        );
    }
}

export default connect(emptyMapStateToProps, { logoutAllDevicesThroughSocket })(LogoutAllDevices)
