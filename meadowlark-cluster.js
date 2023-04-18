const cluster = require('cluster');

function startWorker() {
  const worker = cluster.fork();
  console.log('Cluster started: ', worker.id);
}

if (cluster.isMaster) {
  require('os').cpus().forEach(startWorker);

  cluster.on(' disconnect', worker => console.log(worker.id, 'Disconnected from the cluster'));
  cluster.on('exit', (worker, code, signal) =>  console.log('Cluster', worker.id, ' died', code, signal));
  startWorker();
}
else {
  const port = process.env.PORT || 3001;
  require('./meadowlark')(port);
}
