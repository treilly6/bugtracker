import React from 'react';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {

    state = {
        "title" : ""
    }

    submit = (e) => {
        e.preventDefault();
        console.log(this.state.title);
        var folder = {
            "title" : this.state.title,
        };
        this.props.addFolder(folder);
        this.setState({"title":""});
        console.log("IN THE SUBMIT");
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value });
        console.log(e.target.name);
    }


    render() {
        return (
            <div>
                <h6>ADD FOLDER</h6>
                <form onSubmit={this.submit}>
                    <input type="text" name="title" value={this.state.title} onChange={this.changeInput} placeholder="Folder Title" />
                    <button>Add Folder</button>
                </form>
            </div>
        )
    }
}

export default AddFolder;
