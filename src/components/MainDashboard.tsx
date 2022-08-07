import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, MinusCircleOutlined , AreaChartOutlined , AppstoreOutlined} from '@ant-design/icons';
import { BrowserRouter, Route, Link, Switch, useRouteMatch,  useLocation } from 'react-router-dom';
import Drug from './module/drug/Drug';
import Category from './module/category/Category';
import CreateCategory from './module/category/CreateCategory';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../node_modules/antd/dist/antd.css';
import './style/App.css';
import CreateDrug from './module/drug/CreateDrug';
import { MenuSidebarKey } from '../utility/TypesInterfaces';
import Dashboard from './module/dashboard/Dashboard';


export default function MainDashboard() {

    const { Header, Sider, Content } = Layout;
    const {url, path} = useRouteMatch();
    let [routerKey, setRouterKey] = useState<number>(); 

    //state
    let [collapsed, setCollapsed] = useState<boolean>();

    //route
    const routerDashboard : string = `${window.location.protocol}//${window.location.host}${url}/Dashboard`;
    const routerDrugs : string = `${window.location.protocol}//${window.location.host}${url}/Drug`;
    const routerCategory : string = `${window.location.protocol}//${window.location.host}${url}/Category`;
    
    function _routeActive(){
       
        switch (window.location.href) {
            case routerDashboard:
                setRouterKey(1);
            break;
            case routerCategory:
                setRouterKey(2);
            break;
            case routerDrugs:
                setRouterKey(3);
            break;
            default:
            break;
        }

    }

    function _toggle(){

        if(!collapsed){

            setCollapsed(true);

        }else{

            setCollapsed(false);

        }

    };

    useEffect(()=>{

        console.log("Apotek App main dashboard");

        _routeActive();
        setCollapsed(false);

    },[]);

  return (
    <BrowserRouter>
        <div className="Dashboard">
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        { collapsed ?
                            <h4 className='mx-2 mb-0'><i className="bi bi-hospital"></i></h4>
                            :
                            <h4 className='text-center'>Apotek </h4>
                        }
                    </div>
                    <Menu mode="inline">
                        <Menu.Item key={MenuSidebarKey.dashboard} icon={<AreaChartOutlined />} onClick={_routeActive} className={routerKey == MenuSidebarKey.dashboard ? 'ant-menu-item-selected active' : ''}>
                            <Link to={`${url}/Dashboard`}>
                                Dashboard
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={MenuSidebarKey.category} icon={<AppstoreOutlined />} onClick={_routeActive} className={routerKey == MenuSidebarKey.category ? 'ant-menu-item-selected active' : ''}>
                            <Link to={`${url}/Category`}>
                                Category
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={MenuSidebarKey.drug} icon={<MinusCircleOutlined className='icon-module'/>} onClick={_routeActive} className={routerKey == MenuSidebarKey.drug ? 'ant-menu-item-selected active' : ''}>
                            <Link to={`${url}/Drug`}>
                                Drugs
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        { collapsed ?

                            <MenuUnfoldOutlined className='trigger' onClick={_toggle} style={{ color : "#fff" }} />

                            :

                            <MenuFoldOutlined className='trigger' onClick={_toggle} style={{ color : "#fff" }} />

                        }
                    </Header>
                    <Content className="site-layout-background">   
                        {/* this in main router */}
                        {/* url = Index */}
                        <Switch>
                            <Route path={`${url}/Dashboard`} component={Dashboard} />

                            <Route path={`${url}/Drug`} component={Drug}/>
                            <Route path={`${url}/CreateDrug`} component={CreateDrug}/>

                            <Route path={`${url}/Category`} component={Category}/>
                            <Route path={`${url}/CreateCategory`} component={CreateCategory}/>
                        </Switch>

                    </Content>
                </Layout>
            </Layout>
        </div>
    </BrowserRouter>
  )
}
