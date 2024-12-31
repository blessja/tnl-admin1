module.exports = {
  apps: [
    {
      name: 'admin-panel',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      autorestart: true,
      max_memory_restart: '1G',
    },
  ],
};
