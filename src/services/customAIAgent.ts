// Custom AI Agent Service for Swasthzenith Wellness Hub
// This service can be configured to work with your own AI agent or API

export interface CustomAIResponse {
  text: string;
  confidence?: number;
  metadata?: any;
  success: boolean;
  error?: string;
}

export interface CustomAIConfig {
  endpoint: string;
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  headers?: Record<string, string>;
  systemPrompt?: string;
}

class CustomAIAgent {
  private config: CustomAIConfig;

  constructor(config: CustomAIConfig) {
    this.config = config;
  }

  // Method to call your custom AI agent
  async callCustomAgent(prompt: string): Promise<CustomAIResponse> {
    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.config.apiKey ? `Bearer ${this.config.apiKey}` : '',
          ...this.config.headers,
        },
        body: JSON.stringify({
          prompt: prompt,
          systemPrompt: this.config.systemPrompt || `You are Swasthzenith Wellness Hub's AI assistant. You help users with:
          
• Nutrition advice and meal planning
• Workout and fitness recommendations  
• Health and wellness tips
• Goal setting and progress tracking
• General wellness guidance

Always provide helpful, accurate, and personalized advice. Prioritize safety and recommend consulting healthcare professionals for medical advice. Be friendly, encouraging, and supportive in your responses.`,
          model: this.config.model,
          temperature: this.config.temperature || 0.7,
          maxTokens: this.config.maxTokens || 500,
          context: 'wellness and fitness',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        text: data.response || data.text || data.message || 'I apologize, but I received an empty response from my AI service.',
        confidence: data.confidence || 0.8,
        metadata: data,
        success: true
      };
    } catch (error) {
      console.error('Custom AI Agent Error:', error);
      return {
        text: "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again later or contact support if the issue persists.",
        confidence: 0.1,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Method to test the connection to your AI agent
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.callCustomAgent("Hello, this is a test message.");
      return response.success;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  // Method to update configuration
  updateConfig(newConfig: Partial<CustomAIConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  // Method to get current configuration
  getConfig(): CustomAIConfig {
    return { ...this.config };
  }

  // Method to validate configuration
  validateConfig(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!this.config.endpoint) {
      errors.push('Endpoint URL is required');
    }
    
    if (!this.config.endpoint.startsWith('http')) {
      errors.push('Endpoint must be a valid HTTP/HTTPS URL');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Example configurations for different AI providers

// For OpenAI-compatible API
export const openAICompatibleConfig: CustomAIConfig = {
  endpoint: 'https://your-openai-compatible-api.com/v1/chat/completions',
  apiKey: 'your-api-key-here',
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 500,
  headers: {
    'Content-Type': 'application/json',
  },
  systemPrompt: `You are Swasthzenith Wellness Hub's AI assistant. Help users with nutrition, fitness, and wellness advice.`
};

// For Claude-compatible API
export const claudeCompatibleConfig: CustomAIConfig = {
  endpoint: 'https://your-claude-compatible-api.com/v1/messages',
  apiKey: 'your-api-key-here',
  model: 'claude-3-sonnet-20240229',
  temperature: 0.7,
  maxTokens: 500,
  headers: {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01',
  },
  systemPrompt: `You are Swasthzenith Wellness Hub's AI assistant. Help users with nutrition, fitness, and wellness advice.`
};

// For local AI models (Ollama, LocalAI, etc.)
export const localAIConfig: CustomAIConfig = {
  endpoint: 'http://localhost:11434/api/generate',
  model: 'llama2',
  temperature: 0.7,
  maxTokens: 500,
  systemPrompt: `You are Swasthzenith Wellness Hub's AI assistant. Help users with nutrition, fitness, and wellness advice.`
};

// For custom REST API
export const customRESTConfig: CustomAIConfig = {
  endpoint: 'https://your-custom-api.com/chat',
  apiKey: 'your-api-key-here',
  temperature: 0.7,
  maxTokens: 500,
  headers: {
    'X-Custom-Header': 'your-custom-value',
  },
  systemPrompt: `You are Swasthzenith Wellness Hub's AI assistant. Help users with nutrition, fitness, and wellness advice.`
};

// Create default instance
export const customAIAgent = new CustomAIAgent({
  endpoint: 'https://your-ai-endpoint.com/chat',
  apiKey: 'your-api-key-here',
  model: 'your-model-name',
  temperature: 0.7,
  maxTokens: 500,
  systemPrompt: `You are Swasthzenith Wellness Hub's AI assistant. Help users with nutrition, fitness, and wellness advice.`
});

export default CustomAIAgent; 