import React, { useEffect, useState } from 'react'
import { Table, Button, Alert, Input} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Uri from '../../../Uri';
import CategoryType from '../../../utility/TypesInterfaces';
import { Modal } from 'react-bootstrap';
export default function Category(props:any) {

    let [ dataSource, setDataSource] = useState<CategoryType[]>([]);
    let [ showDelete, setShowDelete] = useState<boolean>(false);
    let [ showUpdate, setShowUpdate] = useState<boolean>(false);
    let [ idCategory, setIdCategory] = useState<string>("");
    let [ category, setCategory] = useState<string>("");
    let [ deleteNotification, setDeleteNotifiaction] = useState<boolean>();
    let [ messageDeleteNotification, setMessageDeleteNotification] = useState<string>();
    let [ updateNotification, setUpdateNotification] = useState<boolean>();
    let [ updateErrorNotification, setUpdateErrorNotification] = useState<boolean>();
    let [ messageUpdateNotification, setMessageUpdateNotification] = useState<string>("");
    let [ messageErrorNotification, setMessageErrorNotification] = useState<string>("");
    let [ loading, setLoading] = useState<boolean>();

    const columns : any = [
        {
          title: 'Id',
          dataIndex: 'category_number',
          key: 'category_number'
          // width : '80%'
        },
        {
          title: 'Category',
          dataIndex: 'category_name',
          key: 'category_name',
          width : '60%'
        },
        {
          title: 'Action',
          render : (text:any , record:any , index:any) => {
            return(
              <>
              <div className="d-flex">
                <button className='btn btn-success d-flex align-items-center mx-1' onClick={(e:any)=>{

                  setIdCategory(record.id);
                  setCategory(record.category_name);
                  setShowUpdate(true);

                }}>
                  <EditOutlined />
                </button>
                <button className='btn btn-danger d-flex align-items-center mx-1' onClick={(e:any)=>{

                  setIdCategory(record.id);
                  setShowDelete(true);

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

    setLoading(true);

    await axios.get(Uri.rootUri + '/category')
    .then(function(response:any){

      let dataResponse = response.data.data;

      setDataSource(dataResponse);

      setLoading(false);

    })
    .catch(function(error:any){

      setLoading(false);
      
      console.log(error);

    });

  }

  async function _updateData(e:any){

    e.preventDefault();

    if(!category || category === "" || category.match(/^ *$/) !== null){

      setMessageErrorNotification("Please insert category name");

      setUpdateErrorNotification(true);

      setTimeout(()=>{

        setUpdateErrorNotification(false);

      }, 3000);

    }else{

      let data = {

        "id" : idCategory,
        "category_name" : category,
        "category_updated_by" : "system"

      }

      await axios.put(Uri.rootUri + `/category/${idCategory}/update/`, data)
      .then(function(response:any){

        // console.log(response);

        setIdCategory("");

        setCategory("");

        setMessageUpdateNotification("Success update");

        setUpdateNotification(true);

        setShowUpdate(false);

        _loadData();

        setTimeout(()=>{

          setUpdateNotification(false);

        }, 3000);

      })
      .catch(function(error:any){

        console.log(error);

      });

    }

  }

  async function _deleteData(e:any){

    e.preventDefault();

    let data = {

      "category_deleted_by" : "system"

    }

    await axios.put(Uri.rootUri + `/category/${idCategory}/delete/`, data)
    .then(function(response:any){

      // console.log(response);

      setIdCategory("");

      setMessageDeleteNotification("Success delete");

      setDeleteNotifiaction(true);

      setShowDelete(false);

      _loadData();

      setTimeout(()=>{

        setDeleteNotifiaction(false);

      },3000);

    })
    .catch(function(error:any){

      console.log(error);

    });

  }
  function _category(e:any){

    if(e.target.value){

        setCategory(e.target.value);

    }else{

        setCategory("");

    }

}
  function _handleCloseDelete(){

    setIdCategory("");

    setShowDelete(false);

  }
  function _handleCloseUpdate(){

    setIdCategory("");

    setCategory("");

    setShowUpdate(false);

    setUpdateErrorNotification(false);

  }

  useEffect(()=>{

    _loadData();

  },[]);

  return (
    <div className='Category'>
        <div className="header mb-3">
            <div className="row">
                <div className="col-lg-12">
                    <h3>Category</h3>
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
              { updateNotification &&

                <Alert message={messageUpdateNotification} type="success" showIcon closable/>

              }
              </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Table
                     columns={columns} 
                     dataSource={dataSource} 
                     loading={loading}
                     pagination={false} 
                     size={"small"}
                     scroll={{ x: 'max-content',  y : 'max-content'}}
                    />
                </div>
            </div>
        </div>

        {/* Modal for confirm */}
        {/* <> */}
            <Modal show={showDelete} onHide={_handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
            <Modal.Body>Do you want to delete this ?</Modal.Body>
              <Modal.Footer>
                  <button className='btn btn-success' onClick={_handleCloseDelete}>
                  Cancel
                </button>
                <button className='btn btn-danger' onClick={_deleteData}>
                  Ok
                </button>
              </Modal.Footer>
            </Modal>
            <Modal show={showUpdate} onHide={_handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
              </Modal.Header>
            <Modal.Body>
            <div className="row mb-2">
              <div className="col-lg-12">
                { updateErrorNotification &&
                  <Alert message={messageErrorNotification} type="error" showIcon closable/>
                }
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                  <div className='form-input mb-3'>
                      <label htmlFor="category" className='mb-2 text-secondary'>Name Category</label>
                      <Input id='category' name='category' onChange={_category} value={category ? category : ""}/>
                  </div>
              </div>
            </div>
            </Modal.Body>
              <Modal.Footer>
                <button className='btn btn-secondary' onClick={_handleCloseUpdate}>
                  Cancel
                </button>
                <button className='btn btn-primary' onClick={_updateData}>
                  Update
                </button>
              </Modal.Footer>
            </Modal>
        {/* </> */}
    </div>
  )
}
