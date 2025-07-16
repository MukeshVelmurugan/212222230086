const LoggerMiddleware = (() => {
  const logKey = 'app-logs';

  function getLogs() {
    return JSON.parse(localStorage.getItem(logKey)) || [];
  }

  function saveLogs(logs) {
    localStorage.setItem(logKey, JSON.stringify(logs));
  }

  function log(level, details) {
    const newLog = {
      timestamp: new Date().toISOString(),
      level,
      details
    };

    const current = getLogs();
    current.push(newLog);
    saveLogs(current);
  }

  return log;
})();

export default LoggerMiddleware;
