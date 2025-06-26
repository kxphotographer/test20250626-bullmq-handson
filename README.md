# BullMQ hands-on

Test repository to hands-on BullMQ.

## How to run

```shell
cp .env.template .env

# Edit .env as needed

docker compose up -d

pnpm start
```

Output example

```
[2025-06-26T08:00:20.084Z] [main] Queue created
[2025-06-26T08:00:20.085Z] [main] Worker created
[2025-06-26T08:00:20.086Z] [main] Waiting 1s
[2025-06-26T08:00:21.101Z] [main] Job added with delay 1s
[2025-06-26T08:00:21.102Z] [main] Waiting 1.5s
[2025-06-26T08:00:22.136Z] [worker] Job received { data: { bar: 'baz' } }
[2025-06-26T08:00:22.137Z] [worker] Waiting 2s
[2025-06-26T08:00:22.603Z] [main] Closing queue and worker
[2025-06-26T08:00:22.604Z] [queue close] Starting
[2025-06-26T08:00:22.606Z] [worker close] Starting
[2025-06-26T08:00:22.609Z] [queue close] Done
[2025-06-26T08:00:24.138Z] [worker] Job completed
[2025-06-26T08:00:24.143Z] [worker close] Done
[2025-06-26T08:00:24.143Z] [main] Done
```
