import {React} from 'react'
import TabbedComponent from './TabbedComponent'
import CategoryCreateForm from './CategoryCreateForm'
import CategoryEditForm from './CategoryEditForm' 
import CategoryDeleteForm from './CategoryDeleteForm'

const AdminCategory = () => {

    return(
        <TabbedComponent
            label1 = "Create Category"
            label2 = "Edit Categories"
            label3 = "Delete Category"
            state1 = {<CategoryCreateForm/>}
            state2 = {<CategoryEditForm/>}
            state3 = {<CategoryDeleteForm/>}
        />
    )
    
}

export default AdminCategory
