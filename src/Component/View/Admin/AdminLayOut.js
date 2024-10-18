import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Include/Admin/Header';

const AdminLayOut = () => {
    return (
        <div>
            <Header />
            <Outlet></Outlet>
        </div>
    );
};

export default AdminLayOut;