import React from 'react';
import './choose-size.less'
import { connect } from 'dva'
import { Button, Tooltip } from 'antd'
class ChooseSize extends React.Component {
    select = (e) => {
        const { products, dispatch, sortProducts } = this.props;
        const chooseStyle = e.currentTarget.style;
        const chooseSize = e.target.innerText;
        const clickSize = sortProducts.clickSize;
        let newResultId = [];
        let _newResult = [];
        let filterResult = [];
        const newProducts = products.resData;
        newProducts.forEach(item => {
            if (item.availableSizes.indexOf(chooseSize) > -1) {
                newResultId.push(item.id)
                return item.id
            }
        });
        if (chooseStyle.color === "white") {
            chooseStyle.background = 'white';
            chooseStyle.color = '#666';
            //取消选中的尺码
            clickSize.splice(clickSize.findIndex(v => v === chooseSize), 1)
            //由选中的尺码从全部的数据中去筛选取值
            newProducts.forEach(item => {
                clickSize.findIndex(_item => {
                    if (item.availableSizes.indexOf(_item) > -1) {
                        _newResult.push(item)
                    }
                    return _newResult
                })

            });
            function unique(arr) {
                return Array.from(new Set(arr))
            }

            _newResult = unique(_newResult)
            dispatch({
                type: 'sortProducts/selectSize',
                payload: { _newResult: _newResult, clickSize: clickSize, sumProducts: newProducts },

            })
        } else {
            //增加选中的尺码
            clickSize.push(chooseSize);
            chooseStyle.background = '#1a94bc';
            chooseStyle.color = "white";
            //拿到所有的尺码对应的数据（未去重）
            newProducts.forEach(item => {
                clickSize.forEach(_item => {
                    if (item.availableSizes.indexOf(_item) > -1) {
                        filterResult.push(item)
                    }
                })

            });
            //去重
            function unique(arr) {
                return Array.from(new Set(arr))
            }
            _newResult = unique(filterResult)
            dispatch({
                type: 'sortProducts/selectSize',
                payload: {
                    _newResult: _newResult,
                    clickSize: clickSize,
                    // sumProducts: newProducts
                },

            })
        }


    }
    render() {
        const newSize = [];
        const sizeList = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
        for (let i = 0; i < 7; i++) {
            newSize.push(<Tooltip title={sizeList[i]} color="white"><Button onClick={this.select} style={{ margin: 5 }} key={sizeList[i].id+i} shape="circle" size="large" >{sizeList[i]}</Button></Tooltip>);
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