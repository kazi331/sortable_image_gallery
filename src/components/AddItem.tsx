import { Dispatch, SetStateAction } from 'react';
import styles from '../styles/gallery.module.css';
import { itemType } from '../utils/types';

const AddItem = ({ setData }: { setData: Dispatch<SetStateAction<itemType[]>> }) => {
    // const [images, setImages] = useState<File[]>([]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const myImages = Array.from(e.target.files).map(image => {
                return {
                    id: Math.floor(Math.random() * 1000),
                    image: URL.createObjectURL(image)
                }
            });
            setData(prev => [...prev, ...myImages])
        }
    }

    return (<label htmlFor='uploadImage' className={styles.addItem}>
        <input
            type="file"
            name="uploadImage"
            id="uploadImage"
            accept="image/*"
            multiple style={{ display: 'none' }}
            onChange={handleChange} />
        <img src="/icons/thumbnail.svg" alt="image thumbnail" />
        <p>Add Images</p>
    </label>
    )
}

export default AddItem