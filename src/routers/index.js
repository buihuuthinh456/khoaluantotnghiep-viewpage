
import Home from '../pages/Home/Home';
import Details from '../pages/Details/Detail'
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import Cart from '../pages/Cart/Cart';
import Search from '../pages/Search/Search';
import Checkout from '../pages/Checkout/Checkout';
import Successful from '../pages/Successful/Successful';
import HeaderOnly from '../components/Layout/HeaderOnly'

const publicRoutes = [
  {path: '/', component: Home },
  {path: '/:category', component: CategoryPage },
  {path: '/detail/:productID', component: Details },
  {path: '/cart', component: Cart },
  {path: '/search', component: Search},
  {path: '/checkout', component: Checkout, layout: HeaderOnly },
  {path: '/successful', component: Successful, layout: null },
]

export { publicRoutes }

