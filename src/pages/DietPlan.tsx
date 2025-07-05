import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, Activity, Target, TrendingUp, User, Heart, 
  Calendar, MessageCircle, Bell, Droplets, ShoppingCart,
  Star, Trophy, Users, Smartphone, Zap, Play, BookOpen,
  PlusCircle, Settings, BarChart3, Camera, MapPin, Utensils,
  Apple, Beef, Fish, Leaf, Carrot, Wheat, Milk, Egg, Sun, Moon
} from 'lucide-react';
import MealLogger from '@/components/MealLogger';
import WeeklyMealPlan from '@/components/WeeklyMealPlan';
import { useNavigate } from 'react-router-dom';

const DietPlanSchema = z.object({
  height: z.number().min(50, "Height must be at least 50cm").max(250, "Height must be less than 250cm"),
  weight: z.number().min(20, "Weight must be at least 20kg").max(300, "Weight must be less than 300kg"),
  age: z.number().min(18, "Age must be at least 18").max(100, "Age must be less than 100"),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
  dietType: z.enum(["vegetarian", "non_vegetarian"]),
  goal: z.enum(["weight_loss", "weight_gain", "maintenance"]),
  targetCalories: z.number().min(1200, "Minimum 1200 calories").max(4000, "Maximum 4000 calories")
});

type DietPlanFormData = z.infer<typeof DietPlanSchema>;



