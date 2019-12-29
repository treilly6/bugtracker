import React from 'react';

class ScrollComponent extends React.Component {

    state = {
        visible : false,
    }

    ref = React.createRef();

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const observer = new IntersectionObserver(([entry]) => {
            console.log("IN THE OBSEVER HER ETHE RATIO ", entry.intersectionRatio);
            if(entry.intersectionRatio >= .05) {
                console.log("ITS VISIBLE");
                // this.props.onVisible();
                this.setState({visible : true});
            } else {
                console.log("NOT VISIBLE");
                this.setState({visible : false});
            }
        }, {root:null, threshold : .05});

        if(this.ref.current){
            observer.observe(this.ref.current)
        }
    }

    render() {
        return(
            <div ref={this.ref} className={"fade-box " + this.props.class} style={{opacity : (this.state.visible ? 1 : 0), transform : (this.state.visible ? "translateY(0em)" : "translateY(1em)"),}}>
                {this.props.children}
            </div>
        )
    }
}

export default ScrollComponent;
