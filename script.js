const Docker = require('dockerode');

var docker = new Docker();

docker.listContainers() 
.then(containers =>  console.log(containers))