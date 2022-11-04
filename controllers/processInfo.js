const processInfo = async (req, res) => {
  try {
    return res.status(200).json({
      ppid: process.ppid,
      pid: process.pid,
      uptime: process.uptime(),
      argv: process.argv,
      execArgv: process.execArgv,
      execPath: process.execPath,
      memoryUsage: process.memoryUsage(),
      version: process.version,
      arch: process.arch,
      platform: process.platform,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error finding process info",
    });
  }
};

module.exports = {
  processInfo,
};
