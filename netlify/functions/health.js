exports.handler = async () => {
  const now = new Date().toISOString();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      status: 'healthy',
      timestamp: now,
      version: 'netlify-1.0.0',
      services: {
        platform: 'running',
        api: 'active'
      }
    })
  };
};

