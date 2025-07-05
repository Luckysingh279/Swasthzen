// AI Service for integrating with various AI providers
// This service can be easily modified to work with different AI APIs

export interface AIResponse {
  text: string;
  confidence?: number;
  metadata?: any;
}

export interface AIConfig {
  provider: 'openai' | 'claude' | 'local' | 'custom' | 'custom-agent';
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  customEndpoint?: string;
  customHeaders?: Record<string, string>;
  systemPrompt?: string;
}

class AIService {
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
  }

  // OpenAI Integration
  async callOpenAI(prompt: string): Promise<AIResponse> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model || 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are SwasthZenith, a friendly, expert wellness assistant. You help users with:

• Diet suggestions and meal planning
• Workout plans and fitness guidance  
• Yoga tips and meditation advice
• BMI calculations and health metrics
• Healthy lifestyle guidance
• Stress management and mental wellness
• Sleep optimization tips
• Weight management strategies

Always be:
- Clear, warm, and encouraging
- Professional yet approachable
- Focused on practical, achievable advice
- Safety-conscious (recommend consulting healthcare professionals for medical issues)
- Supportive of users' wellness journey

Provide personalized, helpful responses that empower users to achieve their health and wellness goals.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: this.config.temperature || 0.7,
          max_tokens: this.config.maxTokens || 500,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        text: data.choices[0].message.content,
        confidence: data.choices[0].finish_reason === 'stop' ? 1 : 0.8,
        metadata: data
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return this.getFallbackResponse(prompt);
    }
  }

  // Claude Integration (Anthropic)
  async callClaude(prompt: string): Promise<AIResponse> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey!,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.config.model || 'claude-3-sonnet-20240229',
          max_tokens: this.config.maxTokens || 500,
          messages: [
            {
              role: 'user',
              content: `You are SwasthZenith, a friendly, expert wellness assistant. You help users with:

• Diet suggestions and meal planning
• Workout plans and fitness guidance  
• Yoga tips and meditation advice
• BMI calculations and health metrics
• Healthy lifestyle guidance
• Stress management and mental wellness
• Sleep optimization tips
• Weight management strategies

Always be:
- Clear, warm, and encouraging
- Professional yet approachable
- Focused on practical, achievable advice
- Safety-conscious (recommend consulting healthcare professionals for medical issues)
- Supportive of users' wellness journey

Provide personalized, helpful responses that empower users to achieve their health and wellness goals.

User question: ${prompt}`
            }
          ],
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        text: data.content[0].text,
        confidence: 0.9,
        metadata: data
      };
    } catch (error) {
      console.error('Claude API Error:', error);
      return this.getFallbackResponse(prompt);
    }
  }

  // Local AI Model Integration (for models like Ollama, LocalAI, etc.)
  async callLocalAI(prompt: string): Promise<AIResponse> {
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'llama2',
          prompt: `You are SwasthZenith, a friendly, expert wellness assistant. You help users with:

• Diet suggestions and meal planning
• Workout plans and fitness guidance  
• Yoga tips and meditation advice
• BMI calculations and health metrics
• Healthy lifestyle guidance
• Stress management and mental wellness
• Sleep optimization tips
• Weight management strategies

Always be:
- Clear, warm, and encouraging
- Professional yet approachable
- Focused on practical, achievable advice
- Safety-conscious (recommend consulting healthcare professionals for medical issues)
- Supportive of users' wellness journey

Provide personalized, helpful responses that empower users to achieve their health and wellness goals.

User question: ${prompt}`,
          stream: false,
        }),
      });

      const data = await response.json();
      
      return {
        text: data.response,
        confidence: 0.8,
        metadata: data
      };
    } catch (error) {
      console.error('Local AI Error:', error);
      return this.getFallbackResponse(prompt);
    }
  }

  // Custom AI Provider Integration
  async callCustomAI(prompt: string): Promise<AIResponse> {
    try {
      // Replace with your custom AI endpoint
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          context: 'wellness and fitness',
        }),
      });

      const data = await response.json();
      
      return {
        text: data.response,
        confidence: data.confidence || 0.8,
        metadata: data
      };
    } catch (error) {
      console.error('Custom AI Error:', error);
      return this.getFallbackResponse(prompt);
    }
  }

  // Custom AI Agent Integration
  async callCustomAgent(prompt: string): Promise<AIResponse> {
    try {
      const endpoint = this.config.customEndpoint || 'http://localhost:5000/chat';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.config.customHeaders,
        },
        body: JSON.stringify({
          prompt: prompt,
          systemPrompt: this.config.systemPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success === false) {
        throw new Error(data.error || 'Custom agent failed');
      }

      return {
        text: data.response,
        confidence: data.confidence || 0.8,
        metadata: data.metadata
      };
    } catch (error) {
      console.error('Custom Agent Error:', error);
      return this.getFallbackResponse(prompt);
    }
  }

  // Main method to get AI response
  async getResponse(prompt: string): Promise<AIResponse> {
    switch (this.config.provider) {
      case 'openai':
        return this.callOpenAI(prompt);
      case 'claude':
        return this.callClaude(prompt);
      case 'local':
        return this.callLocalAI(prompt);
      case 'custom':
        return this.callCustomAI(prompt);
      case 'custom-agent':
        return this.callCustomAgent(prompt);
      default:
        return this.getFallbackResponse(prompt);
    }
  }

  // Enhanced fallback response when AI is not available
  private getFallbackResponse(prompt: string): AIResponse {
    const input = prompt.toLowerCase();
    
    // Nutrition and Diet
    if (input.includes('nutrition') || input.includes('diet') || input.includes('food') || input.includes('meal') || input.includes('eat')) {
      return {
        text: "🥗 **Nutrition Advice (Offline Mode)**\n\nHere are some key nutrition tips:\n\n• **Balanced Diet**: Include proteins, complex carbs, and healthy fats\n• **Fruits & Vegetables**: Aim for 5-7 servings daily\n• **Hydration**: Drink 8-10 glasses of water daily\n• **Portion Control**: Use smaller plates and eat mindfully\n• **Meal Timing**: Don't skip breakfast, eat every 3-4 hours\n\n**Quick Tips**:\n- Start your day with protein-rich breakfast\n- Include colorful vegetables in every meal\n- Choose whole grains over refined grains\n- Limit processed foods and added sugars\n\nFor personalized meal plans and detailed nutrition advice, please try again when the AI service is available.",
        confidence: 0.6
      };
    }
    
    // Fitness and Exercise
    if (input.includes('workout') || input.includes('exercise') || input.includes('fitness') || input.includes('gym') || input.includes('training')) {
      return {
        text: "💪 **Fitness Guidance (Offline Mode)**\n\nHere are some general fitness recommendations:\n\n• **Cardio**: 150 minutes moderate or 75 minutes vigorous weekly\n• **Strength Training**: 2-3 times per week, all major muscle groups\n• **Flexibility**: Stretch daily, especially after workouts\n• **Consistency**: Start slow and gradually increase intensity\n\n**Sample Workout Structure**:\n- 5-10 minutes warm-up\n- 20-30 minutes cardio\n- 20-30 minutes strength training\n- 5-10 minutes cool-down and stretching\n\n**Beginner Tips**:\n- Start with bodyweight exercises\n- Focus on proper form over weight\n- Rest 1-2 days between strength sessions\n- Listen to your body and don't overdo it\n\nFor personalized workout plans and specific exercise guidance, please try again when the AI service is available.",
        confidence: 0.6
      };
    }

    // Mental Health and Stress
    if (input.includes('stress') || input.includes('mental') || input.includes('anxiety') || input.includes('depression') || input.includes('mind')) {
      return {
        text: "🧘‍♀️ **Mental Wellness (Offline Mode)**\n\nHere are some stress management and mental health tips:\n\n• **Deep Breathing**: Practice 4-7-8 breathing technique\n• **Meditation**: Start with 5-10 minutes daily\n• **Physical Activity**: Exercise releases endorphins\n• **Sleep Hygiene**: 7-9 hours of quality sleep\n• **Social Connection**: Stay connected with loved ones\n\n**Quick Stress Relief**:\n- Take 5 deep breaths\n- Go for a 10-minute walk\n- Listen to calming music\n- Practice gratitude journaling\n\n**Important**: If you're experiencing severe mental health issues, please consult a healthcare professional or mental health specialist.\n\nFor personalized mental wellness guidance, please try again when the AI service is available.",
        confidence: 0.6
      };
    }

    // Sleep
    if (input.includes('sleep') || input.includes('rest') || input.includes('insomnia') || input.includes('tired')) {
      return {
        text: "😴 **Sleep Optimization (Offline Mode)**\n\nHere are some tips for better sleep:\n\n• **Consistent Schedule**: Go to bed and wake up at the same time\n• **Bedroom Environment**: Cool, dark, and quiet\n• **Screen Time**: Avoid screens 1 hour before bed\n• **Caffeine**: Avoid caffeine after 2 PM\n• **Relaxation**: Try reading, meditation, or gentle stretching\n\n**Sleep Hygiene Tips**:\n- Keep bedroom temperature between 65-68°F (18-20°C)\n- Use blackout curtains or eye mask\n- Try white noise or calming sounds\n- Avoid large meals before bedtime\n- Create a relaxing bedtime routine\n\n**If You Can't Sleep**:\n- Get up and do something relaxing\n- Don't lie in bed awake for more than 20 minutes\n- Avoid checking the clock repeatedly\n\nFor personalized sleep advice, please try again when the AI service is available.",
        confidence: 0.6
      };
    }

    // Health Metrics and BMI
    if (input.includes('bmi') || input.includes('weight') || input.includes('health') || input.includes('metrics') || input.includes('calculate')) {
      return {
        text: "📊 **Health Metrics (Offline Mode)**\n\n**BMI Calculation**:\nBMI = weight (kg) ÷ height (m)²\n\n**BMI Categories**:\n- Underweight: < 18.5\n- Normal: 18.5 - 24.9\n- Overweight: 25 - 29.9\n- Obese: ≥ 30\n\n**Other Important Metrics**:\n• **Waist Circumference**: Men < 40\", Women < 35\"\n• **Blood Pressure**: < 120/80 mmHg\n• **Resting Heart Rate**: 60-100 bpm\n• **Body Fat**: Men 10-20%, Women 18-28%\n\n**Health Tracking Tips**:\n- Measure at the same time daily\n- Track trends, not daily fluctuations\n- Consider body composition, not just weight\n- Consult healthcare provider for personalized targets\n\nFor detailed health assessments and personalized recommendations, please try again when the AI service is available.",
        confidence: 0.6
      };
    }

    // Yoga and Meditation
    if (input.includes('yoga') || input.includes('meditation') || input.includes('mindfulness') || input.includes('stretch')) {
      return {
        text: "🧘‍♀️ **Yoga & Meditation (Offline Mode)**\n\nHere are some yoga and meditation tips:\n\n**Beginner Yoga Poses**:\n• Child's Pose - for relaxation\n• Cat-Cow - for spine flexibility\n• Downward Dog - for strength\n• Warrior I & II - for balance\n• Tree Pose - for focus\n\n**Meditation Tips**:\n• Start with 5-10 minutes daily\n• Focus on your breath\n• Use guided meditation apps\n• Find a quiet, comfortable space\n• Be patient with your mind\n\n**Mindfulness Practices**:\n- Mindful eating\n- Walking meditation\n- Body scan meditation\n- Loving-kindness meditation\n\n**Benefits**:\n- Reduces stress and anxiety\n- Improves flexibility and balance\n- Enhances mental clarity\n- Promotes better sleep\n\nFor personalized yoga sequences and meditation guidance, please try again when the AI service is available.",
        confidence: 0.6
      };
    }
    
    // General wellness
    return {
      text: "🧘‍♀️ **SwasthZenith Wellness Assistant (Offline Mode)**\n\nI'm here to help with your wellness journey! Here are some general wellness tips:\n\n**Daily Wellness Habits**:\n• Stay hydrated (8-10 glasses of water)\n• Get 7-9 hours of quality sleep\n• Move your body for 30 minutes daily\n• Eat a balanced, colorful diet\n• Practice stress management\n\n**Weekly Wellness Goals**:\n• Try a new healthy recipe\n• Explore a new form of exercise\n• Practice mindfulness or meditation\n• Connect with friends or family\n• Spend time in nature\n\n**Remember**:\n- Small changes lead to big results\n- Consistency is key\n- Listen to your body\n- Celebrate your progress\n\nFor personalized wellness guidance, nutrition advice, workout plans, and health coaching, please try again when the AI service is available. I'm here to support your wellness journey! 🌟",
      confidence: 0.5
    };
  }

  // Update configuration
  updateConfig(newConfig: Partial<AIConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current configuration
  getConfig(): AIConfig {
    return { ...this.config };
  }
}

// Create default AI service instance
export const aiService = new AIService({
  provider: 'custom-agent', // Connect to the SwasthZenith AI Agent
  customEndpoint: 'http://localhost:5000/chat',
  temperature: 0.7,
  maxTokens: 500,
});

export default AIService; 