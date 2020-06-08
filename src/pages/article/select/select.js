import React from 'react'
import './select.css'
import { Select } from 'antd';
import { connect } from 'dva'
const { Option } = Select;

class SelectContent extends React.Component {

    state = {
        value: ''
    }

    componentDidMount() {


    }

    onChange = (value) => {
        const { dispatch } = this.props
        dispatch({
            type: 'sortProducts/sort',
            payload: { value: value },

        })
    }
    render() {
        const { products, sortProducts } = this.props;
        console.log(sortProducts.sortData, "the choose")
        return (
            <div className="selectBox">
                <div className="product-count">
                    {sortProducts.sortData.length === 0 ? products.resData.length : sortProducts.sortData.length} product(s) found.
                </div>
                <div className="order">
                    <span style={{ display: 'inline-block', marginRight: '20px' }}>Order By</span>
                    <Select

                        style={{ width: 200, marginLeft: '10px', borderRadius: 0, color: 'black', fontSize: '18px' }}
                        placeholder="Default sort "
                        optionFilterProp="children"
                        onChange={this.onChange}
                        size='large'
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                    >
                        <Option value="Default">Default sort</Option>
                        <Option value="L-t-H">Lowest to Height</Option>
                        <Option value="H-t-L">Height to Lowest </Option>
                    </Select>,
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(SelectContent);
