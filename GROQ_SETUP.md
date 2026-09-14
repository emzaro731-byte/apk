# Groq AI setup

The GitHub Pages frontend must not contain a Groq API key. Groq recommends keeping the key in an environment variable/server-side secret and routing browser requests through a trusted backend proxy.

## 1. Create a Groq key

Open https://console.groq.com/keys and create a project API key.

## 2. Deploy the worker

Install Wrangler and from this directory run:

```bash
cd worker
npx wrangler login
npx wrangler secret put GROQ_API_KEY
npx wrangler deploy
```

Paste the Groq key when Wrangler asks for it. Do not put the key into `index.html` or commit it to GitHub.

## 3. Connect the website

After deployment, Wrangler prints a Worker URL similar to:

`https://apk-builder-groq.<your-subdomain>.workers.dev`

Put that URL into APK Builder's AI endpoint setting. The website sends chat requests to the worker, and the worker calls Groq's OpenAI-compatible chat endpoint.

Default model: `openai/gpt-oss-20b`.

Groq API reference: https://console.groq.com/docs/api-reference
Security guidance: https://console.groq.com/docs/production-readiness/security-onboarding
