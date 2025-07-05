@echo off
echo ========================================
echo SwasthZenith AI Agent Setup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

echo ✅ Python is installed

REM Navigate to ai-agent directory
cd ai-agent

REM Check if requirements.txt exists
if not exist "requirements.txt" (
    echo ❌ requirements.txt not found in ai-agent directory
    pause
    exit /b 1
)

echo 📦 Installing Python dependencies...
pip install -r requirements.txt

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Check if .env file exists
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy env_example.txt .env
    echo.
    echo ⚠️  IMPORTANT: Please edit .env file and add your OpenAI API key!
    echo    Get your API key from: https://platform.openai.com/api-keys
    echo.
    echo Press any key to open .env file for editing...
    pause
    notepad .env
)

echo.
echo 🚀 Starting SwasthZenith AI Agent...
echo.
echo 🌐 The agent will be available at: http://localhost:5000
echo 💬 Chat endpoint: http://localhost:5000/chat
echo.
echo 📝 To connect to your website:
echo    1. Open AI Settings in your website
echo    2. Select 'Custom AI Agent'
echo    3. Set endpoint to: http://localhost:5000/chat
echo.
echo ⏹️  Press Ctrl+C to stop the agent
echo.

python run_agent.py

pause 