import React from 'react';
import { Link } from 'react-router-dom';


export default function NotFoundPage() {
    return (
        <div style={{margin : "30px 0px", textAlign : "center"}}>
            <div>
                <h1 style={{fontSize : "2em"}}>Page Not Found</h1>
            </div>
            <div style={{margin : "15px 0px"}}>
                <div>
                    The page you requested does not exist. <Link to="/">Return to home</Link>
                </div>
            </div>
        </div>
    )
}
