import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti('./src/env');

const messageToIgnore = 'Warning: Accessing element.ref was removed in React 19. ref is now a regular prop.';
const originalError = console.error;

console.error = function(text, ...args) {
	if (typeof text === 'string' && text.includes(messageToIgnore)) {
		return;
	}

	return originalError.call(this, text, ...args);
};

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

