import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Dashboard = () => {

  const [counts, setCounts] = useState()

  useEffect(() => {
    const getCounts = async () => {
      const containers_res = await axios.get('/api/containers')
      const images_res = await axios.get('/api/images')
      const volumes_res = await axios.get('/api/volumes')

      setCounts({
        containers: containers_res.data.containers.length,
        images: images_res.data.images.length,
        volumes: volumes_res.data.volumes.Volumes.length
      })
    }
    getCounts()
  }, [])

  return (
    <div >
      <h1>Dashboard</h1>

      {counts === undefined ?
        <div className="spinner-border"></div>
        :
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <Link to="/containers"><h5 className="card-title"><i className="bi bi-box"></i>Containers</h5></Link>
                <p className="card-text">{counts.containers}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <Link to="/images"><h5 className="card-title"><i className="bi bi-layers"></i>Images</h5></Link>
                <p className="card-text">{counts.images}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <Link to="/volumes"><h5 className="card-title"><i className="bi bi-sd-card"></i>Volumes</h5></Link>
                <p className="card-text">{counts.volumes}</p>
              </div>
            </div>
          </div>
        </div>

      }
    </div>
  )
}

export default Dashboard