#!/bin/sh

# Netlify uses $CONTEXT and Vercel uses $VERCEL_ENV
if [ "${VERCEL_ENV:-$CONTEXT}" = "production" ]; then
  hugo -F
else
  hugo -F -D -b ${VERCEL_URL:-$DEPLOY_PRIME_URL}
fi

mkdir -p public/en
node scripts/q4743.mjs > public/en/index.html
