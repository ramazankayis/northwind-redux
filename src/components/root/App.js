import React from 'react';
import Navi from '../navi/Navi';
import Dashboard from './Dashboard';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import CartDetail from '../cart/CartDetail';
import AddOrUpdateProduct from '../products/AddOrUpdateProduct';
import NotFound from '../common/NotFound';

function App() {
  return (
    <Container>
      <Navi />

      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/product" exact component={Dashboard} />
        <Route path="/cart" exact component={CartDetail} />
        <Route path="/saveProduct" exact component={AddOrUpdateProduct} />
        <Route path="/saveProduct/:productId" component={AddOrUpdateProduct} />
        <Route exact component={NotFound} />
      </Switch>
    </Container>
  );
}

export default App;
