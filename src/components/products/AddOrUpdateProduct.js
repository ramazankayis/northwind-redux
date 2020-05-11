/** @format */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { saveProduct } from '../../redux/actions/productActions';
import ProductDetail from './ProductDetail';
function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({ ...props.product });
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }

    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === 'categoryId' ? parseInt(value, 10) : value
    }));
    Validate(name, value);
  }
  function Validate(name, value) {
    if (value === '' && name === 'productName') {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: 'ürün ismi olmalıdır',
        categoryId: 'category ismini seçiniz',
        unitPrice: 'Unit Price ismini giriniz',
        quantityPerUnit: 'Quantity Per Unit ismini giriniz',
        unitsInStock: 'Units In Stock ismini giriniz'
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: '',
        categoryId: '',
        unitPrice: '',
        quantityPerUnit: '',
        unitsInStock: ''
      }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push('/');
    });
  }
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}
export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;

  return product;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.productId;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};

  return {
    product: product,
    products: state.productListReducer,
    categories: state.categoryListReducer
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
