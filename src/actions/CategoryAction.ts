import axios from "axios";
import { GET_LIST_CATEGORY } from "../types";
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