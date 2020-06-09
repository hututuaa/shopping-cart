import React from 'react';
import './choose-size.css'
import { connect } from 'dva'
class ChooseSize extends React.Component {
    select = (e) => {
        const { products, dispatch,sortProducts} = this.props;
        const chooseStyle = e.target.style
        const chooseSize = e.target.innerText;
        let newResultId = [];
        let _newResult = [];
        const newProducts = products.resData;
        console.log("newProducts:", newProducts)
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

    
            // newResultId.forEach((_item => {
            //     newProducts.splice(newProducts.findIndex(item => item.id === _item), 1)

            // }))
            _newResult = newProducts;
            console.log("66:",_newResult)
            dispatch({
                type: 'sortProducts/selectSize',
                payload: { _newResult: _newResult},

            })
        }else{
            chooseStyle.background = '#1a94bc';
            chooseStyle.color = "white";
            _newResult = newProducts.filter((item) => {
                if (item.availableSizes.indexOf(chooseSize) > -1) {
                    return item
                }
            })
            console.log("77:",_newResult)
            dispatch({
                type: 'sortProducts/selectSize',
                payload: { _newResult: _newResult },

            })
        }


    }
    render() {
        return (
            <div className="sizeBox">
                <h1>Sizes:</h1>
                <ul >
                    <li onClick={this.select}>XS</li>
                    <li onClick={this.select}>S</li>
                    <li onClick={this.select}>M</li>
                    <li onClick={this.select}>ML</li>
                    <li onClick={this.select}>L</li>
                    <li onClick={this.select}>XL</li>
                    <li onClick={this.select}>XXL</li>
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(ChooseSize);