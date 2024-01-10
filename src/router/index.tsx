import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Offline from '../views/Offline';
import Home from '../views/Home';
import NotFound from '../views/404';
import Beer from '../views/Beer';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import ErrorBoundary from '../error-bounday';
import { lazy } from 'react';
// import BeerList from '../views/BeerList';
const BeerList = lazy(() => import('../views/BeerList'));


const Router = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <Menu>
        <Offline />
        <Routes>
          <Route index element={<Home />} />
          <Route path='beer'>
            <Route index element={<BeerList />} />
            <Route path=':id' element={<Beer />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Menu>
    </ErrorBoundary>
  </BrowserRouter>
);

export default Router;
