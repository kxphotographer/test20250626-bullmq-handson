import { Queue, Worker } from "bullmq";

const connection = {
	host: "localhost",
	port: process.env["VALKEY_PORT"]
		? Number.parseInt(process.env["VALKEY_PORT"])
		: 6379,
};

type JobData = {
	bar: string;
};

const log = (message: string, ...params: unknown[]) => {
	console.log(`[${new Date().toISOString()}] ${message}`, ...params);
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const queue = new Queue<JobData>("bmq", { connection });
log("[main] Queue created");

const worker = new Worker<JobData, undefined, "foo">(
	"bmq",
	async (job) => {
		log("[worker] Job received", { data: job.data });
		log("[worker] Waiting 2s");
		await sleep(2000);
		log("[worker] Job completed");
	},
	{ connection },
);
log("[main] Worker created");

log("[main] Waiting 1s");
await sleep(1000);
await queue.add("foo", { bar: "baz" }, { delay: 1000 });
log("[main] Job added with delay 1s");

log("[main] Waiting 1.5s");
await sleep(1500);

log("[main] Closing queue and worker");
await Promise.all([
	(async () => {
		log("[queue close] Starting");
		await queue.close();
		log("[queue close] Done");
	})(),
	(async () => {
		log("[worker close] Starting");
		await worker.close();
		log("[worker close] Done");
	})(),
]);
log("[main] Done");
