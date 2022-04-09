import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, MinusCircleOutlined , AreaChartOutlined } from '@ant-design/icons';
import { BrowserRouter, Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import Drugs from './module/Drugs';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../node_modules/antd/dist/antd.css';
import './style/App.css';

export default function MainDashboard() {

    const { Header, Sider, Content } = Layout;
    const {url, path} = useRouteMatch();

    let [collapsed, setCollapsed] = useState<boolean>();
    
    function _toggle(){

        if(!collapsed){

            setCollapsed(true);

        }else{

            setCollapsed(false);

        }

    };

    useEffect(()=>{

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
                <Menu mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<AreaChartOutlined />}>
                        <Link to={`${url}/Dashboard`}>
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<MinusCircleOutlined className='icon-module'/>}>
                        <Link to={`${url}/Drugs`}>
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
                        minHeight: 280,
                        }}
                    >   
                        {/* this in main router */}
                        {/* url = Index */}
                        <Switch>
                            <Route path={`${url}/Drugs`} component={Drugs}/>
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