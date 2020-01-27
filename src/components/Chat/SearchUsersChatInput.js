import React from 'react';
import axios from 'axios';

import { Select, Spin } from 'antd';
const { Option } = Select;

class SearchUsersChatInput extends React.Component {

    state = {
        data: [],
        value: [],
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
        this.setState({
            value,
            data: [],
            fetching: false,
        });
    };

    render() {
        const { fetching, data, value } = this.state;
        return (
            <Select
            mode="multiple"
            labelInValue
            value={value}
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
