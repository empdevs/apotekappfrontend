import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Input, Select, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Uri from '../../../Uri';

export default function CreateDrug() {

    const { Option } = Select;
    const { TextArea } = Input;

    let [ categoryData, setCategoryData] = useState<any[]>([]);
    let [ childCategoryElement, setChildCategoryElement] = useState<any[]>([]);

    let [ drug, setDrug] = useState<string>("");
    let [ categoryId, setCategoryId] = useState<string>("");
    let [ stock, setStock] = useState<string>("");
    let [ price, setPrice] = useState<string>("");
    let [ benefit, setBenefit] = useState<string>("");

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
    function _category(e:any){
       
        if(e){

            setCategoryId(e);

        }else{

            setCategoryId("");
        }

    }
    function _stock(e:any){

        if(e.target.value){

            setStock(e.target.value);

        }else{

            setStock("");
        }

    }
    function _price(e:any){

        if(e.target.value){

            setPrice(e.target.value);

        }else{

            setPrice("");
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
                {/* { errorNotification &&

                    <Alert message={messageErrorNotification} type="error" showIcon closable/>

                }
                { successNotification &&

                    <Alert message={messageSuccessNotification} type="success" showIcon closable/>

                } */}
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className='form-input mb-3'>
                    <label htmlFor="drug" className='mb-2 text-secondary'>Drug Name</label>
                    <Input id='drug' name='drug' onChange={_drug} value={drug ? drug : ""}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="category" className='mb-2 text-secondary'>Category</label>
                    <Select size={"middle"} style={{ width: "100%" }} id='category' onChange={_category} value={categoryId ? categoryId : ""}>
                        {childCategoryElement}
                    </Select>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="stock" className='mb-2 text-secondary'>Stock</label>
                    <Input type={'number'} id='stock' name='stock' onChange={_stock} value={stock ? stock : 0}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="price" className='mb-2 text-secondary'>Price</label>
                    <Input type={'number'} id='price' name='price' onChange={_price} value={price && price}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="benefit" className='mb-2 text-secondary'>Benefit</label>
                    <TextArea rows={2} id='benefit' name='benefit' onChange={_benefit} value={benefit ? benefit : ""}/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className='text-end'>
                    <Button type="primary" className='align-items-center'>Create</Button>
                </div>
            </div>
        </div>
    </div>
  )
}
