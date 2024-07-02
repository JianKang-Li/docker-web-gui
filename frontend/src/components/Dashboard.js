import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [counts, setCounts] = useState();

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
        <div class="row">
          <div class="col">
              <div class="card">
                <div class="card-body">
                  <Link to="/containers"><h5 class="card-title"><i class="bi bi-box"></i>Containers</h5></Link>
                  <p class="card-text">{counts.containers}</p>
                </div>
              </div>
          </div>
          <div class="col">
              <div class="card">
                <div class="card-body">
                <Link to="/images"><h5 class="card-title"><i class="bi bi-layers"></i>Images</h5></Link>
                  <p class="card-text">{counts.images}</p>
                </div>
              </div>
          </div>
          <div class="col">
              <div class="card">
                <div class="card-body">
                <Link to="/volumes"><h5 class="card-title"><i class="bi bi-sd-card"></i>Volumes</h5></Link>
                  <p class="card-text">{counts.volumes}</p>
                </div>
              </div>
          </div>
        </div>

      }
    </div>
  );
}

export default Dashboard