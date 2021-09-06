import {React} from 'react'
import TabbedComponent from './TabbedComponent'
import CategoryCreateForm from './CategoryCreateForm'
import CategoryEditForm from './CategoryEditForm'

const AdminCategory = () => {

    return(
        <TabbedComponent
            label1 = "Create Category"
            label2 = "Edit Categories"
            state1 = {<CategoryCreateForm/>}
            state2 = {<CategoryEditForm/>}
        />
    )
    
}

export default AdminCategory
