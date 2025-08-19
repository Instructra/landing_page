/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '127.0.0.1'],

};

export default config;
