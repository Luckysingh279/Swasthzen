# AI Integration Guide for Swasthzenith Wellness Hub

This guide explains how to integrate various AI services into your wellness hub application.

## 🚀 Quick Start

The AI chat feature is already integrated and working with a fallback system. You'll see a blue AI chat button in the bottom-left corner of your website.

## 🤖 AI Integration Options

### 1. **OpenAI GPT Integration** (Recommended for Production)

**Setup:**
1. Get an API key from [OpenAI Platform](https://platform.openai.com/)
2. Click the "AI Settings" button in the chat
3. Select "OpenAI GPT" as provider
4. Enter your API key
5. Choose a model (GPT-4, GPT-3.5 Turbo, etc.)
6. Save configuration

**Cost:** ~$0.01-0.03 per conversation
**Quality:** Excellent for wellness advice

### 2. **Claude AI Integration** (Anthropic)

**Setup:**
1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Select "Claude (Anthropic)" as provider
3. Enter your API key
4. Choose a model (Claude 3 Opus, Sonnet, or Haiku)
5. Save configuration

**Cost:** ~$0.015-0.03 per conversation
**Quality:** Excellent, very good at health advice

### 3. **Local AI Integration** (Free, Privacy-Focused)

**Setup with Ollama:**
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama2

# Start Ollama server
ollama serve
```

**Setup with LocalAI:**
```bash
# Install LocalAI
git clone https://github.com/go-skynet/LocalAI
cd LocalAI

# Download a model
wget https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/resolve/main/llama-2-7b-chat.ggmlv3.q4_0.bin

# Start LocalAI
./local-ai
```

**Cost:** Free (runs on your hardware)
**Quality:** Good, depends on model size

### 4. **Custom AI Provider**

**Setup:**
1. Create your own AI endpoint
2. Select "Custom Provider"
3. Configure your endpoint URL
4. Set up authentication if needed

## 🔧 Configuration

### AI Settings Panel

Access the AI configuration by:
1. Opening the AI chat (blue button)
2. Clicking "AI Settings" in the header
3. Configuring your preferred provider

### Advanced Settings

- **Temperature:** Controls response creativity (0-2)
  - 0: More focused, consistent responses
  - 2: More creative, varied responses
- **Max Tokens:** Maximum response length (100-4000)
- **Model Selection:** Choose the best model for your needs

## 💡 AI Features

### Wellness Assistant Capabilities

The AI can help with:
- **Nutrition Advice:** Meal planning, dietary recommendations
- **Workout Plans:** Exercise routines, fitness guidance
- **Health Tips:** General wellness information
- **Goal Setting:** SMART goal creation and tracking
- **Progress Monitoring:** Fitness and health tracking advice

### Safety Features

- Medical disclaimers in responses
- Fallback responses when AI is unavailable
- Error handling for API failures
- Privacy-focused local options

## 🔒 Privacy & Security

### Data Handling

- **OpenAI/Claude:** Data sent to third-party servers
- **Local AI:** All data stays on your hardware
- **Custom:** Depends on your implementation

### Security Best Practices

1. **API Keys:** Store securely, never commit to version control
2. **Environment Variables:** Use `.env` files for sensitive data
3. **HTTPS:** Always use secure connections in production
4. **Rate Limiting:** Implement to prevent abuse

## 🛠️ Technical Implementation

### File Structure

```
src/
├── components/
│   ├── AIChat.tsx          # Main chat interface
│   ├── AIConfig.tsx        # Configuration panel
│   └── WhatsAppFloat.tsx   # WhatsApp integration
├── services/
│   └── aiService.ts        # AI service layer
└── pages/
    └── ...                 # Existing pages
```

### Key Components

1. **AIChat.tsx:** Main chat interface with message handling
2. **AIConfig.tsx:** Provider and model configuration
3. **aiService.ts:** Service layer for different AI providers

### Adding New AI Providers

To add a new AI provider:

1. **Update aiService.ts:**
```typescript
// Add new provider to AIConfig interface
provider: 'openai' | 'claude' | 'local' | 'custom' | 'your-provider'

// Add new method
async callYourProvider(prompt: string): Promise<AIResponse> {
  // Implementation
}

// Update getResponse method
case 'your-provider':
  return this.callYourProvider(prompt);
```

2. **Update AIConfig.tsx:**
```typescript
// Add to providers array
{ value: 'your-provider', label: 'Your Provider', description: 'Description' }

// Add to models object
your-provider: [
  { value: 'model1', label: 'Model 1' },
  { value: 'model2', label: 'Model 2' },
]
```

## 📊 Performance Optimization

### Response Time Optimization

1. **Streaming Responses:** Implement for better UX
2. **Caching:** Cache common responses
3. **Request Batching:** Group similar requests
4. **Connection Pooling:** Reuse API connections

### Cost Optimization

1. **Model Selection:** Use cheaper models for simple queries
2. **Token Limits:** Set appropriate max tokens
3. **Response Caching:** Cache frequent responses
4. **Local Fallback:** Use local AI for basic queries

## 🚀 Deployment Considerations

### Environment Variables

Create a `.env` file:
```env
# OpenAI
OPENAI_API_KEY=your_openai_key

# Claude
ANTHROPIC_API_KEY=your_claude_key

# Custom Provider
CUSTOM_AI_ENDPOINT=https://your-ai-endpoint.com
CUSTOM_AI_KEY=your_custom_key
```

### Production Setup

1. **API Keys:** Use environment variables
2. **Rate Limiting:** Implement request limits
3. **Monitoring:** Add logging and analytics
4. **Backup:** Implement fallback responses
5. **Security:** Use HTTPS and secure headers

## 🔍 Troubleshooting

### Common Issues

1. **API Key Errors:**
   - Verify API key is correct
   - Check account has sufficient credits
   - Ensure API key has proper permissions

2. **Network Errors:**
   - Check internet connection
   - Verify API endpoint is accessible
   - Check firewall settings

3. **Local AI Issues:**
   - Ensure Ollama/LocalAI is running
   - Check model is downloaded
   - Verify port 11434 is accessible

### Debug Mode

Enable debug logging:
```typescript
// In aiService.ts
console.log('AI Request:', { provider, model, prompt });
console.log('AI Response:', response);
```

## 📈 Analytics & Monitoring

### Recommended Metrics

- Response time
- Success rate
- User satisfaction
- Cost per conversation
- Popular queries

### Implementation

```typescript
// Add to aiService.ts
const analytics = {
  trackRequest: (provider: string, model: string, prompt: string) => {
    // Send to analytics service
  },
  trackResponse: (response: AIResponse, duration: number) => {
    // Track response metrics
  }
};
```

## 🎯 Next Steps

1. **Choose your AI provider** based on your needs
2. **Set up API keys** and configure the service
3. **Test the integration** with various queries
4. **Monitor performance** and costs
5. **Customize responses** for your wellness domain
6. **Add advanced features** like voice chat or image analysis

## 📞 Support

For technical support or questions about AI integration:
- Check the troubleshooting section above
- Review the code comments in `aiService.ts`
- Test with different providers to find the best fit
- Consider local AI for privacy-sensitive applications

---

**Happy AI Integration! 🤖✨** 