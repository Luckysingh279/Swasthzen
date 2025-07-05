import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, Leaf, Users, ArrowRight, CheckCircle, Calendar, 
  Activity, Target, MessageCircle, Bell, Smartphone, 
  Globe, Shield, Zap, Star, Trophy, Gift
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-teal-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-pink-500 to-teal-600 bg-clip-text text-transparent">
                SwasthZenith
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-pink-600 transition-colors">Features</a>
              <a href="#plans" className="text-gray-700 hover:text-pink-600 transition-colors">Plans</a>
              <a href="#community" className="text-gray-700 hover:text-pink-600 transition-colors">Community</a>
              <Link to="/login" className="text-gray-700 hover:text-pink-600 transition-colors">Login</Link>
            </div>
            <Link to="/trial-signup">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-100 via-pink-100 to-teal-100 rounded-full flex items-center justify-center mr-4">
              <Leaf className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-pink-500 to-teal-600 bg-clip-text text-transparent">
              SwasthZenith
            </h1>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Peak Wellness for Every Age
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your health journey with personalized yoga classes, custom nutrition plans, 
            and comprehensive wellness tracking designed specifically for adults seeking vitality and peak wellness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/trial-signup">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-green-600 via-pink-500 to-teal-600 hover:from-green-700 hover:via-pink-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl px-10 py-7 text-xl"
              >
                Start Your Free Trial
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="group border-3 border-pink-400 text-pink-600 hover:bg-gradient-to-r hover:from-pink-400 hover:to-rose-400 hover:text-white transform hover:scale-105 transition-all duration-300 px-10 py-7 text-xl"
            >
              Watch Demo
              <Heart className="ml-3 w-6 h-6 group-hover:animate-pulse" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Yoga Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Core Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-pink-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Weight Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p className="text-gray-600 text-lg leading-relaxed">
                Achieve sustainable weight loss with personalized nutrition plans, calorie tracking, and gentle yoga practices tailored for your age group.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Joint Relief & Flexibility</CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p className="text-gray-600 text-lg leading-relaxed">
                Reduce joint pain and improve flexibility with therapeutic yoga designed for mature bodies, including pose correction tips and guided sessions.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-100 to-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-teal-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Energy & Vitality</CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p className="text-gray-600 text-lg leading-relaxed">
                Revitalize your energy levels with holistic wellness practices, daily activity tracking, and comprehensive health monitoring.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive Features Section */}
        <div id="features" className="mb-20">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Complete Wellness Platform
          </h3>
          
          {/* Yoga Features */}
          <div className="mb-16">
            <h4 className="text-2xl font-bold text-pink-600 mb-8 flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              Yoga & Mindfulness
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-pink-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Live Classes</h5>
                  <p className="text-sm text-gray-600">Book and join live yoga sessions with expert instructors</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-pink-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Recorded Library</h5>
                  <p className="text-sm text-gray-600">Access 500+ sessions filtered by level and goals</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-pink-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Pose Correction</h5>
                  <p className="text-sm text-gray-600">AI-powered guidance and correction tips</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-pink-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Favorites</h5>
                  <p className="text-sm text-gray-600">Save and download sessions for offline practice</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Nutrition Features */}
          <div className="mb-16">
            <h4 className="text-2xl font-bold text-green-600 mb-8 flex items-center">
              <Leaf className="w-6 h-6 mr-2" />
              Nutrition & Diet
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Personal Diet Plan</h5>
                  <p className="text-sm text-gray-600">Veg/Non-veg meal plans based on BMI & goals</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Activity className="w-8 h-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Weekly Meal Plans</h5>
                  <p className="text-sm text-gray-600">Complete 7-day personalized meal schedules</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Bell className="w-8 h-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Calorie Tracking</h5>
                  <p className="text-sm text-gray-600">Smart nutrition tracking with BMI calculation</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Shopping Lists</h5>
                  <p className="text-sm text-gray-600">Auto-generated lists from your meal plans</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Health Tracking */}
          <div className="mb-16">
            <h4 className="text-2xl font-bold text-teal-600 mb-8 flex items-center">
              <Activity className="w-6 h-6 mr-2" />
              Health & Progress Tracking
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-teal-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">BMI & Weight</h5>
                  <p className="text-sm text-gray-600">Track weight trends with visual graphs</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <CardContent className="p-6 text-center">
                  <Smartphone className="w-8 h-8 text-teal-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Activity Tracker</h5>
                  <p className="text-sm text-gray-600">Steps counter and daily activity monitoring</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-teal-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Progress Reports</h5>
                  <p className="text-sm text-gray-600">Weekly reports and achievement streaks</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <CardContent className="p-6 text-center">
                  <Bell className="w-8 h-8 text-teal-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Goal Reminders</h5>
                  <p className="text-sm text-gray-600">Smart notifications for daily goals</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Community Features */}
          <div id="community" className="mb-16">
            <h4 className="text-2xl font-bold text-purple-600 mb-8 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Community & Engagement
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Community Forum</h5>
                  <p className="text-sm text-gray-600">Connect with fellow wellness enthusiasts</p>
                  <Button 
                    size="sm" 
                    className="mt-3 bg-green-600 hover:bg-green-700"
                    onClick={() => window.open('https://chat.whatsapp.com/Ecgmkb3479KFbO70Xb78jm', '_blank')}
                  >
                    Join WhatsApp Group
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Personal Coach</h5>
                  <p className="text-sm text-gray-600">One-on-one chat with certified coaches</p>
                  <Button 
                    size="sm" 
                    className="mt-3 bg-green-600 hover:bg-green-700"
                    onClick={() => window.open('https://wa.me/917760210344?text=Hi! I would like to chat with a wellness coach about my fitness goals.', '_blank')}
                  >
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Reviews & Ratings</h5>
                  <p className="text-sm text-gray-600">Rate sessions and share experiences</p>
                </CardContent>
              </Card>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-semibold text-gray-800 mb-2">Challenges</h5>
                  <p className="text-sm text-gray-600">Weekly fitness challenges and rewards</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div id="plans" className="mb-20">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">Choose Your Wellness Journey</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Basic Yoga</CardTitle>
                <div className="text-3xl font-bold text-green-600 mt-2">₹999/month</div>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Live yoga sessions</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Recorded library access</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Basic progress tracking</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Community forum</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-3 border-pink-400 bg-gradient-to-br from-pink-50 to-rose-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-pink-500 text-white px-3 py-1 text-sm font-semibold">
                POPULAR
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Premium Wellness</CardTitle>
                <div className="text-3xl font-bold text-pink-600 mt-2">₹1,999/month</div>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-pink-500 mr-2" />Everything in Basic</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-pink-500 mr-2" />Personal diet plans</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-pink-500 mr-2" />Calorie & water tracking</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-pink-500 mr-2" />Personal coach chat</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-pink-500 mr-2" />Advanced analytics</li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-colors">
                  <Trophy className="w-8 h-8 text-teal-600" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Complete Transformation</CardTitle>
                <div className="text-3xl font-bold text-teal-600 mt-2">₹2,999/month</div>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-3 text-gray-600 mb-6">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-2" />Everything in Premium</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-2" />1-on-1 video sessions</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-2" />Custom meal planning</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-2" />Health assessments</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-2" />Priority support</li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Start Free Trial</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 mb-16 shadow-xl">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why SwasthZenith Stands Out</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Multilingual Support</h4>
                <p className="text-gray-600">Available in multiple regional languages for wider accessibility</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Secure Payments</h4>
                <p className="text-gray-600">Razorpay & Stripe integration for safe transactions</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-cyan-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Mobile Optimized</h4>
                <p className="text-gray-600">Responsive design works perfectly on all devices</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Smart Notifications</h4>
                <p className="text-gray-600">Intelligent reminders and motivational push notifications</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Rewards & Referrals</h4>
                <p className="text-gray-600">Earn rewards and get discounts for referring friends</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Dark Mode</h4>
                <p className="text-gray-600">Eye-friendly dark mode for comfortable viewing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-600 via-pink-500 to-teal-600 rounded-3xl p-12 text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Health?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands who have already started their wellness journey with SwasthZenith</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/trial-signup">
              <Button 
                size="lg"
                className="group bg-white text-pink-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-12 py-6 text-xl font-semibold"
              >
                Start Your Free Trial Today
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Leaf className="w-6 h-6 text-green-400 mr-2" />
                <h4 className="font-bold text-xl">SwasthZenith</h4>
              </div>
              <p className="text-gray-400">Peak wellness for every age. Transform your health journey with us.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Features</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Yoga Classes</li>
                <li>Nutrition Plans</li>
                <li>Health Tracking</li>
                <li>Community Support</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Live Chat</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SwasthZenith. All rights reserved. Built with ❤️ for your wellness journey.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
