import React from 'react';
import { Redirect } from 'react-router-dom';
import { addGroup } from '../services/group-service';
import { setActiveGroupId, getActiveUserClearance, getHighestGroupId } from '../helpers';

class GroupAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      group: {
        group_name: null,
        leader_name: null
      },
      data: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/allData')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else throw new Error();
      })
      .then(data => {
        this.setState({ data });
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }

  render() {
    const activeUserClearance = getActiveUserClearance();

    if (this.state.shouldRedirect) {
      return (
        <Redirect
          to={{
            pathname: '/groupEdit'
          }}
        />
      );
    }

    if (activeUserClearance !== 'admin') {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      );
    }

    return (
      <div className="container" method="post">
        <h3>
          Group Name:
        </h3>
        <input onChange={this.handleChange} className="group-add-input" name="group_name" />

        <div>
          <br />
          Leader Name:
          <input onChange={this.handleChange} className="group-add-input" name="leader_name" />
        </div>

        <button type="button" onClick={() => this.addGroup(this.state.group.group_name, this.state.group.leader_name)}>Save</button>

        {this.state.error && (
          <div id="error">
            There's been an error. Please try again.
          </div>
        )}
      </div>
    );
  }
}

export default GroupAdd;