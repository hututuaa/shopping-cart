import React from 'react'
import { Card, Button, Popover, List } from 'antd';
import { connect } from 'dva'
const { Meta } = Card;
class ProduceCard extends React.Component {
  addToCart = (id, size) => {
    const { dispatch, products, cartProducts } = this.props
    let _products = [];
    console.log(  cartProducts.cartList,"  cartProducts.cartList")
    products.resData.forEach(item => {
      if (item.id === id && item.availableSizes.includes(size)) {
        cartProducts.cartList.forEach(_item => {
          if (size in _item) {
            item.quantity += 1;
          }else{
            item.size = size;
            item.quantity = 1;
          }
        })
        _products.push(item);
      }

    })
    console.log("_products:", _products)
    dispatch({
      type: 'cartProducts/cart',
      payload: {
        _products
      }

    })
    // console.log(id, size, "111")
    // console.log(this.props, "this.props")
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
// const mapDispatchToProps = (dispatch) => ({
//   addToCart: (id, size) => dispatch({
//       type: 'cartProducts/addToCart',
//       payload: {
//           id:id,
//           size:size
//       }
//   }),

// })
export default connect(mapStateToProps)(ProduceCard);
