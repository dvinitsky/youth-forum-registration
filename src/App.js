import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import GroupEdit from './GroupEdit';
import GroupAdd from './GroupAdd';
import Header from './Header';
import CamperEdit from './CamperEdit';
import CamperAdd from './CamperAdd';

class App extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      campers: [],
      nextGroupId: 0
    };
    this.incrementNextGroupId = this.incrementNextGroupId.bind(this);
  }

  componentWillMount() {
    fetch('/groupsAndCampers')
      .then(response => response.json())
      .then(data => {
        this.setState({
          groups: data.groups || [],
          campers: data.campers || [],
          nextGroupId: this.getHighestGroupId(data.groups) + 1
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  incrementNextGroupId() {
    this.setState({
      nextGroupId: this.state.nextGroupId + 1
    });
  }

  getHighestGroupId(groups) {
    const ids = [];
    groups.forEach(group => {
      ids.push(group.id);
    })
    return Math.max(...ids);
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path='/admin'
            render={props => <Admin {...props} groups={this.state.groups}
            />}
          />
          <Route
            path='/groupAdd'
            render={props => <GroupAdd {...props} incrementNextGroupId={this.incrementNextGroupId} nextGroupId={this.state.nextGroupId} />}
          />
          <Route
            path='/groupEdit'
            render={props => <GroupEdit {...props} campers={this.state.campers} />}
          />
          <Route
            path='/camperAdd'
            render={props => <CamperAdd {...props} groups={this.state.groups} />}
          />
          <Route
            path='/camperEdit'
            render={props => <CamperEdit {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
