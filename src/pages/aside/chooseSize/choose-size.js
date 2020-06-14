import React from 'react';
import './choose-size.css'
import { connect } from 'dva'
import { Button, Tooltip } from 'antd'
class ChooseSize extends React.Component {
    select = (e) => {
        const chooseStyle = e.currentTarget.style;
        const chooseSize = e.target.innerText;
        const { dispatch } = this.props;
        dispatch({
            type: 'products/selectSize',
            payload: {
                chooseStyle,
                chooseSize
            },

        })
    }
    render() {
        const newSize = [];
        const sizeList = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
        for (let i = 0; i < 7; i++) {
            newSize.push(<Tooltip title={sizeList[i]} color="white"><Button onClick={this.select} style={{ margin: 5 }} key={(sizeList[i].id, i)} shape="circle" size="large" >{sizeList[i]}</Button></Tooltip>);
        }

        return (
            <div className="sizeBox">
                <h1 style={{ textAlign: 'left' }}>Sizes:</h1>
                <div className="sizeBtn">
                    {newSize}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(ChooseSize);