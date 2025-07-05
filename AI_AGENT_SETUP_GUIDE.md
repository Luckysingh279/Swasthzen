# 🧘‍♀️ SwasthZenith AI Agent Setup Guide 🧘‍♂️

This guide will help you set up and run your own AI agent for the SwasthZenith wellness hub.

## 📁 Project Structure

```
swasthzenith-wellness-hub-main/
├── ai-agent/                    # 🆕 Dedicated AI Agent Folder
│   ├── swasthzenith_ai_agent.py # Main AI agent Flask API
│   ├── run_agent.py            # Setup and runner script
│   ├── requirements.txt        # Python dependencies
│   ├── env_example.txt        # Environment template
│   ├── .env                   # Your API keys (create this)
│   └── README.md              # Detailed documentation
├── src/                        # Website source code
├── setup_ai_agent.bat         # Windows batch setup script
├── setup_ai_agent.ps1         # PowerShell setup script
└── AI_AGENT_SETUP_GUIDE.md    # This guide
```

## 🚀 Quick Setup (Windows)

### Option 1: Automated Setup (Recommended)
1. **Double-click** `setup_ai_agent.bat` or run `setup_ai_agent.ps1`
2. The script will:
   - Check Python installation
   - Install dependencies
   - Create `.env` file
   - Open editor for API key
   - Start the AI agent

### Option 2: Manual Setup
```bash
# 1. Navigate to ai-agent folder
cd ai-agent

# 2. Install dependencies
pip install -r requirements.txt

# 3. Create environment file
copy env_example.txt .env

# 4. Edit .env file and add your OpenAI API key
notepad .env

# 5. Run the agent
python run_agent.py
```

## 🔑 Getting Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-`)
5. Add it to your `.env` file:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```

## 🌐 Running the AI Agent

### Start the Agent
```bash
# Navigate to ai-agent folder
cd ai-agent

# Run the agent
python run_agent.py
```

### Expected Output
```
🧘‍♀️ SwasthZenith AI Agent Setup 🧘‍♂️
========================================
✅ Python version: 3.9.0
✅ flask is installed
✅ openai is installed
✅ python-dotenv is installed
✅ .env file exists
✅ OpenAI API key is configured

🚀 Starting SwasthZenith AI Agent...
==================================================
🧘‍♀️ SwasthZenith AI Agent is running! 🧘‍♂️
🌐 API URL: http://localhost:5000
💬 Chat endpoint: http://localhost:5000/chat
🏥 Health check: http://localhost:5000/health
```

## 🔗 Connecting to Your Website

### 1. Start the AI Agent
Make sure your AI agent is running on `http://localhost:5000`

### 2. Open Your Website
Start your website development server:
```bash
npm run dev
```

### 3. Configure AI Settings
1. Open your website in the browser
2. Click on the AI chat button (floating chat icon)
3. Click "Settings" or "Configure AI"
4. Select "Custom AI Agent"
5. Set the endpoint to: `http://localhost:5000/chat`
6. Click "Save" or "Test Connection"

### 4. Test the Connection
- Send a message in the AI chat
- You should receive responses from your SwasthZenith AI agent
- The agent specializes in wellness, nutrition, fitness, and health advice

## 🧪 Testing the AI Agent

### Test via Browser
1. Open: `http://localhost:5000`
2. You'll see API information and usage instructions

### Test via Health Check
1. Open: `http://localhost:5000/health`
2. Should return: `{"status": "healthy", "agent": "SwasthZenith"}`

### Test via Chat Endpoint
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Can you help me with nutrition advice?"}'
```

## 🛠️ Troubleshooting

### Common Issues

**1. Python Not Found**
```
❌ Python is not installed or not in PATH
```
**Solution**: Install Python from [python.org](https://python.org)

**2. OpenAI API Key Error**
```
❌ OpenAI API key not set!
```
**Solution**: Add your API key to the `.env` file

**3. Port Already in Use**
```
❌ Address already in use
```
**Solution**: 
- Stop other services using port 5000
- Or change port in `.env` file: `FLASK_PORT=5001`

**4. Missing Dependencies**
```
❌ ModuleNotFoundError: No module named 'flask'
```
**Solution**: Run `pip install -r requirements.txt`

**5. Website Can't Connect**
```
❌ Failed to connect to AI agent
```
**Solution**:
- Make sure AI agent is running on `http://localhost:5000`
- Check that the endpoint URL is correct in website settings
- Verify CORS is enabled (should be automatic)

### Debug Mode
The agent runs in debug mode by default. Check the console for detailed logs:
```
INFO:__main__:Received chat request: Can you help me with nutrition advice?...
INFO:__main__:Generated response: Here are some nutrition tips...
```

## 🔧 Configuration Options

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

### Website AI Settings
- **Provider**: Custom AI Agent
- **Endpoint**: `http://localhost:5000/chat`
- **System Prompt**: (Optional) Custom wellness prompt
- **Headers**: (Optional) Additional headers

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/health` | GET | Health check |
| `/chat` | POST | Send message to AI |
| `/config` | GET | Get configuration |
| `/config` | POST | Update configuration |
| `/clear-history` | POST | Clear chat history |

## 🚀 Production Deployment

For production use:
1. Set `FLASK_DEBUG=false` in `.env`
2. Use a production WSGI server (Gunicorn, uWSGI)
3. Add proper authentication
4. Use HTTPS with SSL certificates
5. Set up monitoring and logging

## 📞 Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your OpenAI API key is valid
3. Ensure all dependencies are installed
4. Check that port 5000 is available
5. Test the agent endpoints manually

## 🎯 Next Steps

Once your AI agent is running:
1. **Test the connection** with your website
2. **Customize the system prompt** for your specific needs
3. **Monitor usage** to manage OpenAI costs
4. **Add authentication** for production use
5. **Scale up** with load balancing if needed

---

**🧘‍♀️ Happy Wellness Journey with SwasthZenith! 🧘‍♂️**

Your AI agent is now ready to provide personalized wellness guidance to your users! 