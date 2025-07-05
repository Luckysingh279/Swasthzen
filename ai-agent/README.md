# SwasthZenith AI Agent

A dedicated Python Flask API for the SwasthZenith wellness hub's AI assistant. This agent provides personalized wellness guidance including diet advice, workout plans, yoga tips, and health coaching.

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Navigate to the ai-agent folder
cd ai-agent

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure API Key
```bash
# Copy environment template
copy env_example.txt .env

# Edit .env file and add your OpenAI API key
# Get your API key from: https://platform.openai.com/api-keys
```

### 3. Run the Agent
```bash
# Option 1: Use the runner script (recommended)
python run_agent.py

# Option 2: Run directly
python swasthzenith_ai_agent.py
```

## 📁 File Structure

```
ai-agent/
├── swasthzenith_ai_agent.py    # Main AI agent Flask API
├── run_agent.py                # Setup and runner script
├── requirements.txt            # Python dependencies
├── env_example.txt            # Environment template
├── .env                       # Your API keys (create this)
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables (.env file)
```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional
AGENT_MODEL=gpt-4o
AGENT_MAX_TOKENS=500
AGENT_TEMPERATURE=0.7
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
FLASK_DEBUG=true
```

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information and usage |
| `/health` | GET | Health check |
| `/chat` | POST | Send message to AI agent |
| `/config` | GET | Get agent configuration |
| `/config` | POST | Update agent configuration |
| `/clear-history` | POST | Clear conversation history |

### Chat Endpoint Usage
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Can you help me with nutrition advice?"}'
```

## 🧘‍♀️ Features

- **Wellness Expertise**: Specialized in diet, fitness, yoga, and health guidance
- **Conversation Memory**: Maintains context across chat sessions
- **Customizable**: Configurable model, tokens, and temperature
- **Health Monitoring**: Built-in health check endpoints
- **CORS Enabled**: Ready for web integration
- **Error Handling**: Robust error handling and logging

## 🔗 Website Integration

### Connect to Your Website
1. Start the AI agent (runs on `http://localhost:5000`)
2. Open your website's AI Settings
3. Select "Custom AI Agent"
4. Set endpoint to: `http://localhost:5000/chat`
5. Test the connection

### Example Integration
```javascript
// In your website's AI service
const response = await fetch('http://localhost:5000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: userMessage })
});
```

## 🛠️ Troubleshooting

### Common Issues

**1. OpenAI API Key Error**
```
❌ OpenAI API key not set!
```
**Solution**: Add your API key to the `.env` file

**2. Port Already in Use**
```
❌ Address already in use
```
**Solution**: Change port in `.env` file or stop other services

**3. Missing Dependencies**
```
❌ ModuleNotFoundError: No module named 'flask'
```
**Solution**: Run `pip install -r requirements.txt`

**4. Python Version Error**
```
❌ Python 3.7 or higher is required!
```
**Solution**: Update Python to version 3.7+

### Debug Mode
The agent runs in debug mode by default. Check the console for detailed logs and error messages.

## 📝 System Prompt

The agent uses a specialized wellness-focused system prompt:

```
You are SwasthZenith, a friendly, expert wellness assistant. You help users with:
• Diet suggestions and meal planning
• Workout plans and fitness guidance  
• Yoga tips and meditation advice
• BMI calculations and health metrics
• Healthy lifestyle guidance
• Stress management and mental wellness
• Sleep optimization tips
• Weight management strategies
```

## 🔒 Security Notes

- Keep your `.env` file secure and never commit it to version control
- The agent runs on localhost by default for development
- For production, use proper authentication and HTTPS
- Monitor API usage to manage OpenAI costs

## 📞 Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your OpenAI API key is valid
3. Ensure all dependencies are installed
4. Check that port 5000 is available

## 🚀 Production Deployment

For production use:
1. Set `FLASK_DEBUG=false` in `.env`
2. Use a production WSGI server (Gunicorn, uWSGI)
3. Add proper authentication
4. Use HTTPS with SSL certificates
5. Set up monitoring and logging

---

**🧘‍♀️ Happy Wellness Journey with SwasthZenith! 🧘‍♂️** 