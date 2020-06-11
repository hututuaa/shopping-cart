import React from 'react';
import './herader.css'
import { Drawer, Button, Badge } from 'antd'
import CarList from './cart/cartList'
// import {getProductsData} from '../../Axios'
import { connect } from 'dva'
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            // list: []
        }
    }
    // async componentDidMount() {
    //     const resData = await getProductsData();
    //     this.setState({
    //         list: resData.data.products
    //     })


    // }
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
    render() {
        const {cartProducts} = this.props;
        return (
            <div className="headerContent">
                <Badge count={5} className="count" >
                    <img src={require("../../assets/bag-icon.png")} onClick={this.showDrawer} alt="" className="shopCar" />
                </Badge>
                <Drawer
                    title={<span> <Badge count={5} className="count"><img src={require("../../assets/bag-icon.png")} alt="" style={{ height: '50px', width: '50px' }} /></Badge>
                    <span style={{ fontSize: '25px', color: 'white', display: 'inline-block', marginLeft: '10px', verticalAlign: 'middle' }}>Cart</span></span>}
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
                    {cartProducts.cartList.map(item => {
                        return (<CarList data={item} key={item.id} />)
                    })
                    }

                    <div style={{ borderTop: '1px solid white', height: '160px', width: '450px', bottom: 0, right: 0, position: 'fixed', padding: '20px', background: '#695e45' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                            <p style={{ textAlign: 'left', fontSize: '25px', }}>SubTotal</p>
                            <div>
                                <p style={{ margin: 0, color: 'darkgoldenrod', fontSize: '24px' }}>$2222</p>
                                <p style={{ margin: 0 }}>OR UP TO 3 x $</p>
                            </div>
                        </div>
                        <Button
                            block
                            style={{ borderRadius: 0, background: '#222', color: 'white', fontSize: '25px', border: 'none', height: '40px', lineHeight: '40px', marginTop: '20px' }}
                        >
                            CheckOut
                       </Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Header);