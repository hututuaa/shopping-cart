import React from 'react'
import { ProduceCard } from './productCard/productCard.js'
import './productList.css'
import {getProductsData} from '../../../Axios'
import {connect} from 'dva'

 class ProduceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    async componentDidMount() {
        const resData =  await getProductsData();
        this.setState({
            list: resData.data.products
        })


    }
    render() {
        const { list } = this.state;
        const { products } = this.props;
        
        console.log(this.props,"oo")
  
        return (
            <div className="produceList">
                {
                    list.map(item => {
                        return <ProduceCard data={item} key={item.id} />
                    })
                }

            </div>
        )
    }
}
const mapStateToProps = ({ products, selected }) => ({
    products:products,
  })
export default connect(mapStateToProps)(ProduceList);