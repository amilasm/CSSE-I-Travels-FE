import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  Button } from 'react-bootstrap';

import './sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bx-home'></i>,
        to: '/t',
        section: ''
    },
   
    {
        display: 'Add Shedule',
        icon: <i className='bx bx-calendar'></i>,
        to: '/t/Shedule',
        section: '/Shedule'    },
    {
        display: 'View Shedule',
        icon: <i className='bx bx-task'></i>,
        to: '/t/viewshedule',
        section: '/viewshedule'
    },
    {
        display: 'Report',
        icon: <i className='bx bx-book'></i>,
        to: '/t/Report',
        section: '/Report'
    },
    {
        display: 'Fares',
        icon: <i className='bx bx-receipt'></i>,
        to: '/t/Fares',
        section: '/Fares'
    },
    {
        display: 'User',
        icon: <i className='bx bx-receipt'></i>,
        to: '/t/user',
        section: '/user'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/t')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            Mass Travels
        </div>
        <div >
        <div style={{ paddingBottom:'4vh',paddingLeft:'25vh',paddingBottom:'5vh'}}>
        <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/login",
                        }}
                    >
            <Button variant='danger'>Log Out</Button></Link>
            </div >

        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        
    </div>;
};

export default Sidebar;
