import React from 'react'
import { Button } from 'antd'
import './cartList.css'
const ButtonGroup = Button.Group;

export class CarList extends React.Component {
    add() {

    }
    delete() {

    }
    handleClose() {

    }

    render() {
        const { data } = this.props;
        console.log(data, "yyyyy")
        return (
            <div className="cartList" >

                <img src={require(`../../../assets/products/${data.sku}_1.jpg`)} alt="" style={{ width: '80px', height: '100px' }} />
                <div className="desc">
                    <p>{data.title}</p>
                    <p>{data.availableSizes.map(res => (res + ' '))} | {data.style}</p>
                    <p>Quantity: {data.quantity}</p>
                </div>
                <div className="others">
                    <div style={{ color: '#222', fontSize: '18px', fontWeight: 'bolder', marginBottom: '10px' }}>$ {data.price.toFixed(2)}</div>
                    <div>
                        <ButtonGroup>
                            <Button type="primary" size="small" icon="minus" style={{ borderRadius: 0 }} onClick={this.add} />
                            <Button type="primary" size="small" icon="plus" style={{ borderRadius: 0 }} onClick={this.delete} />
                        </ButtonGroup>
                    </div>

                </div>
            </div>

        )
    }
}
