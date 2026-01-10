import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components';
import { routes } from './global/routes';
import { StaticDataProvider } from './global/contexts/StaticDataContext';
import { languageList } from './global/config';
import { ProductsDataProvider } from './global/contexts/ProductsDataContext';

const checkLanguage = () => {
  let windowUrl = window.location.href;
  let windowUrlArray = windowUrl.split('/');
  let index = languageList.indexOf(windowUrlArray[3]);
  if (index === -1) {
    window.location.href = `/${languageList[0]}`;
  }
}

checkLanguage();

const App = () => {
  return (
    <BrowserRouter>
      <StaticDataProvider>
        <ProductsDataProvider>
          <Header />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}
              />
            ))}
          </Routes>
          <Footer />
        </ProductsDataProvider>
      </StaticDataProvider>
    </BrowserRouter >
  )
}

export default App