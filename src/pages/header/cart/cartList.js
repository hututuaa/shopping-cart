import React from 'react'
import { Button } from 'antd'
import './cartList.css'
import 'antd/dist/antd.css';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva'
const ButtonGroup = Button.Group;


class CarList extends React.Component {

    add = (id, quantity, size) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'cartProducts/add',
            payload: {
                id: id,
                quantity: quantity + 1,
                size: size
            }
        })

    }
    delete = (id, quantity, size) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'cartProducts/delete',
            payload: {
                id: id,
                quantity: quantity - 1,
                size: size
            }
        })
    }
    remove = (id, quantity, size) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'cartProducts/remove',
            payload: {
                id: id,
                size: size,
                quantity: 0,
            }
        })
    }

    render() {
        const { data } = this.props;
        return (
            <div className="cartList" >
                <img src={require(`../../../assets/products/${data.sku}_1.jpg`)} alt="" style={{ width: '80px', height: '100px' }} />
                <div className="desc">
                    <p>{data.title}</p>
                    <span>{data.size} | {data.style}</span>  <span style={{ fontWeight: '100', fontSize: '16px', marginLeft: '7px' }}>X  {data.quantity}</span>

                </div>
                <div className="others">

                    <div style={{ color: '#222', fontSize: '18px', fontWeight: 'bolder', marginBottom: '10px' }}>
                        <span>$ {data.price.toFixed(2)}</span>
                        <span onClick={() => this.remove(data.id, data.quantity, data.size)} style={{ marginLeft: '10px', color: '#666', fontWeight: '500', cursor: 'pointer' }}>X</span>
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button shape="circle" size="small" icon={<PlusOutlined />} style={{ borderRadius: 0 }} onClick={() => this.add(data.id, data.quantity, data.size)} />
                            <Button shape="circle" size="small" icon={<MinusOutlined />} style={{ borderRadius: 0 }} onClick={() => this.delete(data.id, data.quantity, data.size)} />
                        </ButtonGroup>
                    </div>

                </div>
            </div>

        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(CarList);