import React from 'react';
import './choose-size.css'
import { connect } from 'dva'
class ChooseSize extends React.Component {
    // state = {
    //     size: []
    // }
    select = (e) => {
        const { products, dispatch, sortProducts } = this.props;
        const chooseStyle = e.target.style;
        const chooseSize = e.target.innerText;
        const clickSize = sortProducts.clickSize;
        // const sortData = sortProducts.sortData;
        // let sumSizeId = sortProducts.sumSizeId;
        // const { size } = this.state;
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

        console.log("newResultId:", newResultId);
        if (chooseStyle.color === "white") {
            chooseStyle.background = '#ccc';
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
            console.log("66_newResult", _newResult)
            console.log("66clickSize",clickSize)
            dispatch({
                type: 'sortProducts/selectSize',
                payload: { _newResult: _newResult,clickSize:clickSize },

            })
        } else {
            //增加选中的尺码
            clickSize.push(chooseSize);
            chooseStyle.background = '#1a94bc';
            chooseStyle.color = "white";
            // if (clickSize.length === 0) {
            //     clickSize.push(...newResultId)
            // } else {
            //     sumSizeId = clickSize;
            //     sumSizeId.push(...newResultId)
            //     sumSizeId.forEach(item => {
            //         if (clickSize.indexOf(item) === -1)
            //             clickSize.push(item)
            //     })

            // }
            // let _newResult = newProducts.filter((item) => {
            //     if (clickSize.indexOf(item.id) > -1) {
            //         return item
            //     }
            // })

            newProducts.forEach(item => {
                clickSize.findIndex(_item => {
                    if (item.availableSizes.indexOf(_item) > -1) {
                        _newResult.push(item)
                    }
                    return _newResult
                })

            });
            console.log("77_newResult",_newResult)
            console.log("77clickSize",clickSize)
            dispatch({
                type: 'sortProducts/selectSize',
                payload: {
                    _newResult: _newResult,
                    clickSize: clickSize,
                },

            })
        }


    }
    render() {
        const newSize = [];
        const sizeList = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
        for (let i = 0; i < 7; i++) {
            newSize.push(<li onClick={this.select} key={sizeList[i]}>{sizeList[i]}</li>);
        }

        return (
            <div className="sizeBox">
                <h1>Sizes:</h1>
                <ul >
                    {newSize}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(ChooseSize);