import React, { Component } from 'react';

class Form extends Component {

    render() {
        return (
            <div className="wrapper">
                <form method="POST" enctype="multipart/form-data" action="/upload">
                    <input type="file" id="file-upload" name="file" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Form;