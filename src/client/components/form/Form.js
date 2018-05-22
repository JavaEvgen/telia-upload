import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class Form extends Component {
    constructor() {
        super()
        this.state = {
            files: []
        }

        //Binding function to this of component
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
        var formData = new FormData();
        formData.append("file", files[0]);
        console.log(formData)
        axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        this.setState({
            files
        });
      }

    render() {
        return (
            <div className="dropzone" >
                <Dropzone onDrop={this.onDrop}>
                    <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
            </div>
        )
    }
}

export default Form;