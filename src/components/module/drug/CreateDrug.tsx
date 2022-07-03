import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Input, Select } from 'antd'
import { useHistory } from 'react-router-dom'

export default function CreateDrug() {

    const { Option } = Select;
    const { TextArea } = Input;

    let history = useHistory();

    function _goBack(e:any){

        e.preventDefault();

        history.push({
            "pathname" : `/Index/Drug`
        });

    }

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
                    <Input/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="category" className='mb-2 text-secondary'>Category</label>
                    <Select size={"middle"} style={{ width: "100%" }}>
                        {/* {children} */}
                    </Select>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="stock" className='mb-2 text-secondary'>Stock</label>
                    <Input type={'number'}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="price" className='mb-2 text-secondary'>Price</label>
                    <Input type={'number'}/>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-input mb-3">
                    <label htmlFor="benefit" className='mb-2 text-secondary'>Benefit</label>
                    <TextArea rows={3} />
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
