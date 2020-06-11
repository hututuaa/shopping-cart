import React from 'react'
import ProduceCard from './productCard/productCard.js'
import './productList.css'
import { connect } from 'dva'

class ProduceList extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'products/query',

        })
    }
    render() {
        const { products, sortProducts } = this.props;
        const productList = (sortProducts.sortData.length === 0 ? products.resData : sortProducts.sortData).map(item => {
            return <ProduceCard data={item} key={item.id} />
        })
        return (
            <div className="produceList">
                {productList}
            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(ProduceList);