import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from './common/Table'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loading: true,
    results: []
  }

  componentDidMount() {
    this.setState({loading: true, results: []})
    fetch('https://api.myjson.com/bins/ygo8t')
      .then((results) => results.json())
      .then((results) => {
        let logged = false
        this.setState({
          results: results.map((result, i) => {
            const copy = {...result}
            copy.id = i;
            copy.heavy = [...results, results, ...results];
            copy.superHeavy = copy.heavy.map((heavy) => {
              const _copy = {...heavy};
              _copy.superHeavy = [...results];
              return _copy;
            })
            if (!logged) {
              console.log(JSON.stringify(copy))
            }
            logged = true
            return copy;
          }),
          loading: false
        })
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{padding: 100}}>
        {this.state.loading && <h2> fetching cool stufff... </h2>}
        {!this.state.loading &&
          <ComposedTable data={this.state.results} columns={columns}/>
        }
        </div>
      </div>
    );
  }
}

const columns = [
    {
        header: 'id',
        accessor: 'id',
        sortable: true,
        width: 250
    },
    {
        header: 'name',
        accessor: 'name',
        width: 250,
        sortable: true,
    },
    {
        header: 'hex',
        accessor: 'hex',
        width: 250,
        sortable: true,
    },

    {
        header: 'color',
        accessor: 'hex',
        width: 250,
        sortable: false,
        format: 'COLOR',
        styles: {display: 'flex', justifyContent: 'center'}
    },

];

const propTypes = {
    data: PropTypes.array.isRequired
};
const ComposedTable = props => (
    <div style={{minHeight: 750}}>
        <Table
            filterable
            data={props.data}
            columns={columns.map((column, i) => {
                column.id = i;
                return column;
            })}
        />
    </div>
);
ComposedTable.propTypes = propTypes;

export default App;
