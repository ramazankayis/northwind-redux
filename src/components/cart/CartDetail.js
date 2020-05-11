import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cartActions from '../../redux/actions/cartActions';
import { Table, Button } from 'reactstrap';
import alertifyjs from 'alertifyjs';

class CartDetail extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertifyjs.error(product.productName + ' silindi ');
  }
  render() {
    var id = 1;
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>Product Name</th>
              <th>Unit price</th>
              <th>Quantity per Unit</th>
              <th>CartItem quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((cartItem) => (
              <tr key={cartItem.product.id}>
                <td>{id++}</td>
                <td>{cartItem.product.id}</td>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.product.quantityPerUnit}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem.product)}
                  >
                    sil
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cart: state.cartReducer
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
