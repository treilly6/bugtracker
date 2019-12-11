import React from 'react';
import PropTypes from 'prop-types';
import '../../../../App.css';

class AddFolder extends React.Component {

    state = {
        "title" : "",
        showForm : false,
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

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm});
    }


    render() {
        return (
            <div>
                <button className="toolbar-button" onClick={this.toggleForm}>Add Folder</button>
                <div style={{display : this.state.showForm ? "block" : "none"}}>
                    <form onSubmit={this.submit}>
                        <input type="text" name="title" value={this.state.title} onChange={this.changeInput} placeholder="Folder Title" />
                        <button>Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddFolder;
