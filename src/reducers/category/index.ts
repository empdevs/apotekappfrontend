import { GET_LIST_CATEGORY } from "../../actions/CategoryAction"

const initialState = {

    getListCategoryData : false,
    getListCategoryLoading : false,
    getListCategoryError : false,
 
}

const category = (state= initialState, action: any ) => {

    switch (action) {
        case GET_LIST_CATEGORY:
            return {...state,
                getListCategoryLoading : action.payload.loading,
                getListCategoryData : action.payload.data,
                getListCategoryError : action.payload.errorMessage
            }    
        break;
    
        default:
            break;
    }

}

export default category