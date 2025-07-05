import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  PlusCircle, Utensils, Apple, Beef, Fish, Leaf, 
  Carrot, Wheat, Milk, Egg, Clock, Target, Activity
} from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  timestamp: Date;
  notes?: string;
}

interface DailyNutrition {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
}

const MealLogger: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    notes: ''
  });

  const calculateDailyNutrition = (): DailyNutrition => {
    return meals.reduce((acc, meal) => ({
      totalCalories: acc.totalCalories + meal.calories,
      totalProtein: acc.totalProtein + meal.protein,
      totalCarbs: acc.totalCarbs + meal.carbs,
      totalFat: acc.totalFat + meal.fat,
      totalFiber: acc.totalFiber + meal.fiber,
      totalSugar: acc.totalSugar + meal.sugar,
      totalSodium: acc.totalSodium + meal.sodium
    }), {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
      totalSugar: 0,
      totalSodium: 0
    });
  };

  const addMeal = () => {
    if (newMeal.name && newMeal.calories > 0) {
      const meal: Meal = {
        id: Date.now().toString(),
        name: newMeal.name,
        mealType: selectedMealType,
        calories: newMeal.calories,
        protein: newMeal.protein,
        carbs: newMeal.carbs,
        fat: newMeal.fat,
        fiber: newMeal.fiber,
        sugar: newMeal.sugar,
        sodium: newMeal.sodium,
        timestamp: new Date(),
        notes: newMeal.notes
      };
      
      setMeals([...meals, meal]);
      setNewMeal({
        name: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
        notes: ''
      });
      setShowAddMeal(false);
    }
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return <Apple className="w-4 h-4" />;
      case 'lunch': return <Utensils className="w-4 h-4" />;
      case 'dinner': return <Beef className="w-4 h-4" />;
      case 'snack': return <Carrot className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast': return 'text-yellow-600 bg-yellow-100';
      case 'lunch': return 'text-green-600 bg-green-100';
      case 'dinner': return 'text-blue-600 bg-blue-100';
      case 'snack': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const dailyNutrition = calculateDailyNutrition();

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Target className="w-5 h-5 mr-2 text-pink-600" />
            Today's Nutrition Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{dailyNutrition.totalCalories}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{dailyNutrition.totalProtein}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{dailyNutrition.totalCarbs}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{dailyNutrition.totalFat}g</div>
              <div className="text-sm text-gray-600">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Meal Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowAddMeal(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Log New Meal
        </Button>
      </div>

      {/* Add Meal Form */}
      {showAddMeal && (
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <PlusCircle className="w-5 h-5 mr-2 text-green-600" />
              Add New Meal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Meal Type</label>
                <Select onValueChange={(value) => setSelectedMealType(value as any)} defaultValue={selectedMealType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Meal Name</label>
                <Input 
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                  placeholder="e.g., Grilled Chicken Salad"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Calories</label>
                <Input 
                  type="number"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({...newMeal, calories: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                <Input 
                  type="number"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({...newMeal, protein: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                <Input 
                  type="number"
                  value={newMeal.carbs}
                  onChange={(e) => setNewMeal({...newMeal, carbs: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                <Input 
                  type="number"
                  value={newMeal.fat}
                  onChange={(e) => setNewMeal({...newMeal, fat: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Fiber (g)</label>
                <Input 
                  type="number"
                  value={newMeal.fiber}
                  onChange={(e) => setNewMeal({...newMeal, fiber: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sugar (g)</label>
                <Input 
                  type="number"
                  value={newMeal.sugar}
                  onChange={(e) => setNewMeal({...newMeal, sugar: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sodium (mg)</label>
                <Input 
                  type="number"
                  value={newMeal.sodium}
                  onChange={(e) => setNewMeal({...newMeal, sodium: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
              <Input 
                value={newMeal.notes}
                onChange={(e) => setNewMeal({...newMeal, notes: e.target.value})}
                placeholder="Any additional notes about this meal..."
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={addMeal} className="flex-1 bg-green-600 hover:bg-green-700">
                Add Meal
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddMeal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Meals List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Today's Meals</h3>
        
        {meals.length === 0 ? (
          <Card className="text-center py-8">
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No meals logged today. Start by adding your first meal!</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {meals.map((meal) => (
              <Card key={meal.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getMealTypeColor(meal.mealType)}`}>
                        {getMealTypeIcon(meal.mealType)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{meal.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{meal.mealType}</p>
                        <p className="text-xs text-gray-500">
                          {meal.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{meal.calories} cal</div>
                      <div className="text-sm text-gray-600">
                        P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteMeal(meal.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </Button>
                  </div>
                  
                  {meal.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">{meal.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealLogger; 