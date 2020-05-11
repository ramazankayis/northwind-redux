import React, { Component } from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';

class CartSummary extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
  }

  renderEmpty() {
    return (
      <NavItem>
        <NavLink>sepetiniz boş</NavLink>
      </NavItem>
    );
  }
  renderSummary() {
    return (
      <div>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            sepetiniz
          </DropdownToggle>
          <DropdownMenu right>
            {this.props.cart.map((cartItem) => (
              <DropdownItem key={cartItem.product.id}>
                <Badge
                  color="danger"
                  onClick={() => this.removeFromCart(cartItem.product)}
                >
                  X
                </Badge>
                {cartItem.product.productName}
                <Badge color="success">{cartItem.quantity}</Badge>
              </DropdownItem>
            ))}

            <DropdownItem divider />
            <DropdownItem>
              <Link to="/cart">sepete git </Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
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
export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
