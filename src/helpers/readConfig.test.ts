import { readConfig } from './readConfig';

describe('config values', () => {
	it('API_URL to start with http/https', () => {
		readConfig();
		expect(window.ENV.API_URL).toMatch(/^(http:\/\/|https:\/\/)/);
	});
});
