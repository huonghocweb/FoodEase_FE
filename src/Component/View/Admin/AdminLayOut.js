import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Include/Admin/Header';
import './admin.css';

const AdminLayOut = () => {
    return (
        <div>
            <Header />
            <Outlet></Outlet>
        </div>
    );
};

export default AdminLayOut;