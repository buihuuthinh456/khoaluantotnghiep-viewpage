
import Home from '../pages/Home/Home';
import Detail from '../pages/Details/Detail'
import CategoryPage from '../pages/CategoryPage/CategoryPage';
import Cart from '../pages/Cart/Cart';
import Search from '../pages/Search/Search';
import Checkout from '../pages/Checkout/Checkout';
import Successful from '../pages/Successful/Successful';
import HeaderOnly from '../components/Layout/HeaderOnly'
import PageNotFound from '../pages/PageNotFound';
import ResetPassword from '../pages/ResetPassword/ResetPassword';

const publicRoutes = [
  {path: '/', component: Home },
  {path: '/category/:category', component: CategoryPage },
  {path: '/detail/:productID', component: Detail },
  {path: '/cart', component: Cart },
  {path: '/search', component: Search},
  {path: '/checkout', component: Checkout, layout: HeaderOnly },
  {path: '/successful', component: Successful, layout: null },
  {path: '/resetPassword', component: ResetPassword, layout: null },
  {path: '*', component: PageNotFound, layout: null },
]

export { publicRoutes }

