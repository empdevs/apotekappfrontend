import React from 'react'
import { Button, Space, Table, Tag } from 'antd'
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

export default function Drug() {

    
const columns : any = [
    {
      title: 'Id',
      dataIndex: 'name',
      key: 'name',
      responsive : ['lg','sm','md']
    },
    {
      title: 'Category',
      dataIndex: 'age',
      key: 'age',
      responsive : ['lg','sm','md']
    },
    {
      title: 'Name',
      dataIndex: 'address',
      key: 'address',
      responsive : ['lg','sm','md']
    },
    {
      title: 'Stock',
      key: 'tags',
      dataIndex: 'tags',
      responsive : ['lg','sm','md']
     
    },
    {
      title: 'Price',
      key: 'Price',
      dataIndex: 'Price',
      responsive : ['lg','sm','md']

    },
    {
      title: 'Benefit',
      key: 'Benefit',
      dataIndex: 'Benefit',
      responsive : ['lg','sm','md']
    },
    {
      title: 'Picture',
      key: 'Picture',
      dataIndex: 'Picture',
      responsive : ['lg','sm','md']
    },
    {
      title: 'Action',
      key: 'Action',
      dataIndex: 'Action',
      responsive : ['lg','sm','md']
    },
  ];
  

  return (
    <div className='Drugs'>
        <div className="header mb-3">
            <div className="row">
                <div className="col-lg-12">
                    <h3>Drugs</h3>
                </div>
            </div>
        </div>
        <div className="main">
            <div className="row mb-3">
                <div className="col-lg-12">
                    <Link to={'/Index/CreateDrug'}>
                        <Button type="primary" className=' d-flex align-items-center'>
                            <PlusOutlined /> Add New Drug
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Table
                     columns={columns} 
                    //  dataSource={data} 
                     pagination={false} 
                     size={"small"}
                     scroll={{ x: 'max-content',  y : 330}}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}