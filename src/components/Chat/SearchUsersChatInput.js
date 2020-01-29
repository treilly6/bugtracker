import React from 'react';
import axios from 'axios';

import { Select, Spin } from 'antd';
const { Option } = Select;

class SearchUsersChatInput extends React.Component {

    state = {
        data: [],
        fetching: false,
    };

    constructor(props) {
        super(props);
        this.lastFetchId = 0;
    }

    fetchUser = value => {
        console.log('fetching user', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;


        this.setState({ data: [], fetching: true });
        axios.get('api/user/users', {params : {search : value}})
            .then(res => {
                if (fetchId !== this.lastFetchId) {
                  // for fetch callback order
                  return;
                }

                console.log("HERE THE RES FROM THE FETHCING OF THE USERS ", res.data.users);

                // map the users into data array
                const data = res.data.users.map(user => ({
                    // want to make text display the users name
                    text: `${user.username}`,
                    value: user.username,
                }));

                // set the state to the new search results
                this.setState({ data, fetching: false });
            })
            .catch(err => console.log(err));
    };

    handleChange = value => {

        // set the state
        this.setState({
            data: [],
            fetching: false,
        });

        // send the user values to parent element (CreateChat.js)
        this.props.sendUserValues(value);
    };

    render() {
        // pull variables out of the state
        const { fetching, data } = this.state;
        const users = this.props.users;

        console.log("HERE THE VARS FROM SEARCH USERS JS ", fetching, data, users);
        
        return (
            <Select
            mode="multiple"
            labelInValue
            value={users}
            placeholder="Select users"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            style={{ width: '100%' }}
            >
                {data.map(d => (
                  <Option key={d.value}>{d.text}</Option>
                ))}
            </Select>
        );
    }
}

export default SearchUsersChatInput;
