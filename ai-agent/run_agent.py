#!/usr/bin/env python3
"""
SwasthZenith AI Agent Runner
Simple script to run your AI agent with setup instructions.
"""

import os
import sys
import subprocess
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 7):
        print("❌ Error: Python 3.7 or higher is required!")
        print(f"Current version: {sys.version}")
        return False
    print(f"✅ Python version: {sys.version.split()[0]}")
    return True

def check_dependencies():
    """Check if required packages are installed"""
    required_packages = ['flask', 'openai', 'python-dotenv']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package} is installed")
        except ImportError:
            missing_packages.append(package)
            print(f"❌ {package} is missing")
    
    if missing_packages:
        print(f"\n📦 Installing missing packages: {', '.join(missing_packages)}")
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + missing_packages)
            print("✅ All packages installed successfully!")
        except subprocess.CalledProcessError:
            print("❌ Failed to install packages. Please install manually:")
            print(f"pip install {' '.join(missing_packages)}")
            return False
    
    return True

def setup_environment():
    """Setup environment file if it doesn't exist"""
    env_file = Path('.env')
    env_example = Path('env_example.txt')
    
    if not env_file.exists():
        if env_example.exists():
            print("📝 Creating .env file from template...")
            with open(env_example, 'r') as f:
                content = f.read()
            
            with open('.env', 'w') as f:
                f.write(content)
            
            print("✅ .env file created!")
            print("⚠️  IMPORTANT: Please edit .env file and add your OpenAI API key!")
            print("   Get your API key from: https://platform.openai.com/api-keys")
            return False
        else:
            print("❌ env_example.txt not found!")
            return False
    else:
        print("✅ .env file exists")
        return True

def check_api_key():
    """Check if OpenAI API key is set"""
    from dotenv import load_dotenv
    load_dotenv()
    
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key or api_key == 'your_openai_api_key_here':
        print("❌ OpenAI API key not set!")
        print("Please edit .env file and add your API key")
        return False
    
    print("✅ OpenAI API key is configured")
    return True

def run_agent():
    """Run the AI agent"""
    print("\n🚀 Starting SwasthZenith AI Agent...")
    print("=" * 50)
    
    try:
        # Import and run the agent
        from swasthzenith_ai_agent import app
        
        print("🧘‍♀️ SwasthZenith AI Agent is running! 🧘‍♂️")
        print("🌐 API URL: http://localhost:5000")
        print("💬 Chat endpoint: http://localhost:5000/chat")
        print("🏥 Health check: http://localhost:5000/health")
        print("\n📝 To connect to your website:")
        print("1. Open AI Settings in your website")
        print("2. Select 'Custom AI Agent'")
        print("3. Set endpoint to: http://localhost:5000/chat")
        print("\n⏹️  Press Ctrl+C to stop the agent\n")
        
        app.run(host='0.0.0.0', port=5000, debug=True)
        
    except KeyboardInterrupt:
        print("\n👋 SwasthZenith AI Agent stopped. Goodbye!")
    except Exception as e:
        print(f"❌ Error running agent: {e}")
        return False
    
    return True

def main():
    """Main setup and run function"""
    print("🧘‍♀️ SwasthZenith AI Agent Setup 🧘‍♂️")
    print("=" * 40)
    
    # Check Python version
    if not check_python_version():
        return
    
    # Check dependencies
    if not check_dependencies():
        return
    
    # Setup environment
    if not setup_environment():
        print("\n📝 Please edit .env file and add your OpenAI API key")
        print("Then run this script again.")
        return
    
    # Check API key
    if not check_api_key():
        return
    
    # Run the agent
    run_agent()

if __name__ == '__main__':
    main() 