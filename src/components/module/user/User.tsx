import { PlusOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function User() {

    const columns : any = [
        {
          title: 'Id',
          dataIndex: 'category_number',
          key: 'category_number',
          width: '10%'
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          width : '10%',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width : '10%',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          width : '10%',
        },
        {
          title: 'Roles',
          dataIndex: 'role',
          key: 'role',
          width : '10%',
        },
        {
          title: 'Action',
          
        },
      ];

  return (
    <div className='User'>
      <div className="header mb-3">
          <div className="row">
              <div className="col-lg-12">
                  <h3>User</h3>
              </div>
          </div>
      </div>
      <div className="main">
          <div className="row mb-3">
              <div className="col-lg-12">
                  <Link to={'/Index/CreateUser'}>
                      <Button type="primary" className=' d-flex align-items-center'>
                          <PlusOutlined /> Add New User
                      </Button>
                  </Link>
              </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-12">
            {/* { deleteNotification &&

              <Notification
                message={messageDeleteNotification}
                type={"success"}
                showIcon={true}
                closable={true}
              />

            }
            { updateNotification &&

              <Notification
                message={messageUpdateNotification}
                type={"success"}
                showIcon={true}
                closable={true}
              />

            } */}
            </div>
          </div>
          <div className="row">
              <div className="col-lg-12">
                  <Table
                   columns={columns} 
                //    dataSource={dataSource} 
                  //  dataSource={getListCategoryData.data} 
                   pagination={false} 
                   size={"small"}
                   scroll={{ x: 'max-content',  y : 'max-content'}}
                  />
              </div>
          </div>
      </div>
           
  </div>
  )
}
