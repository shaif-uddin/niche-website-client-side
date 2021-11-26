import React from 'react';
import './Dashboard.css'
import {
    Switch,
    Route,
    useRouteMatch,
    NavLink,
    Link
} from "react-router-dom";
import useAuth from '../../../Hooks/useAuth';
import AdminRoute from '../../../PrivateRoute/AdminRoute';
import AddProduct from '../Admin/AddProduct/AddProduct';
import AllProducts from '../Admin/AllProducts/AllProducts';
import AllOrders from '../Admin/AllOrders/AllOrders';
import MakeAdmin from '../Admin/MakeAdmin/MakeAdmin';
import DashBoardHome from '../DashboardHome/DashboardHome';
import UpdateOrder from '../Admin/UpdateOrder/UpdateOrder';
import UpdateProduct from '../Admin/UpdateProduct/UpdateProduct';
import UserOrders from '../User/UserOrders/UserOrders';
import AddReviews from '../User/AddReviews/AddReviews';
import ShowReviews from '../User/ShowReviews/ShowReviews';
import Pay from '../User/Pay/Pay';
const Dashboard = () => {
    let { isAdmin, logOut, setLoadingAdmin, user } = useAuth();
    let { path, url } = useRouteMatch();
    if (!setLoadingAdmin) return 'loading'
    console.log(isAdmin)
    return (
        <>
            <div class="sidebar-nav">
                <nav class="navbar navbar-dark bg-primary fixed-top">
                    <div class="container">
                        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="offcanvas offcanvas-start shadow" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div class="offcanvas-body">
                                <ul class="navbar-nav">
                                    <li className="bg-secondary mb-1 text-center">
                                        <NavLink className="nav-link text-light"
                                            to={`${url}`}
                                            activeStyle={{
                                                fontWeight: "bold",
                                            }}>
                                            <span class="item-text">Dashboard Home</span>
                                        </NavLink>
                                    </li>
                                    {
                                        isAdmin && <>
                                            <li className="bg-info mb-1 text-center">
                                                <NavLink className="nav-link text-light"
                                                    to={`${url}/admin/add/icecream`}
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#636"
                                                    }}>
                                                    Add IceCream
                                                </NavLink>
                                            </li>
                                            <li className="bg-info mb-1 text-center">
                                                <NavLink className="nav-link text-light"
                                                    to={`${url}/admin/show/icecreams`}
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#636"
                                                    }}>
                                                    All IceCreams
                                                </NavLink>
                                            </li>
                                            <li className="bg-info mb-1 text-center">
                                                <NavLink className="nav-link text-light"
                                                    to={`${url}/admin/show/orders`}
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#636"
                                                    }}>
                                                    All Orders
                                                </NavLink>
                                            </li>
                                            <li className="bg-info mb-1 text-center">
                                                <NavLink className="nav-link text-light"
                                                    to={`${url}/admin/makeadmin`}
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#636"
                                                    }}>
                                                    Make Admin
                                                </NavLink>
                                            </li>
                                            <span className="w-100 d-block border border-2 border-top" ></span>
                                        </>
                                    }
                                    {
                                        !isAdmin && <>
                                            <li className="bg-info mb-1 text-center">
                                                <NavLink className="nav-link text-light"
                                                    to={`${url}/user/show/orders`}
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#636"
                                                    }}>
                                                    My Orders
                                                </NavLink>
                                            </li>
                                            <li className="bg-info mb-1 text-center">
                                                <NavLink className="nav-link text-light"
                                                    to={`${url}/user/pay/orders`}
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#636"
                                                    }}>
                                                    Pay
                                                </NavLink>
                                            </li>
                                            <li className="bg-info mb-1 text-center">
                                                <NavLink className="nav-link text-light"
                                                    to={`${url}/user/add/reviews`}
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#636"
                                                    }}>
                                                    Add Reviews
                                                </NavLink>
                                            </li>
                                            <li className="bg-info mb-1 text-center">
                                                <NavLink className="nav-link text-light"
                                                    to={`${url}/user/show/reviews`}
                                                    activeStyle={{
                                                        fontWeight: "bold",
                                                        color: "#636"
                                                    }}>
                                                    All Reviews
                                                </NavLink>
                                            </li>
                                        </>
                                    }
                                    <li className="bg-info mb-1 text-center">
                                        <NavLink onClick={logOut} className="nav-link text-light"
                                            to="/"
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "#636"
                                            }}>
                                            LogOut
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="btn-group">
                            <Link to="/" class="dropdown-toggle text-white text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="usericon"><i class="bi bi-person-circle"></i></span>
                                <span class="textnone">{user?.displayName || user?.email}</span>
                            </Link>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link to="/">
                                        <button class="dropdown-item" type="button"><i class="bi bi-box-arrow-right"></i> Home Page</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <button onClick={logOut} class="dropdown-item" type="button"><i class="bi bi-box-arrow-right"></i> Sign out</button>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <Switch>
                            <Route exact path={path}>
                                <DashBoardHome></DashBoardHome>
                            </Route>
                            <AdminRoute path={`${path}/admin/add/icecream`}>
                                <AddProduct></AddProduct>
                            </AdminRoute>
                            <AdminRoute path={`${path}/admin/show/icecreams`}>
                                <AllProducts />
                            </AdminRoute>
                            <AdminRoute path={`${path}/admin/show/orders`}>
                                <AllOrders></AllOrders>
                            </AdminRoute>
                            <AdminRoute path={`${path}/admin/makeadmin`}>
                                <MakeAdmin></MakeAdmin>
                            </AdminRoute>
                            <Route path={`${path}/user/show/orders`}>
                                <UserOrders></UserOrders>
                            </Route>
                            <Route path={`${path}/user/add/reviews`}>
                                <AddReviews />
                            </Route>
                            <Route path={`${path}/user/show/reviews`}>
                                <ShowReviews></ShowReviews>
                            </Route>
                            <Route path={`${path}/user/pay/orders`}>
                                <Pay></Pay>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;