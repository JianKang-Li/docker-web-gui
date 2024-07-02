import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Images = () => {
    const [images, setImages] = useState()
    
    useEffect(() => {
        const getImages = async () => {
            const res = await axios.get('/api/images')
            setImages(res.data.images)
        }
        getImages()
    }, [])

    const bytesToSize = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes} ${sizes[i]})`
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
      }

    
    return (
        <div>
            <h1>Images</h1>

            {images === undefined ? 
                <div className="spinner-border"></div> 
            :
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Tags</th>
                            <th>Size</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {images.map(image => {
                            const created = moment.unix(image.Created).format("YYYY-MM-DD HH:mm:ss")
                           
                            return (
                                <tr key={image.Id}>
                                    <td><Link to={`/images/${image.Id}`}>{image.Id}</Link></td>
                                    <td><mark>{image.RepoTags[0]}</mark></td>
                                    <td>{bytesToSize(image.Size)}</td>
                                    <td>{created}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Images;

