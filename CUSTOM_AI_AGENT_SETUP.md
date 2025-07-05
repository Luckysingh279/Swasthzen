# Custom AI Agent Setup Guide

This guide will help you configure your own AI agent for the Swasthzenith Wellness Hub chatbot.

## 🚀 Quick Setup

### Step 1: Configure Your AI Agent

1. **Open the AI Chat** (blue button in bottom-left corner)
2. **Click "AI Settings"** in the chat header
3. **Select "Custom AI Agent"** as the provider
4. **Enter your AI endpoint URL** (e.g., `https://your-ai-agent.com/chat`)
5. **Add your API key** (if required)
6. **Customize the system prompt** (optional)
7. **Click "Save Configuration"**

### Step 2: Test Your Agent

After configuration, try asking the AI a question to test if it's working properly.

## 🔧 AI Agent Requirements

Your AI agent should accept HTTP POST requests with the following format:

### Request Format
```json
{
  "prompt": "User's question here",
  "systemPrompt": "Your custom system prompt",
  "model": "your-model-name",
  "temperature": 0.7,
  "maxTokens": 500,
  "context": "wellness and fitness",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Expected Response Format
```json
{
  "response": "AI agent's response here",
  "confidence": 0.8,
  "success": true,
  "metadata": {
    "model": "your-model",
    "tokens_used": 150
  }
}
```

## 🌐 Popular AI Agent Options

### 1. **OpenAI-Compatible APIs**
- **Endpoint**: `https://your-openai-api.com/v1/chat/completions`
- **Headers**: `Authorization: Bearer your-api-key`
- **Format**: Standard OpenAI chat completions format

### 2. **Claude-Compatible APIs**
- **Endpoint**: `https://your-claude-api.com/v1/messages`
- **Headers**: `x-api-key: your-api-key`
- **Format**: Anthropic Claude format

### 3. **Local AI Models (Ollama)**
- **Endpoint**: `http://localhost:11434/api/generate`
- **No API key required**
- **Format**: Ollama generate format

### 4. **Custom REST API**
- **Endpoint**: `https://your-custom-api.com/chat`
- **Headers**: Custom headers as needed
- **Format**: Your custom format

## 📝 Example AI Agent Implementations

### Python Flask Example
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_prompt = data.get('prompt', '')
    system_prompt = data.get('systemPrompt', '')
    
    # Your AI logic here
    response = your_ai_function(user_prompt, system_prompt)
    
    return jsonify({
        'response': response,
        'confidence': 0.9,
        'success': True,
        'metadata': {
            'model': 'your-model',
            'tokens_used': len(response.split())
        }
    })

if __name__ == '__main__':
    app.run(debug=True)
```

### Node.js Express Example
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/chat', async (req, res) => {
    const { prompt, systemPrompt } = req.body;
    
    try {
        // Your AI logic here
        const response = await yourAIFunction(prompt, systemPrompt);
        
        res.json({
            response: response,
            confidence: 0.9,
            success: true,
            metadata: {
                model: 'your-model',
                tokensUsed: response.split(' ').length
            }
        });
    } catch (error) {
        res.status(500).json({
            response: 'Sorry, I encountered an error.',
            success: false,
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log('AI Agent running on port 3000');
});
```

## 🔒 Security Considerations

### API Key Security
- Store API keys securely (environment variables)
- Use HTTPS for all endpoints
- Implement rate limiting
- Add authentication if needed

### Data Privacy
- Consider what data you're sending to your AI agent
- Implement data retention policies
- Add logging for debugging

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Add CORS headers to your AI agent
   - Allow requests from your website domain

2. **Connection Timeout**
   - Check if your AI agent is running
   - Verify the endpoint URL is correct
   - Test the endpoint directly

3. **Invalid Response Format**
   - Ensure your AI agent returns the expected JSON format
   - Check that the `response` field contains the AI's text

4. **Authentication Errors**
   - Verify API keys are correct
   - Check authentication headers

### Debug Mode

Enable debug logging in your browser console:
```javascript
// In browser console
localStorage.setItem('ai_debug', 'true');
```

## 📊 Monitoring Your AI Agent

### Recommended Metrics
- Response time
- Success rate
- Error rate
- Token usage
- User satisfaction

### Logging Example
```javascript
// Add to your AI agent
console.log('AI Request:', {
    prompt: userPrompt,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent']
});

console.log('AI Response:', {
    response: aiResponse,
    confidence: confidence,
    processingTime: endTime - startTime
});
```

## 🎯 Customization Options

### System Prompt Examples

**Wellness-Focused:**
```
You are Swasthzenith Wellness Hub's AI assistant. You help users with nutrition advice, workout plans, health tips, and wellness guidance. Always be encouraging, supportive, and prioritize safety. Recommend consulting healthcare professionals for medical advice.
```

**Fitness-Specific:**
```
You are a fitness and wellness expert. Provide personalized workout plans, nutrition advice, and motivation. Focus on practical, achievable goals and safe exercise practices.
```

**Nutrition-Specific:**
```
You are a nutrition expert. Help users with meal planning, dietary advice, and healthy eating habits. Consider individual preferences and dietary restrictions.
```

## 🚀 Deployment Options

### 1. **Cloud Deployment**
- **AWS Lambda**: Serverless AI agent
- **Google Cloud Functions**: Scalable serverless
- **Vercel**: Easy deployment for Node.js
- **Railway**: Simple deployment platform

### 2. **Self-Hosted**
- **Docker**: Containerized deployment
- **VPS**: Virtual private server
- **Local Server**: For development/testing

### 3. **AI Platform Integration**
- **OpenAI API**: Direct integration
- **Anthropic Claude**: Claude API
- **Hugging Face**: Custom models
- **Replicate**: AI model hosting

## 📞 Support

If you need help setting up your custom AI agent:

1. **Check the troubleshooting section** above
2. **Test your endpoint** with a tool like Postman
3. **Review the example implementations** provided
4. **Check browser console** for error messages

---

**Happy AI Agent Integration! 🤖✨** 