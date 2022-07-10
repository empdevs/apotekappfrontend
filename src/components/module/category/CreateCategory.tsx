import React, { useEffect, useState } from 'react'
import Input from 'antd/lib/input/Input'
import { Button, Alert } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import Uri from '../../../Uri';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SliderPicker } from 'react-color';
// import { createCategory } from '../../../actions/CategoryAction';
// import { useDispatch, useSelector } from 'react-redux';

export default function CreateCategory() {

    let history = useHistory();

    // const dispatch : any = useDispatch();

    // const { createCategorySuccess, createCategoryError, createCategoryLoading } : any = useSelector((state:any)=> state.CategoryReducer); //redux

    let [ category, setCategory] = useState<string>("");
    let [ color, setColor] = useState<string>("");
    let [ messageErrorNotification, setMessageErrorNotification] = useState<string>("");
    let [ messageSuccessNotification, setMessageSuccessNotification] = useState<string>("");
    let [ successNotification, setSuccessNotification] = useState<boolean>();
    let [ errorNotification, setErrorNotification] = useState<boolean>();

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

    async function _saveData(e:any){

        e.preventDefault();
        
        if(!category || category === "" || category.match(/^ *$/) !== null || !color || color.match(/^ *$/) !== null){

            setErrorNotification(true);

            setMessageErrorNotification("Please insert category name and select color !");

            setTimeout(()=>{
                
                setErrorNotification(false);
                
                setMessageErrorNotification("");

            }, 3000);

        }else{

        
            let data = {

                "category_name" :  category,
                "category_color" : color,
                "category_created_by" : "system",
                "category_updated_by" : "system"
    
            }

            // await dispatch(createCategory(data)); //redux

            await axios.post(Uri.rootUri + `/category/`, data)
            .then(function(response:any){

                console.log(response);
                
                setCategory("");

                setColor("");

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

    function _goBack(e:any){

        e.preventDefault();

        history.push({
            "pathname" : `/Index/Category`
        });

    }

    useEffect(()=>{

        setColor("#3b2d86");

    },[]);

  return (
    <div className='createCategory'>
        <div className="row mb-2">
            <div className="col-lg-12">
                <div>
                    <Button className='d-flex align-items-center' onClick={_goBack}> <ArrowLeftOutlined className='m-0' /> Back</Button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h3>Create Category</h3>
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
                    <label htmlFor="category" className='mb-2 text-secondary'>Category Name</label>
                    <Input id='category' name='category' onChange={_category} value={category ? category : ""}/>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="form-input mb-3">
                    <label htmlFor="color" className='mb-2 text-secondary'>Color</label>
                    <SliderPicker
                        onChangeComplete={_color}
                        color={color ? color : "#3b2d86"}
                    />
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
