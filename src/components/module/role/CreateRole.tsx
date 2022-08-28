import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom';

export default function CreateRole() {

    let history : any = useHistory();
    
    function _goBack(e:any){

        e.preventDefault();

        history.push({
            "pathname" : `/Index/Role`
        });

    }

  return (
    <div className='createRole'>
        <div className="row mb-2">
            <div className="col-lg-12">
                <div>
                    <Button className='d-flex align-items-center' onClick={_goBack}> <ArrowLeftOutlined className='m-0' /> Back</Button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h3>Create Role</h3>
            </div>
        </div>
        {/* notification */}
        <div className="row mb-1">
            <div className="col-lg-12">
                {/* { errorNotification &&

                    <Notification
                        message={messageErrorNotification}
                        type={"error"}
                        showIcon={true}
                        closable={true}
                    />

                }
                { successNotification &&

                    <Notification
                        message={messageSuccessNotification}
                        type={"success"}
                        showIcon={true}
                        closable={true}
                    />

                } */}
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className='form-input mb-3'>
                    <label htmlFor="role" className='mb-2 text-secondary'>Role</label>
                    <Input id='role' name='role'/>
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
