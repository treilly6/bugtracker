import React from 'react';

class CommentAuthor extends React.Component {
    state = {}

    componentDidMount(){
        console.log("COMMENT AUTHOR PROPS");
        console.log(this.props);
    }

    render(){
        var author = this.props.author;
        var date = this.props.date;

        return(
            <div className="postAuthorCont">
                <div style={{padding : "10px"}}>
                    <div>Posted {date}</div>
                    <div>{author}</div>
                </div>
            </div>
        )
    }
}

export default CommentAuthor;
