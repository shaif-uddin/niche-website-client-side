import "./App.css";
import AuthProvider from './context/AuthProvider';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Registration from "./components/Registration/Registration";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddProduct from "./components/Dashboard/Admin/AddProduct/AddProduct";
import AllProducts from "./components/Dashboard/Admin/AllProducts/AllProducts";
import UpdateProduct from "./components/Dashboard/Admin/UpdateProduct/UpdateProduct";
import Explore from "./components/Explore/Explore";
import Purchase from "./components/Purchase/Purchase";
import AllOrders from "./components/Dashboard/Admin/AllOrders/AllOrders";
import UpdateOrder from "./components/Dashboard/Admin/UpdateOrder/UpdateOrder";
import UserOrders from "./components/Dashboard/User/UserOrders/UserOrders";
import UserOrdersUpdate from "./components/Dashboard/User/UserOrdersUpdate/UserOrdersUpdate";
import AddReviews from "./components/Dashboard/User/AddReviews/AddReviews";
import ShowReviews from "./components/Dashboard/User/ShowReviews/ShowReviews";
import MakeAdmin from "./components/Dashboard/Admin/MakeAdmin/MakeAdmin";
import Pay from "./components/Dashboard/User/Pay/Pay";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        {/* Setup Routing for page navigation */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/explore">
              <Explore></Explore>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Registration></Registration>
            </Route>
            <PrivateRoute path="/Dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <PrivateRoute path="/purchase/icecream/:icecreamID">
              <Purchase></Purchase>
            </PrivateRoute>
            <PrivateRoute path="/user/pay/orders">
              <Pay />
            </PrivateRoute>
            <PrivateRoute path="/user/show/orders">
              <UserOrders />
            </PrivateRoute>
            <PrivateRoute path="/user/add/reviews">
              <AddReviews />
            </PrivateRoute>
            <PrivateRoute path="/user/show/reviews">
              <ShowReviews />
            </PrivateRoute>
            <PrivateRoute path="/user/update/order/:orderID">
              <UserOrdersUpdate />
            </PrivateRoute>
            <PrivateRoute path="/admin/update/icecream/:icecreamID">
              <UpdateProduct />
            </PrivateRoute>
            <PrivateRoute path="/admin/update/order/:orderID">
              <UpdateOrder />
            </PrivateRoute>
            <PrivateRoute path="/admin/show/icecreams">
              <AllProducts />
            </PrivateRoute>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
