import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd'
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import Uri from '../../../Uri';
import DrugType from '../../../utility/TypesInterfaces';
import Helper from '../../../utility/Helper';
import Dropzone from 'react-dropzone';
import { UploadOutlined } from '@ant-design/icons';

export default function Drug() {

  let [ dataSource, setDataSource] = useState<DrugType[]>([]);
    
const columns : any = [
    {
      title: 'Id',
      dataIndex: 'drug_number',
      key: 'drug_number',
      width : "5%",
      responsive: ['sm','md','lg','xl'],
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
      width : '10%',
      responsive: ['sm','md','lg','xl'],
      render:(text:any, record:any, index:any)=>{
        return(

          <Tag color={record.category_color}>
            {text}
          </Tag>

        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'drug_name',
      key: 'drug_name',
      width : '10%',
      responsive: ['sm','md','lg','xl'],
    },
    {
      title: 'Stock',
      key: 'drug_stock',
      dataIndex: 'drug_stock',
      width : '5%',
      responsive: ['sm','md','lg','xl'],
     
    },
    {
      title: 'Price',
      key: 'drug_price',
      dataIndex: 'drug_price',
      width : '10%',
      responsive: ['sm','md','lg','xl'],
      render : (text:any, record:any, index:any)=>{

        return Helper.price(text);

      }

    },
    {
      title: 'Picture',
      key: 'drug_picture',
      dataIndex: 'drug_picture',
      width : '10%',
      responsive: ['sm','md','lg','xl'],
      render : (text:any, record:any, index:any)=>{

          if(text){

            return text

          } else{

            return(

              <Dropzone>
                {({getRootProps, getInputProps}) => (
                  <div className='styleDropzone'>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className='text-center'>
                        <div>
                          <UploadOutlined style={{fontSize:'20px'}}/>
                        </div>
                        <p className='m-0' style={{fontSize:"8px"}}>
                          <strong>Drag and drop</strong> your file(s) in the area OR
                        </p>
                        <p className='m-0' style={{fontSize:"8px"}}>
                          <strong>Copy and paste</strong> image(s) or files OR
                        </p>
                        <p className='m-0' style={{fontSize:"8px"}}>
                          <strong>Click</strong> here
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>

            )

          }

      }
      
    },
    {
      title: 'Benefit',
      key: 'drug_benefit',
      dataIndex: 'drug_benefit',
      width : '10%',
      responsive: ['sm','md','lg','xl'],
      
      // render : (text:any, record:any, index:any)=>{

      //   if(text){

      //     return text;

      //   }else{

      //     return (
      //       <div></div>
      //     )

      //   }

      // }
    },
    {
      title: 'Action',
      key: 'Action',
      dataIndex: 'Action',
      width : '10%',
      responsive: ['sm','md','lg','xl'],
      render : (text:any , record:any , index:any) => {
        return(
          <>
          <div className="d-flex">
            <button className='btn btn-success d-flex align-items-center mx-1' onClick={(e:any)=>{

            

            }}>
              <EditOutlined />
            </button>
            <button className='btn btn-danger d-flex align-items-center mx-1' onClick={(e:any)=>{

            

            }}>
              <DeleteOutlined />
            </button>
          </div>
          </>
        )
      }
    },
  ];

  async function _loadData(){

    await axios.get(Uri.rootUri + `/drug/`)
    .then(function(response:any){

      let dataResponse : any = response.data.data;

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