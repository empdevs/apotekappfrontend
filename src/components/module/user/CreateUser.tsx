import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom';

export default function CreateUser() {

    let history : any = useHistory();
    
    function _goBack(e:any){

        e.preventDefault();

        history.push({
            "pathname" : `/Index/User`
        });

    }

  return (
    <div className='createUser'>
        <div className="row mb-2">
            <div className="col-lg-12">
                <div>
                    <Button className='d-flex align-items-center' onClick={_goBack}> <ArrowLeftOutlined className='m-0' /> Back</Button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <h3>Create User</h3>
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
            <div className="col-lg-6">
                <div className='form-input mb-3'>
                    <label htmlFor="username" className='mb-2 text-secondary'>Username</label>
                    <Input id='username' name='username'/>
                </div>
            </div>
            <div className="col-lg-6">
                <div className='form-input mb-3'>
                    <label htmlFor="email" className='mb-2 text-secondary'>Email</label>
                    <Input id='email' name='email'/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6">
                <div className='form-input mb-3'>
                    <label htmlFor="phone" className='mb-2 text-secondary'>Number Phone</label>
                    <Input id='phone' name='phone'/>
                </div>
            </div>
            <div className="col-lg-6">
                <div className='form-input mb-3'>
                    <label htmlFor="roles" className='mb-2 text-secondary'>Roles</label>
                    <Input id='roles' name='roles'/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6">
                <div className='form-input mb-3'>
                    <label htmlFor="password" className='mb-2 text-secondary'>Password</label>
                    <Input id='password' name='password'/>
                </div>
            </div>
            <div className="col-lg-6">
                <div className='form-input mb-3'>
                    <label htmlFor="confirmPassword" className='mb-2 text-secondary'>Confirm Password</label>
                    <Input id='confirmPassword' name='confirmPassword'/>
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
