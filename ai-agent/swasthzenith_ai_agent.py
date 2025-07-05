#!/usr/bin/env python3
"""
SwasthZenith AI Agent - Python Flask API
A complete online AI agent using OpenAI that can be integrated with your website.
"""

import os
import json
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY", "YOUR_API_KEY")

# SwasthZenith system prompt
SWASTHZENITH_SYSTEM_PROMPT = """You are SwasthZenith, a friendly, expert wellness assistant. You help users with:

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

Provide personalized, helpful responses that empower users to achieve their health and wellness goals."""

class SwasthZenithAgent:
    def __init__(self):
        self.conversation_history = []
        self.model = "gpt-4o"
        self.max_tokens = 500
        self.temperature = 0.7
        
    def generate_response(self, user_prompt, system_prompt=None):
        """Generate AI response using OpenAI"""
        try:
            # Prepare messages
            messages = [
                {
                    "role": "system",
                    "content": system_prompt or SWASTHZENITH_SYSTEM_PROMPT
                }
            ]
            
            # Add conversation history (last 10 exchanges for context)
            for msg in self.conversation_history[-10:]:
                messages.append(msg)
            
            # Add current user message
            messages.append({
                "role": "user",
                "content": user_prompt
            })
            
            # Call OpenAI API
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            ai_response = response['choices'][0]['message']['content']
            
            # Update conversation history
            self.conversation_history.append({
                "role": "user",
                "content": user_prompt
            })
            self.conversation_history.append({
                "role": "assistant", 
                "content": ai_response
            })
            
            # Keep only last 20 messages to manage context
            if len(self.conversation_history) > 20:
                self.conversation_history = self.conversation_history[-20:]
            
            return {
                "response": ai_response,
                "confidence": 0.9,
                "success": True,
                "metadata": {
                    "model": self.model,
                    "tokens_used": response['usage']['total_tokens'],
                    "timestamp": datetime.now().isoformat(),
                    "agent": "SwasthZenith"
                }
            }
            
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            return {
                "response": "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
                "confidence": 0.1,
                "success": False,
                "error": str(e),
                "metadata": {
                    "timestamp": datetime.now().isoformat(),
                    "agent": "SwasthZenith"
                }
            }

# Initialize the agent
agent = SwasthZenithAgent()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "agent": "SwasthZenith",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "response": "No data provided",
                "success": False,
                "error": "Missing request data"
            }), 400
        
        user_prompt = data.get('prompt', '')
        system_prompt = data.get('systemPrompt', SWASTHZENITH_SYSTEM_PROMPT)
        
        if not user_prompt:
            return jsonify({
                "response": "No prompt provided",
                "success": False,
                "error": "Missing prompt"
            }), 400
        
        # Log the request
        logger.info(f"Received chat request: {user_prompt[:100]}...")
        
        # Generate response
        response = agent.generate_response(user_prompt, system_prompt)
        
        # Log the response
        logger.info(f"Generated response: {response['response'][:100]}...")
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            "response": "I apologize, but I encountered an error. Please try again.",
            "success": False,
            "error": str(e)
        }), 500

@app.route('/config', methods=['GET'])
def get_config():
    """Get agent configuration"""
    return jsonify({
        "model": agent.model,
        "max_tokens": agent.max_tokens,
        "temperature": agent.temperature,
        "system_prompt": SWASTHZENITH_SYSTEM_PROMPT,
        "agent": "SwasthZenith"
    })

@app.route('/config', methods=['POST'])
def update_config():
    """Update agent configuration"""
    try:
        data = request.get_json()
        
        if 'model' in data:
            agent.model = data['model']
        if 'max_tokens' in data:
            agent.max_tokens = data['max_tokens']
        if 'temperature' in data:
            agent.temperature = data['temperature']
            
        return jsonify({
            "message": "Configuration updated successfully",
            "config": {
                "model": agent.model,
                "max_tokens": agent.max_tokens,
                "temperature": agent.temperature
            }
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Failed to update configuration: {str(e)}"
        }), 400

@app.route('/clear-history', methods=['POST'])
def clear_history():
    """Clear conversation history"""
    agent.conversation_history = []
    return jsonify({
        "message": "Conversation history cleared successfully"
    })

@app.route('/', methods=['GET'])
def home():
    """Home endpoint with usage instructions"""
    return jsonify({
        "message": "SwasthZenith AI Agent API",
        "version": "1.0.0",
        "endpoints": {
            "POST /chat": "Send a message to the AI agent",
            "GET /health": "Check agent health",
            "GET /config": "Get agent configuration",
            "POST /config": "Update agent configuration",
            "POST /clear-history": "Clear conversation history"
        },
        "usage": {
            "chat_endpoint": "POST /chat with JSON body: {\"prompt\": \"Your message\"}",
            "system_prompt": "Optional custom system prompt in request body"
        }
    })

if __name__ == '__main__':
    # Check if OpenAI API key is set
    if not openai.api_key or openai.api_key == "YOUR_API_KEY":
        print("⚠️  Warning: OpenAI API key not set!")
        print("Please set your OpenAI API key in the .env file or environment variable OPENAI_API_KEY")
        print("You can get an API key from: https://platform.openai.com/api-keys")
    
    print("🧘‍♀️ Starting SwasthZenith AI Agent... 🧘‍♂️")
    print("🌐 API will be available at: http://localhost:5000")
    print("💬 Chat endpoint: http://localhost:5000/chat")
    print("🏥 Health check: http://localhost:5000/health")
    print("⚙️  Configuration: http://localhost:5000/config")
    print("\n📝 To test the agent, send a POST request to /chat with:")
    print('{"prompt": "Hello, can you help me with nutrition advice?"}')
    print("\n🚀 Agent is ready! Press Ctrl+C to stop.\n")
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=True) 