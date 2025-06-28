import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, Activity, Target, TrendingUp, User, Heart, 
  Calendar, MessageCircle, Bell, Droplets, ShoppingCart,
  Star, Trophy, Users, Smartphone, Zap, Play, BookOpen,
  PlusCircle, Settings, BarChart3, Camera, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BMISchema = z.object({
  height: z.number().min(50, "Height must be at least 50cm").max(250, "Height must be less than 250cm"),
  weight: z.number().min(20, "Weight must be at least 20kg").max(300, "Weight must be less than 300kg")
});

type BMIFormData = z.infer<typeof BMISchema>;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [bmiResult, setBmiResult] = useState<{bmi: number, category: string} | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [userName, setUserName] = useState<string>('User');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BMIFormData>({
    resolver: zodResolver(BMISchema)
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('sz_logged_in');
    if (userData) {
      const user = JSON.parse(userData);
      // Use full name if available, otherwise use email or mobile number
      const displayName = user.fullName || user.email || user.mobileNumber || user.userId || 'User';
      setUserName(displayName);
    } else {
      // If no user is logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('sz_logged_in');
    navigate('/login');
  };

  const calculateBMI = (data: BMIFormData) => {
    const heightInMeters = data.height / 100;
    const bmi = data.weight / (heightInMeters * heightInMeters);
    
    let category = '';
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 24.9) {
      category = 'Normal weight';
    } else if (bmi < 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    setBmiResult({ bmi: parseFloat(bmi.toFixed(2)), category });
  };

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'text-blue-600';
      case 'Normal weight': return 'text-green-600';
      case 'Overweight': return 'text-yellow-600';
      case 'Obese': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'yoga', label: 'Yoga', icon: Heart },
    { id: 'nutrition', label: 'Nutrition', icon: Droplets },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 via-pink-500 to-teal-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-pink-500 to-teal-600 bg-clip-text text-transparent">
                  Welcome back, {userName}!
                </h1>
                <p className="text-gray-600">Let's continue your wellness journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-pink-50 to-rose-100 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Heart className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Yoga Sessions</p>
                      <p className="text-2xl font-bold text-pink-600">28</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-green-50 to-emerald-100 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Droplets className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Water Intake</p>
                      <p className="text-2xl font-bold text-green-600">2.1L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-teal-50 to-cyan-100 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weight Loss</p>
                      <p className="text-2xl font-bold text-teal-600">-3.2kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-purple-50 to-pink-100 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Streak Days</p>
                      <p className="text-2xl font-bold text-purple-600">15</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* BMI Calculator */}
              <div className="lg:col-span-2">
                <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-gradient-to-r from-pink-100 to-rose-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Calculator className="w-7 h-7 text-pink-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-800">BMI Calculator</CardTitle>
                        <p className="text-gray-600">Monitor your body mass index and health status</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(calculateBMI)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                            Height (cm)
                          </label>
                          <Input 
                            type="number" 
                            {...register('height', { valueAsNumber: true })}
                            placeholder="Enter your height" 
                            className={`transition-all duration-300 focus:ring-2 focus:ring-pink-500 hover:border-pink-400 ${
                              errors.height ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                          />
                          {errors.height && (
                            <p className="text-red-500 text-sm animate-fade-in">{errors.height.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                            Weight (kg)
                          </label>
                          <Input 
                            type="number" 
                            {...register('weight', { valueAsNumber: true })}
                            placeholder="Enter your weight" 
                            className={`transition-all duration-300 focus:ring-2 focus:ring-pink-500 hover:border-pink-400 ${
                              errors.weight ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                          />
                          {errors.weight && (
                            <p className="text-red-500 text-sm animate-fade-in">{errors.weight.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          type="submit" 
                          className="group flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl py-6"
                        >
                          <Calculator className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                          Calculate BMI
                        </Button>
                        
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => {reset(); setBmiResult(null);}}
                          className="group border-2 border-pink-300 hover:border-pink-500 hover:bg-pink-50 transform hover:scale-105 transition-all duration-300 px-6"
                        >
                          Clear
                        </Button>
                      </div>
                    </form>

                    {/* BMI Result */}
                    {bmiResult && (
                      <div className="mt-6 p-6 bg-gradient-to-r from-white to-pink-50 rounded-xl border-2 border-pink-200 animate-fade-in">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-4">
                            <Activity className="w-8 h-8 text-pink-600 mr-2" />
                            <h3 className="text-2xl font-bold text-gray-800">Your BMI Result</h3>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-4xl font-bold text-pink-600">{bmiResult.bmi}</p>
                            <p className={`text-xl font-semibold ${getBMIColor(bmiResult.category)}`}>
                              {bmiResult.category}
                            </p>
                          </div>
                          
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              BMI is a useful measure of overweight and obesity. Keep tracking your progress for better health outcomes.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Today's Schedule */}
              <div className="space-y-6">
                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Calendar className="w-5 h-5 mr-2 text-pink-600" />
                      Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                      <div className="w-2 h-8 bg-pink-500 rounded"></div>
                      <div>
                        <p className="font-semibold text-gray-800">Morning Yoga</p>
                        <p className="text-sm text-gray-600">7:00 AM - 8:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-8 bg-green-500 rounded"></div>
                      <div>
                        <p className="font-semibold text-gray-800">Nutrition Check</p>
                        <p className="text-sm text-gray-600">12:00 PM - 12:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg">
                      <div className="w-2 h-8 bg-teal-500 rounded"></div>
                      <div>
                        <p className="font-semibold text-gray-800">Evening Walk</p>
                        <p className="text-sm text-gray-600">6:00 PM - 7:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Trophy className="w-5 h-5 mr-2 text-purple-600" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Week Warrior</p>
                        <p className="text-sm text-gray-600">7 days streak completed</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Yoga Master</p>
                        <p className="text-sm text-gray-600">25 sessions completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="group h-20 border-2 border-pink-300 hover:border-pink-500 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transform hover:scale-105 transition-all duration-300 flex flex-col space-y-2"
              >
                <Play className="w-6 h-6 text-pink-600 group-hover:scale-110 transition-transform" />
                <span className="text-pink-600 font-medium">Start Yoga Session</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="group h-20 border-2 border-green-300 hover:border-green-500 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transform hover:scale-105 transition-all duration-300 flex flex-col space-y-2"
              >
                <PlusCircle className="w-6 h-6 text-green-600 group-hover:rotate-90 transition-transform duration-500" />
                <span className="text-green-600 font-medium">Log Meal</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="group h-20 border-2 border-teal-300 hover:border-teal-500 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transform hover:scale-105 transition-all duration-300 flex flex-col space-y-2"
              >
                <MessageCircle className="w-6 h-6 text-teal-600 group-hover:animate-pulse transition-transform" />
                <span className="text-teal-600 font-medium">Chat with Coach</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="group h-20 border-2 border-purple-300 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transform hover:scale-105 transition-all duration-300 flex flex-col space-y-2"
              >
                <Users className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-purple-600 font-medium">Join Community</span>
              </Button>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'overview' && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-12 h-12 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label} Section
            </h3>
            <p className="text-gray-600 mb-8">
              This section is coming soon with comprehensive {activeTab} features and tracking.
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
              Get Notified When Ready
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
