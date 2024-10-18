import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Include/Home/Header';

const HomeLayOut = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default HomeLayOut;