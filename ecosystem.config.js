module.exports = {
  apps: [
    {
      name: 'underlife-prod',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p ' + (process.env.PORT || 3000),
      node_args: '--no-node-snapshot',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
      },
    },
  ],
};
