import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Input, Select, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Uri from '../../../Uri';
import Notification from '../../../utility/Notification';

export default function CreateDrug() {

    const { Option } = Select;
    const { TextArea } = Input;

    let [ categoryData, setCategoryData] = useState<any[]>([]);
    let [ childCategoryElement, setChildCategoryElement] = useState<any[]>([]);

    let [ drug, setDrug] = useState<string>("");
    let [ categoryId, setCategoryId] = useState<string>("");
    let [ stock, setStock] = useState<number>();
    let [ price, setPrice] = useState<number>();
    let [ benefit, setBenefit] = useState<string>("");
    let [ messageErrorNotification, setMessageErrorNotification] = useState<string>("");
    let [ messageSuccessNotification, setMessageSuccessNotification] = useState<string>("");
    let [ successNotification, setSuccessNotification] = useState<boolean>();
    let [ errorNotification, setErrorNotification] = useState<boolean>();

    let history = useHistory();

    function _goBack(e:any){

        e.preventDefault();

        history.push({
            "pathname" : `/Index/Drug`
        });

    }
    
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

            setStock(0);
        }

    }
    function _price(e:any){

        if(e.target.value){

            setPrice(e.target.value);

        }else{

            setPrice(0);
        }

    }
    function _benefit(e:any){

        if(e.target.value){

            setBenefit(e.target.value);

        }else{

            setBenefit("");
        }

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

    async function _saveData(e:any){
     
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

                "category_id" : categoryId,
                "drug_name" : drug,
                "drug_stock" : Number(stock),
                "drug_price" : Number(price),
                "drug_benefit": benefit,           
                "drug_created_by" : "system",
                "drug_updated_by" : "system",

            }

            await axios.post(Uri.rootUri + `/drug/`, data)
            .then(function(response:any){

                let dataResponse : any = response.data.data;

                setCategoryId("");

                setDrug("");

                setStock(undefined);

                setPrice(undefined);

                setBenefit("");
                
                setMessageSuccessNotification("Success create");

                setSuccessNotification(true);

                setTimeout(()=>{

                    setSuccessNotification(false);

                    setMessageSuccessNotification("");

                },3000);

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

    useEffect(()=>{

        _loadCategory();

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
                <div className='form-input mb-3'>
                    <label htmlFor="drug" className='mb-2 text-secondary d-flex'>Drug Name <i className="bi bi-asterisk text-danger" style={{fontSize:"8px"}}></i></label>
                    <Input id='drug' name='drug' onChange={_drug} value={drug ? drug : ""}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="category" className='mb-2 text-secondary d-flex'>Category <i className="bi bi-asterisk text-danger" style={{fontSize:"8px"}}></i></label>
                    <Select size={"middle"} style={{ width: "100%" }} id='category' onChange={_category} value={categoryId ? categoryId : ""}>
                        {childCategoryElement}
                    </Select>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="stock" className='mb-2 text-secondary d-flex'>Stock <i className="bi bi-asterisk text-danger" style={{fontSize:"8px"}}></i></label>
                    <Input type={'number'} id='stock' name='stock' onChange={_stock} value={stock && stock}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="price" className='mb-2 text-secondary d-flex'>Price <i className="bi bi-asterisk text-danger" style={{fontSize:"8px"}}></i></label>
                    <Input type={'number'} id='price' name='price' onChange={_price} value={price && price}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="benefit" className='mb-2 text-secondary'>Benefit</label>
                    <TextArea rows={3} id='benefit' name='benefit' onChange={_benefit} value={benefit ? benefit : ""}/>
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
