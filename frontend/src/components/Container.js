import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import { toast } from "react-toastify"

const Container = () => {
    const { containerName } = useParams()
    const navigate = useNavigate();
    const [container, setContainer] = useState()
    const [running, setRunning] = useState()
    
    useEffect(() => {
        const getContainer = async () => {
            const res = await axios.get(`/api/containers/${containerName}`)
            setContainer(res.data)
        }
        getContainer()
    }, [containerName, running])

    const removeContainer = async (container_id) => {
        if(!container.State.Running) {
            const res = await axios.delete(`/api/containers/${container_id}`)
            if(res.status === 204) {
                toast.success(`Container ${container_id} removed`)
                navigate('/containers')
            }
        } else {
            toast.error(`Container ${container_id} must be stopped before removing`)
        }
    }

    const startContainer = async (container_id) => {
        const res = await axios.post(`/api/containers/${container_id}/start`)
        if(res.status === 204) {
            toast.success(`Container ${container_id} started`)
            setRunning(true)
        }
    }    

    const stopContainer = async (container_id) => {
        const res = await axios.post(`/api/containers/${container_id}/stop`)
        if(res.status === 204) {
            toast.success(`Container ${container_id} stopped`)
            setRunning(false)
        }
    }    

    return (
        <div>
            <h1>Container Details</h1>

            {container === undefined ? 
                <div className="spinner-border"></div> 
            :
                <div>
                    <div class="btn-group">
                        <h2 id="actions">Actions: </h2>
                        <button class="btn btn-dark" onClick={() => startContainer(container.Id)} disabled={container.State.Running}>
                            <i class="bi bi-play"></i>Start
                        </button>
                        <button class="btn btn-dark" onClick={() => stopContainer(container.Id)} disabled={!container.State.Running}>
                            <i class="bi bi-stop"></i> Stop
                        </button>
                        <button class="btn btn-dark " onClick={() => removeContainer(container.Id)}>
                            <i class="bi bi-trash"></i>Remove
                        </button>
                    </div>

                    <div className="col-sm-6">

                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan={2}>Container status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>{container.Id}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{container.Name.substring(1)}</td>
                                </tr>
                                <tr>
                                    <td>IP address</td>
                                    <td>{container.NetworkSettings.Networks.IPAddress || "-"}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{container.State.Status}</td>
                                </tr>
                                <tr>
                                    <td>Created</td>
                                    <td>{moment(container.Created).format("YYYY-MM-DD HH:mm:ss")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-sm-6">
                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan={3}>Container details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>IMAGE</td>
                                    <td colSpan={2}>{`${container.Config.Image}@${container.Image}`}</td>
                                </tr>
                                <tr>
                                    <td>CMD</td>
                                    <td colSpan={2}>{container.Config.Cmd  ? container.Config.Cmd[0] : "-"}</td>
                                </tr>
                                <tr>
                                    <td>ENTRYPOINT</td>
                                    <td colSpan={2}>{container.Config.Entrypoint ? container.Config.Entrypoint[0] : "-"}</td>
                                </tr>
                                {container.Config.Env.length > 0 &&
                                    <>
                                        <tr>
                                            <td rowSpan={container.Config.Env.length + 1}>ENV</td>
                                        </tr>
                                        {container.Config.Env.map(env => {
                                            const [k, v] = env.split("=")
                                            return (
                                                <tr key={k}>
                                                    <td>{k}</td>
                                                    <td>{v}</td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="col-sm-6">
                         <table className="table table-bordered">
                            <thead >
                                <tr className="table-dark">
                                    <th colSpan={2}>Volumes</th>
                                </tr>
                                <tr className="table-light">
                                    <th>Host/volume	</th>
                                    <th>Path in container</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>{container.Id}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{container.Name.substring(1)}</td>
                                </tr>
                                <tr>
                                    <td>IP address</td>
                                    <td>{container.NetworkSettings.Networks.IPAddress || "-"}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{container.State.Status}</td>
                                </tr>
                                <tr>
                                    <td>Created</td>
                                    <td>{moment(container.Created).format("YYYY-MM-DD HH:mm:ss")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>  

                    {container.Mounts.length !== 0 && 
                        <div className="col-sm-6">
                            <table className="table table-bordered">
                            <thead >
                                <tr className="table-dark">
                                    <th colSpan={2}>Volumes</th>
                                </tr>
                                <tr className="table-light">
                                    <th>Host/volume	</th>
                                    <th>Path in container</th>
                                </tr>
                            </thead>
                            <tbody>
                                {container.Mounts.map(mount => {
                                    if(mount.Type === "volume") {
                                        return (
                                            <tr key={mount.Name}>
                                                <td>{mount.Name}</td>
                                                <td>{mount.Destination}</td>
                                            </tr>
                                        )
                                    } else {
                                        return (
                                            <tr key={mount.Source}>
                                                <td>{mount.Source}</td>
                                                <td>{mount.Destination}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>  
                    }
                </div>
            }
        </div>
    )
}

export default Container