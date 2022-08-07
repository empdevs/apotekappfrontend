import { Card, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsDashCircleFill, BsColumnsGap } from 'react-icons/bs';
import Uri from '../../../Uri';
import CategoryType from '../../../utility/TypesInterfaces';
import DrugType from '../../../utility/TypesInterfaces';

export default function Dashboard() {
    
  let [loading, setLoading] = useState<boolean>();
  let [drugTotal, setDrugTotal] = useState<number>();
  let [categoryTotal, setCategoryTotal] = useState<number>();


  function CardInformation(props:any){

    return(
        <Skeleton loading={props.loading}>

                <div style={{   width:"100%" , 
                                backgroundColor:props.backgroundColorTitle, 
                                height: "40px", 
                                border:"1px solid #f0f0f0", 
                                color:props.colorText, 
                                fontWeight:'bold', 
                                padding: '4px 24px',
                               
                            }}>
                    <h4 className='text-white m-0'>{props.title}</h4>
                </div>
            <div>
                <Card>
                    {props.content}
                </Card>
            </div>
        </Skeleton>
    )
  }


  async function _loadDrug(){

    setLoading(true);
    
    await axios.get(Uri.rootUri + `/drug/`)
    .then(function(response:any){

      let dataResponse : DrugType[] = response.data.data;

      setDrugTotal(dataResponse.length);

      setLoading(false);

    })
    .catch(function(error:any){

      console.log(error);

    });
  }

  async function _loadCategory(){

    setLoading(true);

    await axios.get(Uri.rootUri + '/category')
    .then(function(response:any){

      let dataResponse : CategoryType[] = response.data.data;

      setCategoryTotal(dataResponse.length);

      setLoading(false);

    })
    .catch(function(error:any){

      console.log(error);

    });
  }

  useEffect(()=>{

    _loadDrug();
    _loadCategory();

  },[]);

  return (
    <div className='Dashboard'>
        <div className="header mb-3">
            <div className="row">
                <div className="col-lg-12">
                    <h3>Dashboard</h3>
                </div>
            </div>
        </div>
        <div className="main">
            <div className="row">
                <div className="col-lg-3">
                    <CardInformation
                        loading={loading}
                        title={"Drug"}
                        backgroundColorTitle={"#039e32"}
                        colorText={"#fff"}
                        content={
                            <div className='d-flex align-items-center'>  
                                <BsDashCircleFill style={{color:"#039e32", transform: 'rotate(140deg)', fontSize: '24px'}} className="mx-2"/>
                                <h5 className='m-0'>{drugTotal}</h5>
                            </div>
                        }
                    />
                </div>
                <div className="col-lg-3">
                    <CardInformation
                        loading={loading}
                        title={"Category"}
                        backgroundColorTitle={"#009dff"}
                        colorText={"#fff"}
                        content={
                            <div className='d-flex align-items-center'>  
                                <BsColumnsGap style={{color:"#009dff", fontSize: '24px'}} className="mx-2"/>
                                <h5 className='m-0'>{categoryTotal}</h5>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
