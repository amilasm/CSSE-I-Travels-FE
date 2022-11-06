import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  Button } from 'react-bootstrap';

import './sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bx-home'></i>,
        to: '/t',
        section: '',
        account_type:"All"
    },
   
    {
        display: 'Add Shedule',
        icon: <i className='bx bx-calendar'></i>,
        to: '/t/Shedule',
        section: '/Shedule',
        account_type:"Manager"    },
        
    {
        display: 'View Shedule',
        icon: <i className='bx bx-task'></i>,
        to: '/t/viewshedule',
        section: '/viewshedule',
        account_type:"Manager"
    },
    {
        display: 'Report',
        icon: <i className='bx bx-book'></i>,
        to: '/t/Report',
        section: '/Report',
        account_type:"All"
    },
    {
        display: 'Payments',
        icon: <i className='bx bx-box'></i>,
        to: '/t/Fares',
        section: '/Fares',
        account_type:"Manager"
    },
    {
        display: 'User',
        icon: <i className='bx bx-receipt'></i>,
        to: '/t/user',
        section: '/user',
        account_type:"Admin"
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
        <Link to={"/t"}><div className="sidebar__logo">
        <img src="https://i.postimg.cc/x85twtVR/paper-airplane-travel-logo-260nw-562039321-copy.png" alt="logo" class="logo"/>
        </div></Link>
        <div >
        

        </div>
        <div ref={sidebarRef} className="sidebar__menu"style={{marginTop:"50%"}}>
            {/* <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`, fontSize:"40px"
                }}
            ></div> */}
            {
                sidebarNavItems.map((item, index) => (
                    
                    <Link to={item.to} key={index} hidden = {item.account_type != localStorage.getItem("account_type") && item.account_type != "All"}>
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
            <div style={{marginTop:"20%" }}>
                <center>
            <Link
                            style={{ textDecoration: 'none', color: 'white', backgroundColor:"#FC973A" }}
                            to={{
                                pathname: "/",
                            }}
                        >
                <Button variant="secondary" >Logout</Button></Link>
                </center></div >
        </div>
        
    </div>;
};

export default Sidebar;
