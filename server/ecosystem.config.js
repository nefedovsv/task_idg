module.exports = {
  apps: [
    {
      name: 'server',
      script: './dist/main.js',
      watch: false,
      instances: 1,
      exec_mode: 'cluster',
      env: {
        PORT: 3001,
        NODE_ENV: 'development',
      },
      env_staging: {
        PORT: 3001,
        NODE_ENV: 'staging',
      },
      env_production: {
        PORT: 3001,
        NODE_ENV: 'production',
      },
    },
  ],
};
