# SwasthZenith AI Agent Setup Script
# Run this script to setup and start your AI agent

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SwasthZenith AI Agent Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python is installed: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python from https://python.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Navigate to ai-agent directory
Set-Location "ai-agent"

# Check if requirements.txt exists
if (-not (Test-Path "requirements.txt")) {
    Write-Host "❌ requirements.txt not found in ai-agent directory" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "📦 Installing Python dependencies..." -ForegroundColor Yellow
try {
    pip install -r requirements.txt
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item "env_example.txt" ".env"
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Please edit .env file and add your OpenAI API key!" -ForegroundColor Red
    Write-Host "   Get your API key from: https://platform.openai.com/api-keys" -ForegroundColor Yellow
    Write-Host ""
    $openEditor = Read-Host "Press Enter to open .env file for editing (or 'n' to skip)"
    if ($openEditor -ne "n") {
        notepad ".env"
    }
}

Write-Host ""
Write-Host "🚀 Starting SwasthZenith AI Agent..." -ForegroundColor Green
Write-Host ""
Write-Host "🌐 The agent will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host "💬 Chat endpoint: http://localhost:5000/chat" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 To connect to your website:" -ForegroundColor Yellow
Write-Host "   1. Open AI Settings in your website" -ForegroundColor White
Write-Host "   2. Select 'Custom AI Agent'" -ForegroundColor White
Write-Host "   3. Set endpoint to: http://localhost:5000/chat" -ForegroundColor White
Write-Host ""
Write-Host "⏹️  Press Ctrl+C to stop the agent" -ForegroundColor Yellow
Write-Host ""

try {
    python run_agent.py
} catch {
    Write-Host "❌ Error running AI agent: $_" -ForegroundColor Red
}

Read-Host "Press Enter to exit" 