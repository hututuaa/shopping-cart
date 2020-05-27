import React from 'react'
import './select.css'
import { Select } from 'antd';
const { Option } = Select;

export class SelectContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    handleChange = value => {
        this.setState(() => ({ value }));
    }
    onChange = () => {

    }
    onFocus = () => {

    }
    onFocus = () => {

    }
    onBlur = () => {

    }
    render() {

        return (
            <div className="selectBox">
                <div className="product-count">
                    17 product(s) found.
                </div>
                <div className="order">
                    <span style={{ display: 'inline-block', marginRight: '20px' }}>Order By</span>
                    <Select

                        style={{ width: 200, marginLeft: '10px', borderRadius: 0, color: 'black', fontSize: '18px' }}
                        placeholder="All "
                        optionFilterProp="children"
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        size='large'
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                    >

                        <Option value="Default sort">Default sort</Option>
                        <Option value="Lowest to Height">Lowest to Height</Option>
                        <Option value="Height to Lowest">Height to Lowest </Option>
                    </Select>,
                </div>
            </div>
        )
    }
}


