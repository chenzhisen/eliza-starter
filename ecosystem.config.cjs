module.exports = {
  apps: [{
    name: 'xavier-bot',
    script: 'pnpm',
    args: 'start --characters="characters/x.character.json"',
    interpreter: 'none',
    watch: ['characters/x.character.json'],
    env: {
      NODE_ENV: 'production'
    },
    output: './logs/out.log',
    error: './logs/error.log',
    autorestart: true,
    max_restarts: 10,
    watch_delay: 1000,
    ignore_watch: ['node_modules', 'logs'],
    max_memory_restart: '1G'
  }]
} 