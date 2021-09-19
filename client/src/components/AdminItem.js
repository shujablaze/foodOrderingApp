import React from 'react'
import ItemCreateForm from './ItemCreateForm'
import TabbedComponent from './TabbedComponent'
import DeleteItemForm from './DeleteItemForm'
import ItemEditForm from './ItemEditForm'

const AdminItem = () => {
    return (
        <TabbedComponent
            label1 = "Add Items"
            label2 = "Edit Items"
            label3 = "Delete Items"
            state1 = {<ItemCreateForm/>}
            state2 = {<ItemEditForm/>}
            state3 = {<DeleteItemForm/>}
        />
    )
}

export default AdminItem
