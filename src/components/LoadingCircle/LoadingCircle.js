import React from 'react';
import Spinner from './Spinner';



const LoadingCircle = ({content}) => {
    return(
        <div style={spinnerCont}>
            <Spinner />
            <div style={{fontWeight:"bold"}}>Loading {content}</div>
        </div>

    )
}

const spinnerCont = {
    display : "flex",
    flexDirection : "column",
    alignItems : "center",
}

export default LoadingCircle
