import React from 'react';
import PropTypes from 'prop-types';

class AddProject extends React.Component {

    state = {
        "title" : "",
    }

    changeInput = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        var newProject = {
            "title" : this.state.title
        };

        this.props.addProject(newProject);
        this.setState({
            "title" : "",
        });
    }

    render() {
        return (
            <div>
                <h3>Add Project</h3>
                <form onSubmit={this.submit}>
                    <input type="text" name="title" value={this.state.title} onChange={this.changeInput} />
                    <button type="submit">Add Project</button>
                </form>
            </div>
        )
    }
}

const divStyle = {
    padding : "10px",
    margin : "10px",
    border : "1px solid black",
}

export default AddProject;
