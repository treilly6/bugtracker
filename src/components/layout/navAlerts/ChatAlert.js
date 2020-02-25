import React, {useContext} from 'react';
import { NavAlertsContext } from '../../../context/NavAlertsContext';

export default function ChatAlert() {

    const { chatCount } = useContext(NavAlertsContext);

    if(chatCount === null || chatCount === 0) {
        return null;
    } else {
        return (
            <div className="alert-circle">{chatCount}</div>
        )
    }
}
