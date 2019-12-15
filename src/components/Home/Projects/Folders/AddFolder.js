import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../../MessageBox';
import '../../../../App.css';

class AddFolder extends React.Component {

    state = {
        "title" : "",
        showForm : false,
        submitAttempt : 0,
        message : '',
    }

    constructor(props){
        super(props);
        console.log("ADD FOLER CONTRUCTOR");
        console.log(props);
    }

    submit = async (e) => {
        e.preventDefault();
        console.log(this.state.title);
        var folder = {
            "title" : this.state.title,
        };
        var message = await this.props.addFolder(folder);
        console.log("ADDFOLDER JS RESULT OF FUCN");
        console.log(message);
        this.setState({"title":"", message : message, submitAttempt : this.state.submitAttempt + 1});
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
        console.log("RENDERING THE ADD FODLER");
        console.log(this.props);
        return (
            <div className={"toolbar-header " + (this.props.tool === "folders" ? "toolbar-selected" : "")}>
                <div style={{textAlign:"center"}} onClick={() => this.props.selectTool("folders")}>Add Folder</div>
                <div>
                    <MessageBox key={this.state.submitAttempt} message={this.state.message} />
                    <div className="itemBorder itemAbsolute" style={{display : this.props.tool === "folders" ? "block" : "none", width : "100%"}}>
                        <form style={formStyle} onSubmit={this.submit}>
                            <div className="inputCont">
                                <input className="formInput" type="text" name="title" value={this.state.title} onChange={this.changeInput} placeholder="Folder Title" />
                                <button>+</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const formStyle = {
    padding : "10px",
};

export default AddFolder;
