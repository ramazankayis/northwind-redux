import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as categoryActions from '../../redux/actions/categoryActions';
import * as productActions from '../../redux/actions/productActions';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id);
  };

  render() {
    return (
      <div>
        <Badge color="warning">
          <h3> Category List - {this.props.categories.length}</h3>
        </Badge>

        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        <h5>
          <Badge color="info">SeciliCategory</Badge>:
          <Badge color="success">
            {this.props.currentCategory.categoryName}
          </Badge>
        </h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCategory: state.changeCategoryReducer,
  categories: state.categoryListReducer
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    getCategories: bindActionCreators(categoryActions.getCategories, dispatch),
    changeCategory: bindActionCreators(
      categoryActions.changeCategory,
      dispatch
    ),
    getProducts: bindActionCreators(productActions.getProducts, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
