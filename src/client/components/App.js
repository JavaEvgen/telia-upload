import React, { Component } from 'react';
import Form from './form/Form';
import axios from 'axios';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      items: []
    };
    //Binding functions to component's this
    this.fetchFiles = this.fetchFiles.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  componentDidMount() {
    this.fetchFiles();
  }

  fetchFiles() {
    this.setState({
      isLoaded: false
    });
    axios.get('/list')
    .then((response) => {
      var items = response.data.entries;
      //Wait for all nested calls to finish
      return Promise.all(items.map((item, index) => {
        return axios.get('/download'+ item.path_lower)
          .then((response) => {
            item.link = response.data;
            return item
          });
      }));     
    })
    //Pass a callback to update state
    .then(items => this.setState(prevState => ({
        isLoaded: true,
        items: items
      })))
    .catch((error) => {
      console.log(error);
    })
  }

  deleteFile(item) {
    this.setState({
      isLoaded: false
    });
    axios.get('/delete'+ item.path_lower)
    .then((response) => {
      //Not the right, but the easiest way to get state updated after deleting a file
      //I'll refactore this if I'll have a time
      this.fetchFiles()
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div className="loading"><i className="fa fa-sync-alt"></i></div>;
    } else {
      return (
        <div className="container">
          <Form fetchFiles={this.fetchFiles}/>
          <h1>Your uploaded files</h1>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <a href={item.link}>{item.name}</a>
                <span className="delete" onClick={() => this.deleteFile(item)}>
                  <i className="fa fa-times"></i>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;