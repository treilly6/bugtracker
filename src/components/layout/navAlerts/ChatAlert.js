import React, {useContext} from 'react';
import { ChatAlertsContext } from '../../../context/ChatAlertsContext';

export default function ChatAlert() {

    const { chatCount } = useContext(ChatAlertsContext);

    return (
        <div className="alert-circle">{chatCount}</div>
    )
}
