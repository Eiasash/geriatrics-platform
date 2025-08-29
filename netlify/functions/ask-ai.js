// Option 1: For Node 18+ (Netlify uses this)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Rest of your code...
exports.handler = async (event) => {
    // your existing code
}
exports.handler = async (event) => {
  const { question, patientInfo, model = 'gemini' } = JSON.parse(event.body);
    exports.handler = async (event) => {
        // Add CORS headers
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        // Handle OPTIONS preflight
        if (event.httpMethod === 'OPTIONS') {
            return { statusCode: 200, headers, body: '' };
        }

        const { question, patientInfo, model = 'gemini' } = JSON.parse(event.body);

        // ... rest of your code
        // Then in ALL your return statements, add headers:
        return {
            statusCode: 200,
            headers,  // <-- Add this line
            body: JSON.stringify({
                answer: data.candidates[0].content.parts[0].text,
                model: 'Gemini Pro'
            })
        };
  try {
    let response, data;
    
    switch(model) {
      case 'gemini':
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a geriatrics specialist providing evidence-based clinical guidance. 
                Patient Context: ${patientInfo}
                Clinical Question: ${question}
                Provide a comprehensive yet practical answer.`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024
            }
          })
        });
        data = await response.json();
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            answer: data.candidates[0].content.parts[0].text,
            model: 'Gemini Pro'
          })
        };
      
      case 'claude':
        response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            temperature: 0.7,
            messages: [{
              role: 'user',
              content: `You are a geriatrics specialist providing evidence-based clinical guidance.
              Patient Context: ${patientInfo}
              Clinical Question: ${question}
              Provide a comprehensive yet practical answer focusing on:
              1. Key clinical considerations
              2. Evidence-based recommendations
              3. Practical implementation tips`
            }]
          })
        });
        data = await response.json();
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            answer: data.content[0].text,
            model: 'Claude 3.5 Sonnet'
          })
        };
      
      case 'openai':
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            temperature: 0.7,
            max_tokens: 1024,
            messages: [{
              role: 'system',
              content: 'You are an experienced geriatrics specialist with expertise in polypharmacy, frailty assessment, and age-related conditions. Provide evidence-based, practical clinical guidance.'
            }, {
              role: 'user',
              content: `Patient Context: ${patientInfo}\nClinical Question: ${question}`
            }]
          })
        });
        data = await response.json();
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            answer: data.choices[0].message.content,
            model: 'GPT-4o'
          })
        };
      
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ 
            error: 'Invalid model. Choose: gemini, claude, or openai' 
          })
        };
    }
  } catch (error) {
    console.error('AI API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: `Failed to get AI response: ${error.message}` 
      })
    };
  }
};