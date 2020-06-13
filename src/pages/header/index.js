import React from 'react';
import './index.css'
import { Drawer, Button, Badge, Empty, message } from 'antd'
import CarList from './cart/cartList'
// import {getProductsData} from '../../Axios'
import { connect } from 'dva'
// let success;
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'cartProducts/setStorage'
        })
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        })

    };
    checkOut = () => {
        const { dispatch } = this.props;
        let checking = true;
        dispatch({
            type: 'cartProducts/checking',
            payload: checking,

        });
    }
    success = () => {
        const { cartProducts, dispatch } = this.props;
        const sumPrice = parseFloat(cartProducts.sumPrice).toFixed(2);
        let checked = false;
        //三秒之后弹出结算信息
        setTimeout(() => {
            message.success(`成功结算￥${sumPrice}`, 3);
            dispatch({
                type: 'cartProducts/checked',
                payload: checked,

            });
        }, 3000);
        const storage = window.localStorage
        storage.setItem('data',[])
        storage.setItem("count",'0')
        storage.setItem("subTotal",'0')
        storage.setItem("sumPrice",'0')
        // window.localStorage.clear()
        
    };
    render() {
        const { cartProducts } = this.props;
        const subtotal = cartProducts.count;
        const sumPrice = parseFloat(cartProducts.sumPrice).toFixed(2);
        const checking = cartProducts.check;
        //存入storage
        const storage = window.localStorage
        let data = JSON.stringify(cartProducts.cartList)
        let _count = cartProducts.count
        let _subTotal = cartProducts.subTotal
        let _sumPrice = cartProducts.sumPrice
        storage.setItem("data", data)
        storage.setItem("count", _count)
        storage.setItem("subTotal", _subTotal)
        storage.setItem("sumPrice", _sumPrice)
        return (
            <div className="headerContent">
                <Badge count={subtotal} className="count" >
                    <img src={require("../../assets/bag-icon.png")} onClick={this.showDrawer} alt="" className="shopCar" />
                </Badge>
                <Drawer
                    title={<span> <Badge count={subtotal} className="_count"><img src={require("../../assets/bag-icon.png")} alt="" style={{ height: '50px', width: '50px' }} /></Badge>
                        <span style={{ fontSize: '25px', color: 'white', display: 'inline-block', marginLeft: '10px', verticalAlign: 'middle' }}>Cart</span></span>
                    }
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    style={{ position: 'fixed', top: '0', right: '0' }}
                    width="450px"
                    headerStyle={{ textAlign: 'center', background: '#695e45' }}
                    bodyStyle={{ background: '#b4a992', marginBottom: '160px' }}

                >
                    {
                        cartProducts.cartList.length !== 0 ?
                            cartProducts.cartList.map(item => {
                                return (<CarList data={item} key={(item.id, item.size)} />)
                            }) : <Empty />

                    }

                    <div style={{ borderTop: '1px solid white', height: '180px', width: '450px', bottom: 0, right: 0, position: 'fixed', padding: '20px', background: '#695e45' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', height: '30px' }}>
                            <p style={{ textAlign: 'left', fontSize: '25px', lineHeight: "30px" }}>SubTotal</p>
                            <div>
                                <p style={{ margin: 0, color: 'darkgoldenrod', fontSize: '24px' }}>${sumPrice}</p>
                            </div>
                        </div>
                        <div>
                            <p style={{ margin: 0, color: 'darkgoldenrod', fontSize: '24px' }}>{subtotal}  Pieces</p>
                        </div>
                        <Button
                            block
                            style={{ borderRadius: 0, background:subtotal <= 0.00? '#aaa':'#222', color: 'white', fontSize: '25px', border: 'none', height: '40px', lineHeight: '30px', marginTop: '20px' }}
                            disabled={subtotal <= 0.00 || checking === true}
                            onClick={() => { this.checkOut(); this.success() }}>
                            {checking ? <div style={{ color: '#40a9ff' }}>Checkout...</div> : <div>Checkout</div>}
                        </Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Header);