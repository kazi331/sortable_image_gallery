import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import styles from '../styles/gallery.module.css';
type propsType = {
    selected: number[],
    selectAll: () => void,
    handleDelete: () => void
    checked?: boolean,
    setSelected: Dispatch<SetStateAction<number[]>>,
}
const Header = ({ selected, handleDelete, selectAll, checked, setSelected }: propsType) => {
    const confirm = () => {
        toast.custom(() => <div className='confirm-modal'>
            <Icon />
            <div className="msg">
                <p className='title'>Are you sure to delete selected {selected.length > 1 ? "items" : "item"}?</p>
                <p className='desc'> This action cannot be undone!</p>
            </div>
            <div className='action'>
                <button onClick={() => toast.dismiss('confirm')} className="cancel">Cancel</button>
                <button onClick={() => {
                    handleDelete()
                    toast.dismiss('confirm')
                }} className="delete">Delete</button>
            </div>
        </div >, {
            duration: 20000,
            onAutoClose: () => setSelected([]),
            position: 'top-center',
            id: 'confirm',
        })
    }

    const style = {
        "-webkit-transform": selected.length > 0 ? 'translateY(0.5rem)' : 'translateY(-2.8rem)',
        "-ms-transform": selected.length > 0 ? 'translateY(0.5rem)' : 'translateY(-2.8rem)',
        "transform": selected.length > 0 ? 'translateY(0.5rem)' : 'translateY(-2.8rem)'
    }

    return (
        <div className={styles.bar}>
            <div className={styles.flex} style={style}>
                <div className={styles.bar_container}>
                    <div className={styles.bar_selected}>
                        <input id="check" type="checkbox" onChange={selectAll} checked={checked} />
                        <p>{selected.length} {selected.length > 1 ? "Files" : "File"} Selected</p>
                    </div>
                    <button disabled={selected.length < 1} onClick={confirm}  >Delete Selected</button>
                </div>
                <div className={styles.title}>
                    <p>Gallery</p>
                    <button onClick={selectAll} >Select All</button>
                </div>
            </div>
        </div>
    )
}

const Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#123" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>

export default Header