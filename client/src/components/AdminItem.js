import React from 'react'
import ItemCreateForm from './ItemCreateForm'
import TabbedComponent from './TabbedComponent'

const AdminItem = () => {
    return (
        <TabbedComponent
            label1 = "Add Items"
            label2 = "Edit Items"
            label3 = "Delete Items"
            state1 = {<ItemCreateForm/>}

        />
    )
}

export default AdminItem
