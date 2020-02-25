import React, { useContext } from 'react';
import { MailAlertsContext } from '../../../context/MailAlertsContext';

export default function MailAlert() {

    const { mailCount } = useContext(MailAlertsContext);

    return (
        <div className="alert-circle">{mailCount}</div>
    )
}
