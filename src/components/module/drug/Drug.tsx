import React, { useEffect, useState } from 'react'
import { Button, Image, Input, Select, Table, Tag } from 'antd'
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, PlusOutlined, StockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Uri from '../../../Uri';
import DrugType from '../../../utility/TypesInterfaces';
import Helper from '../../../utility/Helper';
import Dropzone from 'react-dropzone';
import Notification from '../../../utility/Notification';
import { Modal } from 'react-bootstrap';

export default function Drug() {

  let [ dataSource, setDataSource] = useState<DrugType[]>([]);
  let [ messageErrorNotification, setMessageErrorNotification] = useState<string>("");
  let [ messageSuccessNotification, setMessageSuccessNotification] = useState<string>("");
  let [ updateErrorNotification, setUpdateErrorNotification] = useState<boolean>();
  let [ successNotification, setSuccessNotification] = useState<boolean>();
  let [ errorNotification, setErrorNotification] = useState<boolean>();
  let [ drugId, setDrugId] = useState<string>("");
  let [ categoryId, setCategoryId] = useState<string>("");
  let [ drug, setDrug] = useState<string>("");
  let [ stock, setStock] = useState<number>();
  let [ price, setPrice] = useState<number>();
  let [ picture, setPicture] = useState<string>("");
  let [ benefit, setBenefit] = useState<string>("");
  let [ showUpdate, setShowUpdate] = useState<boolean>();
  let [ categoryData, setCategoryData] = useState<any[]>([]);
  let [ childCategoryElement, setChildCategoryElement] = useState<any[]>([]);
  let [ showDialogDelete, setShowDialogDelete] = useState<boolean>();
  let [ showDelete, setShowDelete] = useState<boolean>();

  const { Option } = Select;
  const { TextArea } = Input;

  function _drug(e:any){

    if(e.target.value){

      setDrug(e.target.value);

    }else{

      setDrug("");

    }    
    
  }
  function _category(value:any){

    if(value){

      setCategoryId(value);

    }else{

      setCategoryId("");

    }

  }
  function _stock(e:any){

    if(e.target.value){

      setStock(e.target.value);

    }else{

      setStock(undefined);

    }

  }
  function _price(e:any){

    if(e.target.value){

      setPrice(e.target.value);

    }else{

      setPrice(undefined);

    }

  }
  function _benefit(e:any){

    if(e.target.value){

      setBenefit(e.target.value);

    }else{

      setBenefit("");
        
    }

  }

  async function _uploadImage(file:any, record:any){

    let validExt : any[] = ["jpg", "jpeg", "png"];
    let fileInput = file[0];
    let fileInputExt = fileInput.name.split('.').pop();

    if(!validExt.includes(fileInputExt)){

      // console.log("Error");

      setMessageErrorNotification("Please input with extension format ( jpg, jpeg, png )");

      setErrorNotification(true);

      setTimeout(()=>{

        setErrorNotification(false);

        setMessageErrorNotification("");

      }, 3000);
      

    }else{
      
      const formData = new FormData();

      formData.append("file",fileInput);

      await axios.post(Uri.rootUri + `/drug/${record.id}/upload/`, formData)
      .then(function(response:any){

        console.log(response);

        setMessageSuccessNotification("Success upload image");

        setSuccessNotification(true);

        _loadData();

        setTimeout(()=>{

          setSuccessNotification(false);

          setMessageSuccessNotification("");

        }, 3000);


      })      
      .catch(function(error:any){

        console.log(error);

        setMessageErrorNotification(error.response.data.message);

        setErrorNotification(true);

        setTimeout(()=>{

          setErrorNotification(false);

          setMessageErrorNotification("");

        }, 3000);

      });
     

    }
    
  }
    
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

            return (
              <div className='text-center d-flex justify-content-center align-items-center'>
                <div style={{marginRight:'10px'}}>
                  <Image src={`${Uri.hostUri}/static/drug_images/${text}`} style={{
                    width : '100px',
                    height: '50px',
                  }}/>
                </div>
                <div style={{
                  height: '25px'
                }}>
                  <a onClick={(e:any)=>{
                    setDrugId(record.id);
                    setPicture(record.drug_picture);
                    setShowDialogDelete(true);
                  }}>
                    <DeleteOutlined className='text-primary' />
                  </a>
                </div>
              </div>
            )

          } else{

            return(

              <Dropzone
                onDrop={(file:any)=>_uploadImage(file, record)}
              >
                {({getRootProps, getInputProps}) => (
                  <div className='styleDropzone'>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className='text-center my-1'>
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

              setDrugId(record.id);
              setCategoryId(record.category_id);
              setDrug(record.drug_name);
              setStock(record.drug_stock);
              setPrice(record.drug_price);
              setBenefit(record.drug_benefit);
              setPicture(record.drug_picture);
              setShowUpdate(true);

            }}>
              <EditOutlined />
            </button>
            <button className='btn btn-danger d-flex align-items-center mx-1' onClick={(e:any)=>{

              setDrugId(record.id);
              setPicture(record.drug_picture);
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

    await axios.get(Uri.rootUri + `/drug/`)
    .then(function(response:any){

      let dataResponse : any = response.data.data;

      setDataSource(dataResponse);

    })
    .catch(function(error:any){

      console.log(error);

    });


  }
  async function _loadCategory(){

    let arrElement : any [] = [];

    await axios.get(Uri.rootUri + '/category')
    .then(function(response:any){

        let dataResponse = response.data.data;
        
        dataResponse.forEach((item:any)=>{

            arrElement.push(
            <Option key={item.id}>
                <Tag color={item.category_color}>
                    {item.category_name}
                </Tag>
            </Option>
            );

        });

        setChildCategoryElement(arrElement);

        setCategoryData(dataResponse);

    })
    .catch(function(error:any){

        console.log(error);

    });

  }

  async function _updateData(e:any){

    e.preventDefault();

    if(!categoryId || categoryId.match(/^ *$/) !== null ||
        !drug || drug.match(/^ *$/) !== null || 
        !stock || stock <= 0 ||
        !price || price <= 0
    ){

     setMessageErrorNotification("Please fill in the fields correctly and stock at least one !");

     setErrorNotification(true);

     setTimeout(()=>{

         setErrorNotification(false);

         setMessageErrorNotification("");

     }, 3000);

  }else{

    let data = {
      "id" : drugId,
      "drug_name" : drug,
      "category_id" : categoryId,
      "drug_stock" : Number(stock),
      "drug_price" : Number(price),
      "drug_benefit" : benefit,
      "drug_picture" : picture,
      "drug_updated_by" : "system"


    }

    await axios.put(Uri.rootUri + `/drug/${drugId}/update/`, data)
    .then(function(response:any){

      setShowUpdate(false);

      setDrugId("");

      setDrug("");

      setCategoryId("");

      setStock(undefined);

      setPrice(undefined);

      setPicture("");

      setBenefit("");

      setMessageSuccessNotification("Success update data");

      setSuccessNotification(true);

      _loadData();

      setTimeout(()=>{

        setSuccessNotification(false);

        setMessageSuccessNotification("");

      },3000);
      

    })
    .catch(function(error){

      console.log(error);

    });


  }

}

async function _deleteImage(e:any){

  e.preventDefault();

  let data = {
    "id" : drugId,
    "drug_picture" : picture,
    "drug_updated_by" : "system"

  }

  await axios.put(Uri.rootUri + `/drug/${drugId}/images/delete/`, data)
  .then(function(response:any){

    console.log(response);

    setShowDialogDelete(false);

    setDrugId("");

    setPicture("");

    setMessageSuccessNotification("Success delete image");

    setSuccessNotification(true);

    _loadData();

    setTimeout(()=>{

      setSuccessNotification(false);

      setMessageSuccessNotification("");

    },3000);



  })
  .catch(function(error){

    console.log(error);

  });

}


async function _deleteData(e:any){


  let data = {

    "id": drugId,
    "drug_picture" : picture,
    "drug_deleted_by" : "system"

  }
  
  await axios.put(Uri.rootUri + `/drug/${drugId}/delete/`, data)
  .then(function(response:any){

    console.log(response);
    
    setShowDelete(false);

    setDrugId("");

    setPicture("");

    setMessageSuccessNotification("Success delete data");

    setSuccessNotification(true);

    _loadData();

    setTimeout(()=>{

      setSuccessNotification(false);

      setMessageSuccessNotification("");

    }, 3000); 

  })
  .catch(function(error:any){

    console.log(error);

  });

}

  function _handleCloseUpdate(){

    setDrugId("");

    setCategoryId("");

    setStock(undefined);

    setPrice(undefined);

    setBenefit("");

    setPicture("");

    setShowUpdate(false);

    setUpdateErrorNotification(false);

  }

  function _handleCloseDialogDelete(){

    setDrugId("");

    setCategoryId("");

    setStock(undefined);

    setPrice(undefined);

    setBenefit("");

    setPicture("");

    setShowDialogDelete(false);

  }

  function _handleCloseDelete(){

    setDrugId("");

    setPicture("");

    setShowDelete(false);

  }
  useEffect(()=>{

    _loadData();
    _loadCategory();

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
            <div className="row mb-1">
              <div className="col-lg-12">
                { errorNotification &&

                  <Notification
                      message={messageErrorNotification}
                      type="error"
                      showIcon={true}
                      closable={true}
                  />

                }
                { successNotification &&

                  <Notification
                    message={messageSuccessNotification}
                    type="success"
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
                     pagination={false} 
                     size={"small"}
                     scroll={{ x: 'max-content',  y : 'max-content'}}
                    />
                </div>
            </div>
        </div>
        
        {/* //update */}
        <Modal show={showUpdate} onHide={_handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Drug</Modal.Title>
              </Modal.Header>
            <Modal.Body>
            <div className="row mb-2">
              <div className="col-lg-12">
                { updateErrorNotification &&
                  <Notification 
                    message={messageErrorNotification} 
                    type="error" 
                    showIcon={true} 
                    closable={true}
                  />
                }
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                  <div className='form-input mb-3'>
                      <label htmlFor="drug" className='mb-2 text-secondary'>Drug</label>
                      <Input id='drug' name='drug' onChange={_drug} value={drug ? drug : ""}/>
                  </div>
                  <div className='form-input mb-3'>
                      <label htmlFor="category" className='mb-2 text-secondary d-flex'>Category <i className="bi bi-asterisk text-danger" style={{fontSize:"8px"}}></i></label>
                      <Select size={"middle"} style={{ width: "100%" }} id='category' onChange={_category} value={categoryId ? categoryId : ""} getPopupContainer={node => node.parentNode}>
                          {childCategoryElement}
                      </Select>
                  </div>
                  <div className='form-input mb-3'>
                      <label htmlFor="stock" className='mb-2 text-secondary'>Stock</label>
                      <Input type='number' id='stock' name='stock' onChange={_stock} value={stock && stock}/>
                  </div>
                  <div className='form-input mb-3'>
                      <label htmlFor="price" className='mb-2 text-secondary'>Price</label>
                      <Input type='number' id='price' name='price' onChange={_price} value={price && price}/>
                  </div>
                  <div className='form-input mb-3'>
                    <label htmlFor="benefit" className='mb-2 text-secondary'>Benefit</label>
                    <TextArea rows={3} id='benefit' name='benefit' onChange={_benefit} value={benefit ? benefit : ""}/>
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
        {/* delete data */}
        <Modal show={showDelete} onHide={_handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-lg-12">
                  <p>Do you want to delete this data ?</p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className='btn btn-secondary' onClick={_handleCloseDelete}>
                Cancel
              </button> 
              <button className='btn btn-primary' onClick={_deleteData}>
                Ok
              </button>
            </Modal.Footer>
        </Modal>
        {/* delete image */}
        <Modal show={showDialogDelete} onHide={_handleCloseDialogDelete}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
            <Modal.Body>
            <div className="row">
              <div className="col-lg-12">
                <p>Do you want to delete this image ?</p>
              </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
              <button className='btn btn-secondary' onClick={_handleCloseDialogDelete}>
                Cancel
              </button> 
              <button className='btn btn-primary' onClick={_deleteImage}>
                Ok
              </button>
            </Modal.Footer>
        </Modal>
        
    </div>
  )
}