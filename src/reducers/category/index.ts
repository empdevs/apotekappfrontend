import { GET_LIST_CATEGORY, CREATE_CATEGORY } from "../../types";

const initialState = {

    getListCategoryData : false,
    getListCategoryLoading : false,
    getListCategoryError : false,

    createCategorySuccess : false,
    createCategoryLoading : false,
    createCategoryError: false,
 
}

const category = (state = initialState , action: any ) => {
    // console.log(action.type);
    switch (action.type) {
        case GET_LIST_CATEGORY:
            // console.log("3. Sign reducers");
            return {...state,
                getListCategoryLoading : action.payload.loading,
                getListCategoryData : action.payload.data,
                getListCategoryError : action.payload.error
            }    
        break;
        case CREATE_CATEGORY:
            return { ...state,
                createCategorySuccess : action.payload.success,
                createCategoryLoading : action.payload.loading,
                createCategoryError : action.payload.error
            }
        default:
            return state
        break;
    }

}

export default category