const DietPlan: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('plan');
  const [userName, setUserName] = useState<string>('User');
  const [bmiResult, setBmiResult] = useState<{bmi: number, category: string} | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<DietPlanFormData>({
    resolver: zodResolver(DietPlanSchema),
    defaultValues: {
      activityLevel: 'moderate',
      dietType: 'vegetarian',
      goal: 'weight_loss',
      targetCalories: 1800
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('sz_logged_in');
    if (userData) {
      const user = JSON.parse(userData);
      const displayName = user.fullName || user.email || user.mobileNumber || user.userId || 'User';
      setUserName(displayName);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const calculateBMI = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
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

    return { bmi: parseFloat(bmi.toFixed(2)), category };
  };

  const calculateBMR = (weight: number, height: number, age: number, gender: string) => {
    // Using Mifflin-St Jeor Equation
    const bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
    return bmr;
  };

  const calculateTDEE = (bmr: number, activityLevel: string) => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    return bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
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

  const generateWeeklyPlan = async (data: DietPlanFormData) => {
    setIsGeneratingPlan(true);
    
    // Calculate BMI
    const bmi = calculateBMI(data.height, data.weight);
    setBmiResult(bmi);
    
    // Calculate BMR and TDEE (assuming male for calculation, you can add gender field)
    const bmr = calculateBMR(data.weight, data.height, data.age, 'male');
    const tdee = calculateTDEE(bmr, data.activityLevel);
    
    // Adjust calories based on goal
    let targetCalories = data.targetCalories;
    if (data.goal === 'weight_loss') {
      targetCalories = Math.max(1200, tdee - 500);
    } else if (data.goal === 'weight_gain') {
      targetCalories = tdee + 300;
    } else {
      targetCalories = tdee;
    }
    
    setValue('targetCalories', Math.round(targetCalories));
    
    setIsGeneratingPlan(false);
  };



  const handleLogout = () => {
    localStorage.removeItem('sz_logged_in');
    navigate('/login');
  };

  const tabs = [
    { id: 'plan', label: 'Diet Plan', icon: Utensils },
    { id: 'meals', label: 'Meal Log', icon: Apple },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'recipes', label: 'Recipes', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 via-pink-500 to-teal-500 rounded-full flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-pink-500 to-teal-600 bg-clip-text text-transparent">
                  Personalized Diet Plan
                </h1>
                <p className="text-gray-600">Customized nutrition for your wellness goals</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-green-200 text-green-600 hover:bg-green-50"
                onClick={() => window.open('https://wa.me/917760210344?text=Hi! I need help with my diet plan and nutrition goals.', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat Coach
              </Button>
              <Button variant="outline" size="sm" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
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

        {/* Diet Plan Tab */}
        {activeTab === 'plan' && (
          <div className="space-y-8">
            {/* Diet Plan Form */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-gradient-to-r from-pink-100 to-rose-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calculator className="w-7 h-7 text-pink-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-800">Create Your Diet Plan</CardTitle>
                    <p className="text-gray-600">Get personalized meal plans based on your preferences and goals</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(generateWeeklyPlan)} className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <User className="w-5 h-5 mr-2 text-pink-600" />
                        Basic Information
                      </h3>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                        <Input 
                          type="number" 
                          {...register('height', { valueAsNumber: true })}
                          placeholder="170" 
                          className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                        />
                        {errors.height && (
                          <p className="text-red-500 text-sm">{errors.height.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                        <Input 
                          type="number" 
                          {...register('weight', { valueAsNumber: true })}
                          placeholder="70" 
                          className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                        />
                        {errors.weight && (
                          <p className="text-red-500 text-sm">{errors.weight.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <Input 
                          type="number" 
                          {...register('age', { valueAsNumber: true })}
                          placeholder="30" 
                          className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                        />
                        {errors.age && (
                          <p className="text-red-500 text-sm">{errors.age.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Diet Preferences */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <Leaf className="w-5 h-5 mr-2 text-green-600" />
                        Diet Preferences
                      </h3>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Diet Type</label>
                        <Select onValueChange={(value) => setValue('dietType', value as 'vegetarian' | 'non_vegetarian')} defaultValue={watchedValues.dietType}>
                          <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-pink-500">
                            <SelectValue placeholder="Select diet type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetarian">
                              <div className="flex items-center">
                                <Leaf className="w-4 h-4 mr-2 text-green-600" />
                                Vegetarian
                              </div>
                            </SelectItem>
                            <SelectItem value="non_vegetarian">
                              <div className="flex items-center">
                                <Beef className="w-4 h-4 mr-2 text-red-600" />
                                Non-Vegetarian
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                        <Select onValueChange={(value) => setValue('activityLevel', value as any)} defaultValue={watchedValues.activityLevel}>
                          <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-pink-500">
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary (Little to no exercise)</SelectItem>
                            <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                            <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                            <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                            <SelectItem value="very_active">Very Active (Hard exercise daily)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Goal</label>
                        <Select onValueChange={(value) => setValue('goal', value as any)} defaultValue={watchedValues.goal}>
                          <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-pink-500">
                            <SelectValue placeholder="Select your goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weight_loss">Weight Loss</SelectItem>
                            <SelectItem value="weight_gain">Weight Gain</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Target Calories */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-teal-600" />
                        Target Calories
                      </h3>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Daily Calories</label>
                        <Input 
                          type="number" 
                          {...register('targetCalories', { valueAsNumber: true })}
                          placeholder="1800" 
                          className="transition-all duration-300 focus:ring-2 focus:ring-pink-500"
                        />
                        {errors.targetCalories && (
                          <p className="text-red-500 text-sm">{errors.targetCalories.message}</p>
                        )}
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Recommended Breakdown:</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>Protein: {Math.round(watchedValues.targetCalories * 0.25 / 4)}g (25%)</div>
                          <div>Carbs: {Math.round(watchedValues.targetCalories * 0.45 / 4)}g (45%)</div>
                          <div>Fat: {Math.round(watchedValues.targetCalories * 0.30 / 9)}g (30%)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      disabled={isGeneratingPlan}
                      className="group flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl py-6"
                    >
                      {isGeneratingPlan ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating Plan...
                        </>
                      ) : (
                        <>
                          <Utensils className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                          Generate Diet Plan
                        </>
                      )}
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
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Meal Plan Component */}
            {bmiResult && (
              <WeeklyMealPlan 
                dietType={watchedValues.dietType}
                targetCalories={watchedValues.targetCalories}
                goal={watchedValues.goal}
              />
            )}
          </div>
        )}

        {/* Meals Tab */}
        {activeTab === 'meals' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Meal Logging & Tracking</h3>
              <p className="text-gray-600">Log your daily meals and track your nutrition intake</p>
            </div>
            <MealLogger />
          </div>
        )}

        {/* Other tabs content */}
        {activeTab !== 'plan' && activeTab !== 'meals' && (
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
            <div className="space-y-4">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                Get Notified When Ready
              </Button>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline"
                  className="border-green-200 text-green-600 hover:bg-green-50"
                  onClick={() => window.open('https://wa.me/917760210344?text=Hi! I need help with my wellness journey.', '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Coach
                </Button>
                <Button 
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => window.open('https://chat.whatsapp.com/Ecgmkb3479KFbO70Xb78jm', '_blank')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlan;