import env from '../configs/env.json';

declare global {
	interface Window {
		ENV: Record<string, string>;
	}
}

export const readConfig = (): void => {
	const envConfig: Record<string, string> = env;

	if (!window.ENV || process.env.NODE_ENV === 'development') {
		window.ENV = envConfig;
	} else {
		const keys = Object.keys(env);

		keys.forEach((key) => {
			if (!window.ENV[key]) {
				window.ENV[key] = envConfig[key];
			}
		});
	}
};
