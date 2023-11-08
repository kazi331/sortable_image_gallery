import styles from '../styles/gallery.module.css';

const AddItem = () => {
    return (<div className={styles.addItem}>
        <img src="/icons/thumbnail.svg" alt="image thumbnail" />
        <p>Add Images</p>
    </div>
    )
}

export default AddItem