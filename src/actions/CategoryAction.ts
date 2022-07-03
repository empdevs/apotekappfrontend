import axios from "axios";
import { GET_LIST_CATEGORY, CREATE_CATEGORY } from "../types";
import Uri from "../Uri";


export function getListCategory(){

    return async (dispacth: any) => {    

        // console.log("1. In action");

        dispacth({
            type : GET_LIST_CATEGORY,
            payload : {

                loading : true,
                data : false,
                error : false

            }
        });

        await axios.get(`${Uri.rootUri}/category`)
        .then(function(response:any){
            
            // console.log(response);

            // console.log("2. Success get category");

            let dataResponse : any = response.data;

            dispacth({
                type : GET_LIST_CATEGORY,
                payload : {

                    loading :  false,
                    data : dataResponse,
                    error : false

                }
            })

        })
        .catch(function(error:any){

            console.log(error);

            dispacth({
                type : GET_LIST_CATEGORY,
                payload : {

                    loading :  false,
                    data : false,
                    error : error.toJSON()

                }
            })

        });

    }

}

export function createCategory(data:any){

    return async (dispatch:any) => {

        dispatch({
            type : CREATE_CATEGORY,
            payload : {
                loading : true,
                success : false,
                error : false
            }
        });

        let dataPost = {

            "category_name" :  data.category_name,
            "category_color" : data.category_color,
            "category_created_by" : data.category_created_by,
            "category_updated_by" : data.category_updated_by

        }

        await axios.post(Uri.rootUri + `/category/`, dataPost)
        .then(function(response:any){

            // console.log(response);
            
            dispatch({
                type : CREATE_CATEGORY,
                payload : {
                    loading : false,
                    success : true,
                    error : false,
                }
            })

        })
        .catch(function(error:any){

            console.log(error);

            dispatch({
                type : CREATE_CATEGORY,
                payload : {
                    loading : false,
                    success : false,
                    error : true,
                }
            })

        });

    }

}