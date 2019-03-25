interface Config {
    someItem: string;
}

export let config: Config;
export let process: { env: { NODE_ENV: string } };
