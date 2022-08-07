import { Button } from "antd";
import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalPopupConfirmation(props:any){
    // console.log(props);
    return(
        <Modal show={props.showPopup} onHide={()=>props.hidePopup(props.action)}>
            <Modal.Header closeButton>
                <Modal.Title>{props.titlePopup}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-12">
                        <p>{props.textPopup}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type="default" onClick={()=>props.hidePopup(props.action)}>
                    Cancel
                </Button> 
                <Button type="primary"  onClick={props.actionButton}>
                  Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )

}