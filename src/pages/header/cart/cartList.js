import React from 'react'
import { Button } from 'antd'
import './cartList.css'
import 'antd/dist/antd.css';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva'
const ButtonGroup = Button.Group;


class CarList extends React.Component {
    add = () => {
        console.log("aa")

    }
    delete() {

    }
    handleClose() {

    }

    render() {
        const { data, cartProducts } = this.props;
        return (
            <div className="cartList" >
                <img src={require(`../../../assets/products/${data.sku}_1.jpg`)} alt="" style={{ width: '80px', height: '100px' }} />
                <div className="desc">
                    <p>{data.title}</p>
                    <span>{data.size} | {data.style}</span>  <span style={{fontWeight:'100',fontSize:'16px',marginLeft:'7px'}}>X  {data.quantity}</span>
                  
                </div>
                <div className="others">
                    <div style={{ color: '#222', fontSize: '18px', fontWeight: 'bolder', marginBottom: '10px' }}>$ {data.price.toFixed(2)}</div>
                    <div>
                        <ButtonGroup>
                            <Button shape="circle" size="small" icon={<PlusOutlined />} style={{ borderRadius: 0 }} onClick={this.add} />
                            <Button shape="circle" size="small" icon={<MinusOutlined />} style={{ borderRadius: 0 }} onClick={this.delete} />
                        </ButtonGroup>
                    </div>

                </div>
            </div>

        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(CarList);