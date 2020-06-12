import React from 'react'
import { Card, Button, Popover, List } from 'antd';
import { connect } from 'dva'
import '../productList.css'
const { Meta } = Card;

class ProduceCard extends React.Component {
  addToCart = (id, size) => {
    const { dispatch, products, cartProducts } = this.props
    let _products = [];
    let resData = JSON.parse(JSON.stringify(products.resData))
    let cartList = cartProducts.cartList;
    if (cartList.length !== 0) {
      let cartLength = cartList.length
      for (let index = 0; index < cartLength + 1; index++) {
        let _item = cartList[index]
        if (index < cartList.length) {
          if (typeof (_item.size) !== "undefined" && _item.size === size) {
            cartList[index].quantity += 1;
            break;
          }
        } else {
          resData.forEach(__item => {
            if (__item.id === id && __item.availableSizes.includes(size)) {
              var data = {};
              data = JSON.parse(JSON.stringify(__item));
              data.size = size;
              data.quantity = 1;
              cartList.push(data)
            }
          })
        }
      }
    } else {
      resData.forEach(item => {
        if (item.id === id && item.availableSizes.includes(size)) {
          var data = {};
          data = JSON.parse(JSON.stringify(item));
          data.size = size;
          data.quantity = 1;
          cartList.push(data)
        }
      })
    }
    _products = cartList
    dispatch({
      type: 'cartProducts/cart',
      payload: {
        _products
      }

    })
    // dispatch({
    //   type: 'cartProducts/checkOut',
    // })

  }

  render() {
    const { data } = this.props
    return (
      <Card
        hoverable='true'
        style={{ width: '263px', padding: '10px', border: 'none', cursor: 'inherit', position: 'relative', margin: '5px 5px' }}

        cover={<img alt={data.key} src={require(`../../../../assets/products/${data.sku}_1.jpg`)} />}
      >
        <div style={{ fontSize: '12px', position: 'absolute', right: 10, top: 10, background: 'black', color: 'white', padding: '0 2px', borderRadius: '2px' }}>{data.isFreeShipping ? 'Free Shipping' : ''}</div>
        <Meta title={data.title} style={{ margin: '10px 0', textAlign: 'center' }} />
        <p style={{ fontWeight: '600', textAlign: 'center', marginBottom: 0, fontSize: '18px' }}>${data.price.toFixed(2)}</p>
        <p style={{ fontWeight: '500', textAlign: 'center', marginBottom: '10px' }}>or {data.installments} x ${(data.price / data.installments).toFixed(2)}</p>
        <Popover
          className="cardStyle"
          content={
            <List
              size="large"
              dataSource={data.availableSizes}
              renderItem={_item => <List.Item>
                <Button onClick={() => this.addToCart(data.id, _item)} block>{_item}</Button>
              </List.Item>}
            />
          }
          title="Selective size"
          trigger="click">
          <Button
            type="primary"
            style={{ height: '40px', width: '218px', border: 'none', borderRadius: 0, background: 'black', fontSize: '18px' }}
          // onClick={this.addToCart}
          >
            Add To Cart
           </Button>
        </Popover>

      </Card>
    )
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(ProduceCard);
