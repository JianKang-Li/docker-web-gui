# Docker Web GUI

[复刻自](https://github.com/orensaldanha/docker-web-gui)

A web application that provides an alternative to the docker cli to interact with the docker engine.
This project uses the [Dockerode](https://github.com/apocas/dockerode "Dockerode") package to interact with the docker engine

Supports some of the basic docker interactions like:
* Displaying all containers
* Inspecting a container
* Starting a container
* Stopping a container
* Removing a container
* Displaying all images
* Inspecting an image
* Removing an image
* Displaying all volumes
* Removing volumes

## Software Tools Used 

* Docker
* Node JS
* Express
* React
* [Dockerode](https://github.com/apocas/dockerode "Dockerode")

## Instructions

* [add user to docker group](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user "add user to docker group")
* `npm run start`
