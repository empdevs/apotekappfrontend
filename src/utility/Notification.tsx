
import React from 'react'
import { Alert } from 'antd'

export default function Notification(props:any) {
    
    return (
        <Alert 
         message={props.message} 
         type={props.type}
         showIcon={props.showIcon}
         closable={props.closable}
        />
    )
}