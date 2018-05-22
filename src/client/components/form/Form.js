import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Form.css';
import axios from 'axios';

class Form extends Component {
    constructor() {
        super();
        //Binding function to this of component
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
        var formData = new FormData();
        formData.append("file", files[0]);
        axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            //Not the right, but the easiest way to get state updated after uploading a file
            //I'll refactore this if I'll have a time
            this.props.fetchFiles();
        })
    }

    render() {
        return (
            <div className="dropzone">
                <Dropzone onDrop={this.onDrop} className="dropzone__drop-area">
                    <p>Try dropping one file here, or click to select it to upload.</p>
                </Dropzone>
            </div>
        )
    }
}

export default Form;