import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Volumes = () => {
    const [volumes, setVolumes] = useState()
    
    useEffect(() => {
        const getVolumes = async () => {
            const res = await axios.get('/api/volumes')
            setVolumes(res.data.volumes.Volumes)
        }
        getVolumes()
    }, [])
    
    return (
        <div>
            <h1>Volumes</h1>

            {volumes === undefined ? 
                <div className="spinner-border"></div> 
            :
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Driver</th>
                            <th>Mountpoint</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {volumes.map(volume => {
                            const created = moment(volume.CreatedAt).format("YYYY-MM-DD HH:mm:ss")
                           
                            return (
                                <tr key={volume.Name}>
                                    <td><Link to={`/volumes/${volume.Name}`}>{volume.Name}</Link></td>
                                    <td>{volume.Driver}</td>
                                    <td>{volume.Mountpoint}</td>
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

export default Volumes;

