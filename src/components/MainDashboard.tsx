import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, MinusCircleOutlined , AreaChartOutlined , AppstoreOutlined} from '@ant-design/icons';
import { BrowserRouter, Route, Link, Switch, useRouteMatch,  useLocation } from 'react-router-dom';
import Drug from './module/drug/Drug';
import Category from './module/category/Category';
import CreateCategory from './module/category/CreateCategory';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../node_modules/antd/dist/antd.css';
import './style/App.css';
import CreateDrug from './module/drug/CreateDrug';

export default function MainDashboard() {

    const { Header, Sider, Content } = Layout;
    const {url, path} = useRouteMatch();
    let [routerKey, setRouterKey] = useState<any[]>([]); 

    //state
    let [collapsed, setCollapsed] = useState<boolean>();

    //route
    const routerDashboard = `${window.location.protocol}//${window.location.host}${url}/Dashboard`;
    const routerDrugs = `${window.location.protocol}//${window.location.host}${url}/Drugs`;
    const routerCategory = `${window.location.protocol}//${window.location.host}${url}/Category`;
    
    function _routeActive(){
       
        switch (window.location.href) {
            case routerDashboard:
                setRouterKey(['1']);
            break;
            case routerCategory:
                setRouterKey(['2']);
            break;
            case routerDrugs:
                setRouterKey(['3']);
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
                    {console.log(routerKey)}
                <Menu mode="inline" defaultSelectedKeys={routerKey.length > 0 ? routerKey : ['1']}>
                    <Menu.Item key="1" icon={<AreaChartOutlined />} onClick={_routeActive}>
                        <Link to={`${url}/Dashboard`}>
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreOutlined />} onClick={_routeActive}>
                        <Link to={`${url}/Category`}>
                            Category
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<MinusCircleOutlined className='icon-module'/>} onClick={_routeActive}>
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

                        {/* // {React.createElement( collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        //   className: 'trigger',
                        //   onClick: _toggle,
                        // })} */}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        height: "auto",
                        }}
                    >   
                        {/* this in main router */}
                        {/* url = Index */}
                        <Switch>
                            <Route path={`${url}/Drug`} component={Drug}/>
                            <Route path={`${url}/CreateDrug`} component={CreateDrug}/>

                            <Route path={`${url}/Category`} component={Category}/>
                            <Route path={`${url}/CreateCategory`} component={CreateCategory}/>
                        </Switch>

                    </Content>
                    <div className="footer">
                        {/* <p>this is footer</p> */}
                    </div>
                </Layout>
            </Layout>
        </div>
    </BrowserRouter>
  )
}
