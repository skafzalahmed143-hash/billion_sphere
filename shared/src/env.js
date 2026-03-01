const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const rootEnvPath = path.resolve(__dirname, '..', '..', '.env');
const localEnvPath = path.resolve(process.cwd(), '.env');

if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
} else if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
} else {
  dotenv.config();
}

if (localEnvPath !== rootEnvPath && fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
}

/**
 * Validates that required environment variables are present.
 * Processes will exit(1) if any required key is missing.
 * @param {string[]} requiredKeys 
 * @param {string} scope 
 */
const validateEnv = (requiredKeys, scope = 'Global') => {
  const missing = requiredKeys.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error(`[FATAL] Missing required ${scope} environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
};

// Global mandatory variables
validateEnv(['JWT_SECRET']);

module.exports = {
  rootEnvPath,
  localEnvPath,
  validateEnv
};
