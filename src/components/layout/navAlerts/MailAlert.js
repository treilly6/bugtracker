import React, { useContext } from 'react';
import { NavAlertsContext } from '../../../context/NavAlertsContext';

export default function MailAlert() {

    const { mailCount } = useContext(NavAlertsContext);

    if(mailCount === null || mailCount === 0) {
        return null;
    } else {
        return (
            <div className="alert-circle">{mailCount}</div>
        )
    }
}
