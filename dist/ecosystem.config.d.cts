export let apps: {
    name: string;
    script: string;
    args: string;
    interpreter: string;
    watch: string[];
    env: {
        NODE_ENV: string;
    };
    output: string;
    error: string;
    autorestart: boolean;
    max_restarts: number;
    watch_delay: number;
    ignore_watch: string[];
    max_memory_restart: string;
}[];
