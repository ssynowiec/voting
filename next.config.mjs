import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti('./src/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		reactCompiler: true,
		ppr: 'incremental',
		after: true,
	},
};

export default nextConfig;

