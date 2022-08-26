export default interface CategoryType {

    id : string,
    category_number : number,
    category_name : string,
    category_color : string,
    category_created_at : string,
    category_created_by : string,
    category_updated_at : string,
    category_updated_by : string

}

export default interface DrugType {

    id : string,
    category_id : string,
    category_color : string,
    category_name : string,
    drug_number : number,
    drug_name : string,
    drug_picture : string,
    drug_stock : number,
    drug_price : number,
    drug_benefit : string,
    drug_created_at : string,
    drug_created_by : string,
    drug_updated_at : string,
    drug_updated_by : string
}

export const MenuSidebarKey = {

    dashboard : 1,
    category : 2,
    drug : 3,
    user : 4

}