import React, { useEffect, useState } from 'react'
import { Table, Button} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Uri from '../../../Uri';

export default function Category() {

    let [ dataSource, setDataSource] = useState<any>([]);

    const columns : any = [
        {
          title: 'Category',
          dataIndex: 'name',
          key: 'name',
          width : '80%'
        },
        {
          title: 'Action',
          render : (text:any , record:any , index:any) => {
            return(
              <>
              <div className="d-flex">
                <button className='btn btn-success d-flex align-items-center mx-1'>
                  <EditOutlined />
                </button>
                <button className='btn btn-danger d-flex align-items-center mx-1'>
                  <DeleteOutlined />
                </button>
              </div>
              </>
            )
          }
        },
      ];
      
   
  async function _loadData(){

    await axios.get(Uri.rootUri + '/category')
    .then(function(response:any){

      let dataResponse = response.data.data;

      setDataSource(dataResponse);

    })
    .catch(function(error:any){

      console.log(error);

    });

  }

  useEffect(()=>{

    _loadData();

  },[]);

  return (
    <div className='Category'>
        <div className="header mb-3">
            <div className="row">
                <div className="col-lg-12">
                    <h3 className='text-secondary'>Category</h3>
                    {/* <hr /> */}
                </div>
            </div>
        </div>
        <div className="main">
            <div className="row mb-3">
                <div className="col-lg-12">
                    <Link to={'/Index/CreateCategory'}>
                        <Button type="primary" className=' d-flex align-items-center'>
                            <PlusOutlined /> Add New Category
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Table
                     columns={columns} 
                     dataSource={dataSource} 
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
