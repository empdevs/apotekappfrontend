import React from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

export default function Role() {

    const columns : any = [
        {
          title: 'Id',
          dataIndex: 'role_number',
          key: 'role_number',
          width: '10%'
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          width : '10%',
        },
        {
          title: 'Action',
          
        },
      ];

  return (
    <div className='Role'>
      <div className="header mb-3">
          <div className="row">
              <div className="col-lg-12">
                  <h3>Role</h3>
              </div>
          </div>
      </div>
      <div className="main">
          <div className="row mb-3">
              <div className="col-lg-12">
                  <Link to={'/Index/CreateRole'}>
                      <Button type="primary" className=' d-flex align-items-center'>
                          <PlusOutlined /> Add New Role
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
