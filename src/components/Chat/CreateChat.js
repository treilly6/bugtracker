import React from 'react';
import '../../App.css';

class CreateChat extends React.Component {
    state = {
        recipients : '',
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){}

    submit = (e) => {
        e.preventDefault();

    }

    changeInput = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }
    render(){
        return(
            <div>
                <div>Separate usernames by a comma to add multiple recipients</div>
                <form>
                    <div className="inputCont">
                        <input className="formInput" type="text" name="recipients" value={this.state.recipients} onChange={this.changeInput} placeholder="Enter Recipients" />
                        <button className="plusButton" type="submit">+</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default CreateChat;
