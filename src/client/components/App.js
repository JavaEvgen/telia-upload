import React, { Component } from 'react';
import Form from './form/Form';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: []
    };
    //Binding fetch function to component's this
    this.fetchFiles = this.fetchFiles.bind(this);
  }

  componentDidMount() {
    this.fetchFiles();
  }

  fetchFiles() {
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

  render() {
    const { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <Form />
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;