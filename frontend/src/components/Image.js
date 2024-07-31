import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import dayjs from "dayjs"
import { toast } from "react-toastify"

const Image = () => {
  const { imageId } = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState()

  useEffect(() => {
    const getImage = async () => {
      const res = await axios.get(`/api/images/${imageId}`)
      setImage(res.data)
    }
    getImage()
  }, [imageId])

  const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }


  const removeImage = async (image_id) => {
    try {
      await axios.delete(`/api/images/${image_id}`)
      toast.success(`Image ${image_id} removed`)
      navigate('/images')
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(`Remove containers and child images using this image`)
        }
      }
    }
  }

  return (
    <div>
      <h1>Image Details</h1>

      {image === undefined ?
        <div className="spinner-border"></div>
        :
        <div>
          <div className="btn-group">
            <h2 id="actions">Actions: </h2>
            <button className="btn btn-dark" onClick={() => removeImage(image.Id)}>
              <i className="bi bi-trash"></i>Remove
            </button>
          </div>

          <div className="col-sm-6">

            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th colSpan={2}>Image details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{image.Id}</td>
                </tr>
                <tr>
                  <td>Image Tag</td>
                  <td><mark>{image.RepoTags[0]}</mark></td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{bytesToSize(image.Size)}</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>{dayjs(image.Created).format("YYYY-MM-DD HH:mm:ss")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {image.Config.Cmd !== null &&
            <div className="col-sm-6">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th colSpan={3}>Dockerfile details</th>
                  </tr>
                </thead>
                <tbody>
                  {image.Config.Cmd !== null &&
                    <tr>
                      <td>CMD</td>
                      <td colSpan={2}>{image.Config.Cmd}</td>
                    </tr>
                  }

                  {image.Config.Entrypoint !== null &&
                    <tr>
                      <td>ENTRYPOINT</td>
                      <td colSpan={2}>{image.Config.Entrypoint[0]}</td>
                    </tr>
                  }

                  {image.Config.Env !== null &&
                    <>
                      <tr>
                        <td rowSpan={image.Config.Env.length + 1}>ENV</td>
                      </tr>
                      {image.Config.Env.map(env => {
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
          }
        </div>
      }
    </div>
  )
}

export default Image