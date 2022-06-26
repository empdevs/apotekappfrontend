import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined, ConsoleSqlOutlined, InboxOutlined } from '@ant-design/icons'
import { Alert, Button, Input, message, Select, Upload } from 'antd'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Uri from '../../../Uri';
import cryptoRandomString from 'crypto-random-string';

export default function CreateDrug() {

    const { Option } = Select;
    const { TextArea } = Input;
    const { Dragger } = Upload;

    let history = useHistory();

    let [ elementCategory, setElementCategory] = useState<any[]>([]);
    let [ categoryId, setCategoryId] = useState<string>("");
    let [ dataCategory, setDataCategory] = useState<any[]>([]);
    let [ drug, setDrug] = useState<string>("");
    let [ stock, setStock] = useState<number>();
    let [ price, setPrice] = useState<number>();
    let [ benefit, setBenefit] = useState<string>("");
    let [ picture, setPicture] = useState<string>("");
    let [ messageErrorNotification, setMessageErrorNotification] = useState<string>("");
    let [ messageSuccessNotification, setMessageSuccessNotification] = useState<string>("");
    let [ successNotification, setSuccessNotification] = useState<boolean>();
    let [ errorNotification, setErrorNotification] = useState<boolean>();

    function _category(e:any){

        if(e){

            setCategoryId(e);

        }else{

            setCategoryId("");

        }

    }

    function _drug(e:any){

        // console.log(e.target.value);

        if(e.target.value){

            setDrug(e.target.value);
            
        }else{

            setDrug("");

        }

    }

    function _stock(e:any){

        // console.log(e.target.value);

        if(e.target.value){

            if(e.target.value < 0){

                setStock(0);

            }else{

                setStock(e.target.value);
                
            }

            
        }else{

            setStock(0);

        }

    }

    function _price(e:any){

        // console.log(e.target.value);

        if(e.target.value){

            if(e.target.value < 0){

                setPrice(0);

            }else{

                setPrice(e.target.value);
                
            }

            
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
 
    function _picture(e:any){

        let fileName = e.target.value;

        let validFormat = ["png","jpg","jpeg"]; 
        
        let formatFile = fileName.split(".").pop();

        console.log(formatFile);

        if(!validFormat.includes(formatFile)){

            message.error(`Format data not valid.`);

            setPicture("");

        }else{

            message.success(`Success upload file.`);

            setPicture(e.target.value);

        }

    }

    async function _saveData(e:any){

        e.preventDefault();

        // category.match(/^ *$/) !== null // check if but to detect null, empty or all-spaces only
        if((!categoryId || categoryId === "" || categoryId.match(/^ *$/) !== null) || 
           (!drug || drug === "" || drug.match(/^ *$/) !== null ) || 
           (!stock || stock < 0 ) || (!price || price < 0 ) || 
           (!picture || picture === "" || picture.match(/^ *$/) !== null )){

            setErrorNotification(true);

            setMessageErrorNotification("Please insert required file");

            setTimeout(()=>{

                setErrorNotification(false);

            }, 3000);

        }else{

            let formatFile = picture.split(".").pop();

            let newFileName = `${cryptoRandomString({length:10})}.${formatFile}`
        
            let data = {
                "category_id" : categoryId,
                "drug_name" :  drug,
                "drug_stock" : stock,
                "drug_price" : price,
                "drug_benefit" : benefit,
                "drug_picture" : newFileName,
                "drug_created_by" : "system",
                "drug_updated_by" : "system"
    
            }

            await axios.post(Uri.rootUri + `/drug/`, data)
            .then(function(response:any){

                console.log(response);
                
                setCategoryId("");

                setDrug("");

                setStock(undefined);

                setPrice(undefined);

                setBenefit("");

                setPicture("");

                setMessageSuccessNotification("Success create");
                
                setSuccessNotification(true);

                setTimeout(()=>{

                    setSuccessNotification(false);

                },3000);


            })
            .catch(function(error:any){

                console.log(error);

                setMessageErrorNotification(error.response.data.message);

                setErrorNotification(true);

                setTimeout(()=>{

                    setErrorNotification(false);

                }, 3000);

            });

        }
    }

    function _goBack(e:any){

        e.preventDefault();

        history.push({
            "pathname" : `/Index/Drug`
        });

    }

    async function _loadDataCategory(){

        let arrElement : any[] = [];
    
        await axios.get(Uri.rootUri + '/category')
        .then(function(response:any){
    
          let dataResponse = response.data.data;
    
          setDataCategory(dataResponse);

          dataResponse.map((item:any)=>{

            arrElement.push(<Option key={item.id}>{item.category_name}</Option>);

          });
          
          setElementCategory(arrElement);
        })
        .catch(function(error:any){
          
          console.log(error);
    
        });
    
      }

    useEffect(()=>{

        _loadDataCategory();

    },[]);
  return (
    <div className='createDrug'>
        <div className="row mb-2">
            <div className="col-lg-12">
                <div>
                    <Button className='d-flex align-items-center' onClick={_goBack}> <ArrowLeftOutlined className='m-0' /> Back</Button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h3>Create Drug</h3>
            </div>
        </div>
        {/* notification */}
        <div className="row mb-1">
            <div className="col-lg-12">
                { errorNotification &&

                    <Alert message={messageErrorNotification} type="error" showIcon closable/>

                }
                { successNotification &&

                    <Alert message={messageSuccessNotification} type="success" showIcon closable/>

                }
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className='form-input mb-3'>
                    <label htmlFor="category" className='mb-2 text-secondary'>Category</label>
                    <Select size={"middle"} onChange={_category} style={{ width: "100%" }} value={ categoryId ? categoryId : "" }>
                        {elementCategory}
                    </Select>
                </div>
            </div>
            <div className="col-lg-12">
                <div className='form-input mb-3'>
                    <label htmlFor="drug" className='mb-2 text-secondary'>Drug Name</label>
                    <Input id='drug' name='drug' onChange={_drug} value={drug ? drug : ""} required/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className='form-input mb-3'>
                    <label htmlFor="stock" className='mb-2 text-secondary'>Stock</label>
                    <Input id='stock' type={'number'} name='stock' onChange={_stock} value={stock ? stock : 0}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className='form-input mb-3'>
                    <label htmlFor="price" className='mb-2 text-secondary'>Price</label>
                    <Input id='price' type={'number'} name='price' onChange={_price} value={price && price}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className='form-input mb-3'>
                    <label htmlFor="benefit" className='mb-2 text-secondary'>Benefit</label>
                    <TextArea rows={4} name='benefit' onChange={_benefit} value={benefit ? benefit : ""} />
                </div>
            </div>
            <div className="col-lg-12">
                <div className='form-input mb-3'>
                    <label htmlFor="benefit" className='mb-2 text-secondary'>Image</label>
                    <input type="file" className='form-control' onChange={_picture} value={picture ? picture : ""}/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className='text-end'>
                    <Button type="primary" className='align-items-center' onClick={_saveData}>Create</Button>
                </div>
            </div>
        </div>
    </div>
  )
}
