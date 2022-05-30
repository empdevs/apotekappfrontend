import React, { useEffect, useState } from 'react'
import { Table, Button, Alert} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Uri from '../../../Uri';
import CategoryType from '../../../utility/TypesInterfaces';
import { Modal } from 'react-bootstrap';
export default function Category(props:any) {

    let [ dataSource, setDataSource] = useState<CategoryType[]>([]);
    let [ show, setShow] = useState<any>(false);
    let [ idCategory, setIdCategory] = useState<String>("");
    let [ deleteNotification, setDeleteNotifiaction] = useState<Boolean>();
    let [ messageDeleteNotification, setMessageDeleteNotification] = useState<String>();
    const columns : any = [
        {
          title: 'Id',
          dataIndex: 'number',
          key: 'number',
          // width : '80%'
        },
        {
          title: 'Category',
          dataIndex: 'name',
          key: 'name',
          width : '60%'
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
                <button className='btn btn-danger d-flex align-items-center mx-1' onClick={(e:any)=>{

                  setIdCategory(record.id);
                  setShow(true);

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

    await axios.get(Uri.rootUri + '/category')
    .then(function(response:any){

      let dataResponse = response.data.data;

      setDataSource(dataResponse);

    })
    .catch(function(error:any){

      console.log(error);

    });

  }

  async function _deleteData(e:any){

    e.preventDefault();

    let data = {

      "deleted_by" : "system"

    }

    await axios.put(Uri.rootUri + `/category/${idCategory}/delete/`, data)
    .then(function(response:any){

      console.log(response);

      setIdCategory("");

      setMessageDeleteNotification("Success delete");

      setDeleteNotifiaction(true);

      setShow(false);

      _loadData();

      setTimeout(()=>{

        setDeleteNotifiaction(false);

      },3000);

    })
    .catch(function(error:any){

      console.log(error);

    });

  }

  function _handleCloseDelete(){

    setIdCategory("");

    setShow(false);

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
            <div className="row mb-3">
              <div className="col-lg-12">
              { deleteNotification &&

                <Alert message={messageDeleteNotification} type="success" showIcon closable/>

              }
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

        {/* Modal for confirm */}
        {/* <> */}
            <Modal show={show} onHide={_handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
            <Modal.Body>Are you delete this ?</Modal.Body>
              <Modal.Footer>
                  <button className='btn btn-success' onClick={_handleCloseDelete}>
                  Cancel
                </button>
                <button className='btn btn-danger' onClick={_deleteData}>
                  Ok
                </button>
              </Modal.Footer>
            </Modal>
        {/* </> */}
    </div>
  )
}
