import React from 'react'
import { FormElement } from './FormElements'
import { Button } from '@mui/material'
import { useDraggable } from '@dnd-kit/core'

const SidebarBtnElement = (
    { formElement }: { formElement: FormElement }) => {
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true,
        }
    })
    const { label, icon: Icon } = formElement.designerBtnElement
    return (

        <Button ref={draggable.setNodeRef} variant="outlined"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px', height: '120px',
                width: '120px',
                cursor: 'grab',
                border: draggable.isDragging ? '1px solid black' : ''
            }}

            startIcon={<Icon />}
            {...draggable.attributes}
            {...draggable.listeners}
        >
            {label}
        </Button>
    )
}

export const SidebarBtnElementDragOverlay = (
    { formElement }: { formElement: FormElement }) => {


    const { label, icon: Icon } = formElement.designerBtnElement
    return (

        <Button variant="outlined"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px', height: '120px',
                width: '120px',
                cursor: 'grab',

            }}

            startIcon={<Icon />}

        >
            {label}
        </Button>
    )
}

export default SidebarBtnElement