module.exports = {
  platform: process.platform,
  arch: process.arch,
  version: process.version,
  versions: process.versions,
  memoryUsage: process.memoryUsage(),
  cpuUsage: process.cpuUsage(),
  uptime: process.uptime(),
  pid: process.pid,
  ppid: process.ppid,
  execPath: process.execPath,
  execArgv: process.execArgv,
  argv: process.argv,
};
