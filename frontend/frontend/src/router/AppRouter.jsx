import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import MenuPage from '../pages/Menu/MenuPage'
import CartPage from '../pages/Cart/CartPage'
import OrdersPage from '../pages/Orders/OrdersPage'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import NotFound from '../pages/NotFound'
import AdminDashboard from '../pages/Admin/Dashboard'
import ManageMenu from '../pages/Admin/ManageMenu'
import ManageUsers from '../pages/Admin/ManageUsers'
import ManageOrders from '../pages/Admin/ManageOrders'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminRoute from '../components/AdminRoute'
import AddMenu from "../pages/Admin/AddMenu";
import EditMenu from "../pages/Admin/EditMenu";


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />


            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/menu" element={<AdminRoute><ManageMenu /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><ManageOrders /></AdminRoute>} />
            <Route path="/admin/menu" element={<ManageMenu />} />
            <Route path="/admin/menu/add" element={<AddMenu />} />
            <Route path="/admin/menu/edit/:id" element={<EditMenu />} />



            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}