import axios from "axios";

export const GET_LIST_CATEGORY = "GET_LIST_CATGEORY";


export function getListCategory(){

    return async (dispacth:any) => {    

        dispacth({
            type : GET_LIST_CATEGORY,
            payload : {

                loading : true,
                data : false,
                errorMessage : false

            }
        })

    }

}