import styles from '../styles/gallery.module.css';
type propsType = {
    selected: number[],
    selectAll: () => void,
    handleDelete: () => void
    checked?: boolean
}
const Header = ({ selected, handleDelete, selectAll, checked }: propsType) => {

    return (
        <div className={styles.bar}>
            <div className={styles.flex} style={{ transform: `${selected.length > 0 ? 'translateY(0.5rem)' : 'translateY(-2.5rem)'}` }}>
                <div className={styles.bar_container}>
                    <div className={styles.bar_selected}>
                        <input id="check" type="checkbox" onChange={selectAll} checked={checked} />

                        <p>{selected.length} {selected.length > 1 ? "Files" : "File"} Selected</p>
                    </div>
                    <button disabled={selected.length < 1} onClick={handleDelete}  >Delete Selected</button>
                </div>
                <h3 className={styles.title}>Gallery</h3>
            </div>

        </div>
    )
}

export default Header