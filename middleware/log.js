const LOGGING_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';

export async function log(stack, level, pkg, message) {
  try {
    const validStacks = ['frontend', 'backend'];
    const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
    const validPackages = [
      'api', 'component', 'hook', 'page', 'state', 'style',
      'cache', 'controller', 'cron job', 'db', 'domain', 'handler', 'repository', 'route', 'service',
      'auth', 'config', 'middleware', 'utils'
    ];

    if (!validStacks.includes(stack) || !validLevels.includes(level) || !validPackages.includes(pkg)) {
      console.warn(`[Log Skipped] Invalid parameters:`, { stack, level, pkg });
      return;
    }

    const body = {
      stack,
      level,
      package: pkg,
      message
    };

    const res = await fetch(LOGGING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log('[LOG SENT]:', data.logID);
  } catch (error) {
    console.error('[LOGGING ERROR]:', error.message);
  }
}
