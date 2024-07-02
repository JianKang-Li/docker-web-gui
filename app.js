const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT | 3000
const path = require('path')
const Docker = require('dockerode')
const docker = new Docker()
app.use("/static", express.static('./frontend/build/static'))
app.use("/", express.static('./frontend/build/'))
//Containers

app.get('/api/containers', (req, res) => {
  docker.listContainers({all: true})
        .then(containers =>  res.json({"containers": containers}))
})


app.get('/api/containers/:containerName', (req, res) => {
  const containerName = "/" + req.params.containerName
  
  docker.listContainers({all: true})
        .then(containers => {
          const containerInfo = containers.find((container) => container.Names[0] === containerName)
          const container = docker.getContainer(containerInfo.Id)
          container.inspect()
            .then(inspectInfo => {
              res.json(inspectInfo)
            })
        })
})

app.post('/api/containers/:containerId/stop', (req, res) => {
  const containerId = req.params.containerId

  const container = docker.getContainer(containerId)
  container.stop()
    .then(result => {
      res.status(204).send()
    })
})

app.post('/api/containers/:containerId/start', (req, res) => {
  const containerId = req.params.containerId

  const container = docker.getContainer(containerId)
  container.start()
    .then(result => {
      res.status(204).send()
    })
})

app.delete('/api/containers/:containerId', (req, res) => {
  const containerId = req.params.containerId

  const container = docker.getContainer(containerId)
  container.remove()
    .then(result => {
      res.status(204).send()
    })
})

//Images
app.get('/api/images', (req, res) => {
  docker.listImages()
        .then(images =>  res.json({"images": images}))
})

app.get('/api/images/:imageId', (req, res) => {
  const imageId = req.params.imageId

  const image = docker.getImage(imageId)
  image.inspect()
    .then(inspectInfo => {
      res.json(inspectInfo)
    })
  
})

app.delete('/api/images/:imageId', (req, res) => {
  const imageId = req.params.imageId

  const image = docker.getImage(imageId)
  image.remove()
    .then(result => {
      res.status(204).send()
    })
    .catch(err => {
      res.status(409).send()
    })
})

//Volumes
app.get('/api/volumes', (req, res) => {
  docker.listVolumes()
        .then(volumes =>  res.json({"volumes": volumes}))
})

app.get('/api/volumes/:volumeName', (req, res) => {
  const volumeName = req.params.volumeName

  const volume = docker.getVolume(volumeName)

  volume.inspect()
    .then(inspectInfo => {
      res.json(inspectInfo)
    })
})

app.delete('/api/volumes/:volumeName', (req, res) => {
  const volumeName = req.params.volumeName

  const volume = docker.getVolume(volumeName)
  volume.remove()
    .then(result => {
      res.status(204).send()
    })
    .catch(err => {
      res.status(409).send()
    })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})