import React, { useEffect, useState } from 'react'
import { Table, Alert, Input, Tag, Button} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Uri from '../../../Uri';
import CategoryType from '../../../utility/TypesInterfaces';
import { Modal } from 'react-bootstrap';
// import { getListCategory } from '../../../actions/CategoryAction';
// import { useDispatch, useSelector } from 'react-redux';
import { SliderPicker } from 'react-color';
import ModalPopupConfirmation from '../../../utility/ModalPopup';
import Notification from '../../../utility/Notification';

export default function Category(props:any) {

    // const dispatch : any = useDispatch();

    // const { getListCategoryData } : any = useSelector((state:any)=> state.CategoryReducer);

    let [ dataSource, setDataSource] = useState<CategoryType[]>([]);
    let [ showDelete, setShowDelete] = useState<boolean>(false);
    let [ showUpdate, setShowUpdate] = useState<boolean>(false);
    let [ idCategory, setIdCategory] = useState<string>("");
    let [ category, setCategory] = useState<string>("");
    let [ color, setColor] = useState<string>("");
    let [ deleteNotification, setDeleteNotifiaction] = useState<boolean>();
    let [ messageDeleteNotification, setMessageDeleteNotification] = useState<string>();
    let [ updateNotification, setUpdateNotification] = useState<boolean>();
    let [ updateErrorNotification, setUpdateErrorNotification] = useState<boolean>();
    let [ messageUpdateNotification, setMessageUpdateNotification] = useState<string>("");
    let [ messageErrorNotification, setMessageErrorNotification] = useState<string>("");

    const columns : any = [
        {
          title: 'Id',
          dataIndex: 'category_number',
          key: 'category_number',
          width: '10%'
        },
        {
          title: 'Category',
          dataIndex: 'category_name',
          key: 'category_name',
          width : '60%',
          render : (text:any, record:any, index:any) => {

            return(
              <>
                <Tag color={record.category_color}>{text}</Tag>
              </>
            )

          }
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
                  setColor(record.category_color);
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

    await axios.get(Uri.rootUri + '/category')
    .then(function(response:any){

      let dataResponse : CategoryType[] = response.data.data;

      setDataSource(dataResponse);

    })
    .catch(function(error:any){

      console.log(error);

    });

  }
  // async function _loadData(){

  //  await dispatch(getListCategory());

  // }

  async function _updateData(e:any){

    e.preventDefault();

    if(!category || category === "" || category.match(/^ *$/) !== null || !color || color.match(/^ *$/) !== null){

      setMessageErrorNotification("Please insert category name and select color !");
      setUpdateErrorNotification(true);

      setTimeout(()=>{

        setMessageErrorNotification("");
        setUpdateErrorNotification(false);

      }, 3000);

    }else{

      let data = {

        "id" : idCategory,
        "category_name" : category,
        "category_color" : color,
        "category_updated_by" : "system"

      }

      await axios.put(Uri.rootUri + `/category/${idCategory}/update/`, data)
      .then(function(response:any){

        // console.log(response);

        setIdCategory("");
        setCategory("");
        setColor("");
        setMessageUpdateNotification("Success update");
        setUpdateNotification(true);
        setShowUpdate(false);
        _loadData();

        setTimeout(()=>{
          setMessageUpdateNotification("");
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

        setMessageDeleteNotification("");
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

  function _color(e:any){

    setColor(e.hex);

  }
  
  function _handleCloseModal(action: string){

    setIdCategory("");
    setCategory("");
    setColor("");

    switch (action) {
      case "update":
        setShowUpdate(false);
      break;
      case "delete":
        setShowDelete(false);
      break;
      default:
      break;
    }


  }

  useEffect(()=>{

    console.log("Use effect running");

    _loadData();

  },[]);

  return (
    <div className='Category'>
      {/* {console.log(getListCategoryData)} */}
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

              }
              </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Table
                     columns={columns} 
                     dataSource={dataSource} 
                    //  dataSource={getListCategoryData.data} 
                     pagination={false} 
                     size={"small"}
                     scroll={{ x: 'max-content',  y : 'max-content'}}
                    />
                </div>
            </div>
        </div>
             
          {/* delete category */} 
            <Modal show={showUpdate} onHide={()=>_handleCloseModal("update")}>
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
                  <div className="col-lg-12">
                  <div className="form-input mb-3">
                      <label htmlFor="color" className='mb-2 text-secondary'>Color</label>
                      <SliderPicker
                          onChangeComplete={_color}
                          color={color ? color : ""}
                      />
                  </div>
                </div>
              </div>
            </div>
            </Modal.Body>
              <Modal.Footer>
                <Button type="default" onClick={()=>_handleCloseModal("update")}>
                <i className="bi bi-1-circle-fill"></i> Cancel
                </Button>
                <Button type="primary" onClick={_updateData}>
                  Update
                </Button>
              </Modal.Footer>
            </Modal>

            <ModalPopupConfirmation
              action={"delete"}
              showPopup={showDelete}
              hidePopup={_handleCloseModal}
              titlePopup={"Confirmation"}
              textPopup={"Do you want to delete this data ?"}
              actionButton={_deleteData}
            />
    </div>
  )
}
