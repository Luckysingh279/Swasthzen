import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Bot, Key, Zap, TestTube, CheckCircle, XCircle, Wifi, WifiOff } from 'lucide-react';
import { aiService, AIConfig } from '@/services/aiService';

const AIConfigComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<AIConfig>(aiService.getConfig());
  const [apiKey, setApiKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    details?: any;
  } | null>(null);

  const handleSaveConfig = () => {
    const newConfig = {
      ...config,
      apiKey: apiKey || config.apiKey,
    };
    
    aiService.updateConfig(newConfig);
    setConfig(newConfig);
    setIsOpen(false);
    setTestResult(null);
  };

  const testConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      let testEndpoint = '';
      let testMessage = '';

      switch (config.provider) {
        case 'custom-agent':
          testEndpoint = config.customEndpoint || 'http://localhost:5000/health';
          testMessage = 'Testing AI agent connection...';
          break;
        case 'openai':
          testMessage = 'Testing OpenAI connection...';
          break;
        case 'claude':
          testMessage = 'Testing Claude connection...';
          break;
        case 'local':
          testEndpoint = 'http://localhost:11434/api/tags';
          testMessage = 'Testing local AI connection...';
          break;
        default:
          testMessage = 'Testing connection...';
      }

      if (testEndpoint) {
        const response = await fetch(testEndpoint);
        if (response.ok) {
          setTestResult({
            success: true,
            message: 'Connection successful!',
            details: await response.json()
          });
        } else {
          setTestResult({
            success: false,
            message: `Connection failed: ${response.status} ${response.statusText}`,
            details: { status: response.status, statusText: response.statusText }
          });
        }
      } else {
        // For providers without health endpoints, test with a simple message
        const testResponse = await aiService.getResponse('Hello, this is a connection test.');
        setTestResult({
          success: true,
          message: 'Connection test successful!',
          details: { response: testResponse.text.substring(0, 100) + '...' }
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error: error }
      });
    } finally {
      setIsTesting(false);
    }
  };

  const providers = [
    { value: 'openai', label: 'OpenAI GPT', description: 'Use OpenAI GPT models', icon: '🤖' },
    { value: 'claude', label: 'Claude (Anthropic)', description: 'Use Claude AI models', icon: '🧠' },
    { value: 'local', label: 'Local AI (Ollama)', description: 'Use local AI models', icon: '🏠' },
    { value: 'custom', label: 'Custom Provider', description: 'Use your own AI endpoint', icon: '🔧' },
    { value: 'custom-agent', label: 'SwasthZenith AI Agent', description: 'Use your dedicated AI agent', icon: '🧘‍♀️' },
  ];

  const models = {
    openai: [
      { value: 'gpt-4o', label: 'GPT-4o (Latest)' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    ],
    claude: [
      { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' },
      { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' },
      { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' },
    ],
    local: [
      { value: 'llama2', label: 'Llama 2' },
      { value: 'mistral', label: 'Mistral' },
      { value: 'codellama', label: 'Code Llama' },
    ],
    custom: [
      { value: 'custom', label: 'Custom Model' },
    ],
    'custom-agent': [
      { value: 'swasthzenith-agent', label: 'SwasthZenith Wellness Agent' },
    ],
  };

  const getProviderIcon = (provider: string) => {
    const found = providers.find(p => p.value === provider);
    return found?.icon || '🤖';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
          <Settings className="w-4 h-4 mr-2" />
          AI Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>AI Assistant Configuration</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Configuration Status */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getProviderIcon(config.provider)}</span>
                  <div>
                    <h4 className="font-medium text-blue-800">
                      {providers.find(p => p.value === config.provider)?.label}
                    </h4>
                    <p className="text-sm text-blue-600">
                      {providers.find(p => p.value === config.provider)?.description}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-300">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Provider Selection */}
          <div className="space-y-2">
            <Label htmlFor="provider">AI Provider</Label>
            <Select value={config.provider} onValueChange={(value: any) => setConfig({ ...config, provider: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.value} value={provider.value}>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{provider.icon}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{provider.label}</span>
                        <span className="text-sm text-gray-500">{provider.description}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={config.model} onValueChange={(value) => setConfig({ ...config, model: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {models[config.provider]?.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* API Key */}
          {config.provider !== 'local' && (
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-gray-500">
                {config.provider === 'openai' && "Get your API key from OpenAI platform"}
                {config.provider === 'claude' && "Get your API key from Anthropic console"}
                {config.provider === 'custom' && "Enter your custom API key"}
                {config.provider === 'custom-agent' && "Enter your AI agent API key (optional for local agent)"}
              </p>
            </div>
          )}

          {/* Custom Endpoint for Custom Agent */}
          {config.provider === 'custom-agent' && (
            <div className="space-y-2">
              <Label htmlFor="customEndpoint">AI Agent Endpoint</Label>
              <Input
                id="customEndpoint"
                type="url"
                placeholder="http://localhost:5000/chat"
                value={config.customEndpoint || ''}
                onChange={(e) => setConfig({ ...config, customEndpoint: e.target.value })}
              />
              <p className="text-sm text-gray-500">
                Enter the URL of your SwasthZenith AI agent endpoint
              </p>
            </div>
          )}

          {/* System Prompt for Custom Agent */}
          {config.provider === 'custom-agent' && (
            <div className="space-y-2">
              <Label htmlFor="systemPrompt">System Prompt (Optional)</Label>
              <textarea
                id="systemPrompt"
                placeholder="Enter your custom system prompt for the AI agent..."
                value={config.systemPrompt || ''}
                onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
              <p className="text-sm text-gray-500">
                Define how your AI agent should behave and respond (leave empty for default wellness prompt)
              </p>
            </div>
          )}

          {/* Advanced Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Advanced Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    value={config.temperature}
                    onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                  />
                  <p className="text-xs text-gray-500">Controls response creativity (0-2)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTokens">Max Tokens</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    min="100"
                    max="4000"
                    step="100"
                    value={config.maxTokens}
                    onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                  />
                  <p className="text-xs text-gray-500">Maximum response length</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connection Test */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center space-x-2">
                <TestTube className="w-4 h-4" />
                <span>Connection Test</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={testConnection}
                disabled={isTesting}
                variant="outline"
                className="w-full"
              >
                {isTesting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Testing Connection...
                  </>
                ) : (
                  <>
                    <Wifi className="w-4 h-4 mr-2" />
                    Test Connection
                  </>
                )}
              </Button>

              {testResult && (
                <Alert className={testResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  <div className="flex items-center space-x-2">
                    {testResult.success ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <AlertDescription className={testResult.success ? "text-green-800" : "text-red-800"}>
                      {testResult.message}
                    </AlertDescription>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Local AI Instructions */}
          {config.provider === 'local' && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <h4 className="font-medium text-blue-800 mb-2">Local AI Setup</h4>
                <p className="text-sm text-blue-700 mb-3">
                  To use local AI models, you need to install and run Ollama:
                </p>
                <div className="bg-blue-100 p-3 rounded text-sm font-mono text-blue-800">
                  <div># Install Ollama</div>
                  <div>curl -fsSL https://ollama.ai/install.sh | sh</div>
                  <div className="mt-2"># Pull a model</div>
                  <div>ollama pull llama2</div>
                  <div className="mt-2"># Start Ollama</div>
                  <div>ollama serve</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* SwasthZenith AI Agent Instructions */}
          {config.provider === 'custom-agent' && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <h4 className="font-medium text-green-800 mb-2">SwasthZenith AI Agent Setup</h4>
                <p className="text-sm text-green-700 mb-3">
                  To use your dedicated AI agent:
                </p>
                <div className="bg-green-100 p-3 rounded text-sm font-mono text-green-800">
                  <div># Navigate to ai-agent folder</div>
                  <div>cd ai-agent</div>
                  <div className="mt-2"># Install dependencies</div>
                  <div>pip install -r requirements.txt</div>
                  <div className="mt-2"># Add your OpenAI API key to .env</div>
                  <div># OPENAI_API_KEY=your_api_key_here</div>
                  <div className="mt-2"># Run the agent</div>
                  <div>python run_agent.py</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConfig}>
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIConfigComponent; 