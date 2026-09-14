export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Vary': 'Origin'
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: cors });
    if (!env.GROQ_API_KEY) return new Response(JSON.stringify({ error: 'GROQ_API_KEY is not configured.' }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });

    try {
      const body = await request.json();
      const messages = Array.isArray(body.messages) ? body.messages : [];
      const completion = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: body.model || 'openai/gpt-oss-20b',
          messages,
          temperature: 0.2
        })
      });

      const data = await completion.json();
      return new Response(JSON.stringify(data), {
        status: completion.status,
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message || 'Request failed' }), {
        status: 400,
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }
  }
};
