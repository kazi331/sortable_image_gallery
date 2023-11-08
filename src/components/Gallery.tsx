import {
    DndContext,
    DragMoveEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    rectSortingStrategy
} from '@dnd-kit/sortable';
import { useState } from 'react';
import styles from '../styles/gallery.module.css';
import GridItem from './GridItem';

import { toast } from 'sonner';
import images from '../data/data.json';
import { itemType } from '../utils/types';
import AddItem from './AddItem';
import Empty from './Empty';
import Header from './Header';



const Gallery = () => {
    const [selected, setSelected] = useState<number[]>([])
    const [data, setData] = useState<itemType[]>(images);

    //     SENSORS TO HANDLE DRAG AND DROP
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            }
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor),
    );
    // HANDLE SELECTION
    const handleSelection = (id: number) => {
        // insert new id if it is not already exist in the array
        setSelected(prev => prev.includes(id) ? selected.filter(item => item !== id) : [...prev, id])
    }
    // HANDLE DELETE ACTION
    const handleDelete = () => {
        setData(prev => prev.filter(item => !selected.includes(item.id)))
        // OPTIONAL TOAST MESSAGE
        toast.success(`${selected.length === data.length ? 'All' : selected.length} ${selected.length > 1 ? "items" : "item"} deleted successfully`, {
            dismissible: true,
            action: selected.length === data.length ? {
                label: 'Reload Page',
                onClick: () => {
                    window.location.reload()
                    setSelected([])
                },
            } : undefined
        })
        setSelected([])
    }
    // HANDLE DRAG END
    const handleDragEnd = ({ active, over }: DragMoveEvent) => {
        if (active.id !== over?.id) {
            setData(items => {
                const oldIndex = items.findIndex(item => item.id === active.id)
                const newIndex = items.findIndex(item => item.id === over?.id)
                return arrayMove(items, oldIndex, newIndex);
            })
        }
    }

    //  SELECT ALL
    const selectAll = () => {
        if (selected.length === data.length) return setSelected([])
        setSelected(data.map(item => item.id))
    }


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={data} strategy={rectSortingStrategy} >
                <Header
                    selected={selected}
                    setSelected={setSelected}
                    selectAll={selectAll}
                    handleDelete={handleDelete}
                    checked={selected.length === data.length}
                />
                <div className={styles.wrapper}>
                    {/* main container */}
                    <div className={styles.container}>
                        {
                            data.length > 0 ?
                                data.map(item => (
                                    <GridItem
                                        key={item.id}
                                        item={item}
                                        handleSelection={handleSelection}
                                        selected={selected} />
                                )) : <Empty />
                        }
                        <AddItem />
                    </div>
                </div>
            </SortableContext>
        </DndContext>
    )
}



export default Gallery