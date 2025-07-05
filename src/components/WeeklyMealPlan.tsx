import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, Utensils, Apple, Beef, Fish, Leaf, 
  Carrot, Clock, Target, Activity, Sun, Moon, Star
} from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

interface DayPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface WeeklyMealPlanProps {
  dietType: 'vegetarian' | 'non_vegetarian';
  targetCalories: number;
  goal: 'weight_loss' | 'weight_gain' | 'maintenance';
}

const WeeklyMealPlan: React.FC<WeeklyMealPlanProps> = ({ dietType, targetCalories, goal }) => {
  const [selectedDay, setSelectedDay] = useState<string>('monday');
  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>([]);

  const vegetarianMeals = {
    breakfast: [
      { id: 'v1', name: 'Oatmeal with Berries & Nuts', calories: 350, protein: 12, carbs: 55, fat: 8, ingredients: ['Oats', 'Mixed Berries', 'Honey', 'Almonds', 'Cinnamon'], instructions: ['Cook oats with water', 'Top with berries, honey, and almonds'], prepTime: 5, cookTime: 10, difficulty: 'easy' as const, tags: ['breakfast', 'vegetarian', 'high-fiber'] },
      { id: 'v2', name: 'Greek Yogurt Parfait', calories: 320, protein: 18, carbs: 45, fat: 6, ingredients: ['Greek Yogurt', 'Granola', 'Honey', 'Mixed Nuts', 'Fresh Fruits'], instructions: ['Layer yogurt and granola', 'Drizzle with honey'], prepTime: 3, cookTime: 0, difficulty: 'easy' as const, tags: ['breakfast', 'vegetarian', 'protein-rich'] },
      { id: 'v3', name: 'Avocado Toast with Eggs', calories: 380, protein: 15, carbs: 42, fat: 18, ingredients: ['Whole Grain Bread', 'Avocado', 'Eggs', 'Salt', 'Pepper'], instructions: ['Toast bread', 'Mash avocado', 'Fry eggs'], prepTime: 5, cookTime: 8, difficulty: 'easy' as const, tags: ['breakfast', 'vegetarian', 'healthy-fats'] }
    ],
    lunch: [
      { id: 'v4', name: 'Quinoa Buddha Bowl', calories: 420, protein: 15, carbs: 65, fat: 12, ingredients: ['Quinoa', 'Chickpeas', 'Mixed Vegetables', 'Tahini', 'Lemon'], instructions: ['Cook quinoa', 'Assemble bowl with vegetables', 'Drizzle with tahini sauce'], prepTime: 10, cookTime: 15, difficulty: 'medium' as const, tags: ['lunch', 'vegetarian', 'protein-rich'] },
      { id: 'v5', name: 'Lentil Soup with Bread', calories: 380, protein: 18, carbs: 58, fat: 8, ingredients: ['Red Lentils', 'Onions', 'Carrots', 'Spices', 'Whole Grain Bread'], instructions: ['Sauté vegetables', 'Add lentils and cook', 'Serve with bread'], prepTime: 8, cookTime: 25, difficulty: 'medium' as const, tags: ['lunch', 'vegetarian', 'high-protein'] },
      { id: 'v6', name: 'Mediterranean Salad', calories: 360, protein: 12, carbs: 45, fat: 15, ingredients: ['Mixed Greens', 'Cucumber', 'Tomatoes', 'Olives', 'Feta Cheese'], instructions: ['Chop vegetables', 'Mix ingredients', 'Dress with olive oil'], prepTime: 10, cookTime: 0, difficulty: 'easy' as const, tags: ['lunch', 'vegetarian', 'fresh'] }
    ],
    dinner: [
      { id: 'v7', name: 'Stir-Fried Tofu with Vegetables', calories: 400, protein: 20, carbs: 45, fat: 15, ingredients: ['Tofu', 'Broccoli', 'Bell Peppers', 'Soy Sauce', 'Ginger'], instructions: ['Stir-fry tofu', 'Add vegetables', 'Season with soy sauce'], prepTime: 10, cookTime: 12, difficulty: 'medium' as const, tags: ['dinner', 'vegetarian', 'protein-rich'] },
      { id: 'v8', name: 'Vegetable Curry with Rice', calories: 380, protein: 12, carbs: 52, fat: 14, ingredients: ['Mixed Vegetables', 'Coconut Milk', 'Spices', 'Brown Rice'], instructions: ['Cook vegetables in coconut milk', 'Serve with rice'], prepTime: 15, cookTime: 20, difficulty: 'medium' as const, tags: ['dinner', 'vegetarian', 'comfort-food'] },
      { id: 'v9', name: 'Stuffed Bell Peppers', calories: 420, protein: 16, carbs: 48, fat: 18, ingredients: ['Bell Peppers', 'Quinoa', 'Black Beans', 'Cheese', 'Spices'], instructions: ['Stuff peppers with quinoa mixture', 'Bake until tender'], prepTime: 15, cookTime: 25, difficulty: 'medium' as const, tags: ['dinner', 'vegetarian', 'nutritious'] }
    ],
    snacks: [
      { id: 'v10', name: 'Apple with Peanut Butter', calories: 200, protein: 4, carbs: 25, fat: 10, ingredients: ['Apple', 'Peanut Butter'], instructions: ['Slice apple', 'Serve with peanut butter'], prepTime: 2, cookTime: 0, difficulty: 'easy' as const, tags: ['snack', 'vegetarian', 'fiber-rich'] },
      { id: 'v11', name: 'Hummus with Carrots', calories: 180, protein: 6, carbs: 22, fat: 8, ingredients: ['Hummus', 'Carrots'], instructions: ['Serve hummus with carrot sticks'], prepTime: 2, cookTime: 0, difficulty: 'easy' as const, tags: ['snack', 'vegetarian', 'protein-rich'] },
      { id: 'v12', name: 'Mixed Nuts & Dried Fruits', calories: 220, protein: 6, carbs: 18, fat: 14, ingredients: ['Almonds', 'Walnuts', 'Raisins', 'Dried Apricots'], instructions: ['Mix nuts and dried fruits'], prepTime: 1, cookTime: 0, difficulty: 'easy' as const, tags: ['snack', 'vegetarian', 'energy-boost'] }
    ]
  };

  const nonVegetarianMeals = {
    breakfast: [
      { id: 'nv1', name: 'Eggs and Whole Grain Toast', calories: 380, protein: 20, carbs: 45, fat: 12, ingredients: ['Eggs', 'Whole Grain Bread', 'Butter', 'Salt', 'Pepper'], instructions: ['Scramble eggs', 'Toast bread'], prepTime: 5, cookTime: 8, difficulty: 'easy' as const, tags: ['breakfast', 'non-vegetarian', 'protein-rich'] },
      { id: 'nv2', name: 'Chicken Oatmeal Bowl', calories: 420, protein: 25, carbs: 50, fat: 15, ingredients: ['Oats', 'Chicken Breast', 'Vegetables', 'Spices'], instructions: ['Cook oats with chicken', 'Add vegetables'], prepTime: 8, cookTime: 15, difficulty: 'medium' as const, tags: ['breakfast', 'non-vegetarian', 'high-protein'] },
      { id: 'nv3', name: 'Salmon Avocado Toast', calories: 450, protein: 22, carbs: 38, fat: 20, ingredients: ['Smoked Salmon', 'Avocado', 'Whole Grain Bread', 'Lemon'], instructions: ['Toast bread', 'Spread avocado', 'Top with salmon'], prepTime: 5, cookTime: 3, difficulty: 'easy' as const, tags: ['breakfast', 'non-vegetarian', 'omega-3'] }
    ],
    lunch: [
      { id: 'nv4', name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 25, fat: 18, ingredients: ['Chicken Breast', 'Mixed Greens', 'Olive Oil', 'Balsamic Vinegar'], instructions: ['Grill chicken', 'Assemble salad'], prepTime: 10, cookTime: 15, difficulty: 'medium' as const, tags: ['lunch', 'non-vegetarian', 'high-protein'] },
      { id: 'nv5', name: 'Fish Tacos', calories: 480, protein: 28, carbs: 45, fat: 20, ingredients: ['Fish Fillet', 'Tortillas', 'Vegetables', 'Sauce'], instructions: ['Grill fish', 'Assemble tacos'], prepTime: 12, cookTime: 10, difficulty: 'medium' as const, tags: ['lunch', 'non-vegetarian', 'healthy'] },
      { id: 'nv6', name: 'Turkey Wrap', calories: 420, protein: 25, carbs: 48, fat: 16, ingredients: ['Turkey Breast', 'Whole Grain Wrap', 'Vegetables', 'Hummus'], instructions: ['Layer ingredients', 'Roll wrap'], prepTime: 8, cookTime: 0, difficulty: 'easy' as const, tags: ['lunch', 'non-vegetarian', 'portable'] }
    ],
    dinner: [
      { id: 'nv7', name: 'Salmon with Roasted Vegetables', calories: 520, protein: 38, carbs: 35, fat: 22, ingredients: ['Salmon', 'Broccoli', 'Carrots', 'Olive Oil', 'Lemon'], instructions: ['Bake salmon', 'Roast vegetables'], prepTime: 10, cookTime: 20, difficulty: 'medium' as const, tags: ['dinner', 'non-vegetarian', 'omega-3'] },
      { id: 'nv8', name: 'Beef Stir Fry', calories: 480, protein: 32, carbs: 40, fat: 20, ingredients: ['Beef Strips', 'Vegetables', 'Soy Sauce', 'Ginger'], instructions: ['Stir-fry beef', 'Add vegetables'], prepTime: 15, cookTime: 12, difficulty: 'medium' as const, tags: ['dinner', 'non-vegetarian', 'protein-rich'] },
      { id: 'nv9', name: 'Chicken Quinoa Bowl', calories: 460, protein: 35, carbs: 42, fat: 18, ingredients: ['Chicken Breast', 'Quinoa', 'Vegetables', 'Sauce'], instructions: ['Cook quinoa', 'Grill chicken', 'Assemble bowl'], prepTime: 12, cookTime: 18, difficulty: 'medium' as const, tags: ['dinner', 'non-vegetarian', 'balanced'] }
    ],
    snacks: [
      { id: 'nv10', name: 'Greek Yogurt with Nuts', calories: 220, protein: 15, carbs: 18, fat: 12, ingredients: ['Greek Yogurt', 'Mixed Nuts'], instructions: ['Mix yogurt with nuts'], prepTime: 2, cookTime: 0, difficulty: 'easy' as const, tags: ['snack', 'non-vegetarian', 'protein-rich'] },
      { id: 'nv11', name: 'Tuna on Crackers', calories: 200, protein: 12, carbs: 20, fat: 8, ingredients: ['Tuna', 'Whole Grain Crackers'], instructions: ['Serve tuna on crackers'], prepTime: 3, cookTime: 0, difficulty: 'easy' as const, tags: ['snack', 'non-vegetarian', 'protein-rich'] },
      { id: 'nv12', name: 'Hard-Boiled Eggs', calories: 140, protein: 12, carbs: 1, fat: 10, ingredients: ['Eggs', 'Salt', 'Pepper'], instructions: ['Boil eggs', 'Season with salt and pepper'], prepTime: 2, cookTime: 10, difficulty: 'easy' as const, tags: ['snack', 'non-vegetarian', 'protein-rich'] }
    ]
  };

  const generateWeeklyPlan = () => {
    const meals = dietType === 'vegetarian' ? vegetarianMeals : nonVegetarianMeals;
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    const plan = days.map((day, index) => {
      const breakfast = meals.breakfast[index % meals.breakfast.length];
      const lunch = meals.lunch[index % meals.lunch.length];
      const dinner = meals.dinner[index % meals.dinner.length];
      const snacks = [meals.snacks[index % meals.snacks.length]];
      
      const totalCalories = breakfast.calories + lunch.calories + dinner.calories + snacks.reduce((sum, snack) => sum + snack.calories, 0);
      const totalProtein = breakfast.protein + lunch.protein + dinner.protein + snacks.reduce((sum, snack) => sum + snack.protein, 0);
      const totalCarbs = breakfast.carbs + lunch.carbs + dinner.carbs + snacks.reduce((sum, snack) => sum + snack.carbs, 0);
      const totalFat = breakfast.fat + lunch.fat + dinner.fat + snacks.reduce((sum, snack) => sum + snack.fat, 0);

      return {
        day,
        breakfast,
        lunch,
        dinner,
        snacks,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat
      };
    });
    
    setWeeklyPlan(plan);
  };

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return <Sun className="w-4 h-4" />;
      case 'lunch': return <Utensils className="w-4 h-4" />;
      case 'dinner': return <Moon className="w-4 h-4" />;
      case 'snack': return <Star className="w-4 h-4" />;
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

  return (
    <div className="space-y-6">
      {/* Generate Plan Button */}
      <div className="flex justify-center">
        <Button 
          onClick={generateWeeklyPlan}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Generate Weekly Meal Plan
        </Button>
      </div>

      {/* Weekly Plan Display */}
      {weeklyPlan.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 text-center">Your Weekly Meal Plan</h3>
          
          {/* Day Selector */}
          <div className="flex flex-wrap gap-2 bg-white/60 backdrop-blur-sm rounded-2xl p-2">
            {weeklyPlan.map((dayPlan) => (
              <button
                key={dayPlan.day}
                onClick={() => setSelectedDay(dayPlan.day)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                  selectedDay === dayPlan.day
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="capitalize">{dayPlan.day}</span>
              </button>
            ))}
          </div>

          {/* Selected Day Plan */}
          {weeklyPlan.find(plan => plan.day === selectedDay) && (
            <div className="grid lg:grid-cols-2 gap-6">
              {(() => {
                const dayPlan = weeklyPlan.find(plan => plan.day === selectedDay)!;
                return (
                  <>
                    {/* Meals */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-gray-800 capitalize">{selectedDay} Meals</h4>
                      
                      {/* Breakfast */}
                      <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center text-lg">
                            <Sun className="w-5 h-5 mr-2 text-yellow-600" />
                            Breakfast
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <h5 className="font-semibold text-gray-800">{dayPlan.breakfast.name}</h5>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>{dayPlan.breakfast.calories} calories</span>
                              <span>{dayPlan.breakfast.protein}g protein</span>
                              <span>{dayPlan.breakfast.carbs}g carbs</span>
                              <span>{dayPlan.breakfast.fat}g fat</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p className="font-medium mb-1">Ingredients:</p>
                              <p>{dayPlan.breakfast.ingredients.join(', ')}</p>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p className="font-medium mb-1">Instructions:</p>
                              <ol className="list-decimal list-inside space-y-1">
                                {dayPlan.breakfast.instructions.map((instruction, index) => (
                                  <li key={index}>{instruction}</li>
                                ))}
                              </ol>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Prep: {dayPlan.breakfast.prepTime}min</span>
                              <span>Cook: {dayPlan.breakfast.cookTime}min</span>
                              <span className="capitalize">{dayPlan.breakfast.difficulty}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Lunch */}
                      <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center text-lg">
                            <Utensils className="w-5 h-5 mr-2 text-green-600" />
                            Lunch
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <h5 className="font-semibold text-gray-800">{dayPlan.lunch.name}</h5>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>{dayPlan.lunch.calories} calories</span>
                              <span>{dayPlan.lunch.protein}g protein</span>
                              <span>{dayPlan.lunch.carbs}g carbs</span>
                              <span>{dayPlan.lunch.fat}g fat</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p className="font-medium mb-1">Ingredients:</p>
                              <p>{dayPlan.lunch.ingredients.join(', ')}</p>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p className="font-medium mb-1">Instructions:</p>
                              <ol className="list-decimal list-inside space-y-1">
                                {dayPlan.lunch.instructions.map((instruction, index) => (
                                  <li key={index}>{instruction}</li>
                                ))}
                              </ol>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Prep: {dayPlan.lunch.prepTime}min</span>
                              <span>Cook: {dayPlan.lunch.cookTime}min</span>
                              <span className="capitalize">{dayPlan.lunch.difficulty}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Dinner */}
                      <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center text-lg">
                            <Moon className="w-5 h-5 mr-2 text-blue-600" />
                            Dinner
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <h5 className="font-semibold text-gray-800">{dayPlan.dinner.name}</h5>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>{dayPlan.dinner.calories} calories</span>
                              <span>{dayPlan.dinner.protein}g protein</span>
                              <span>{dayPlan.dinner.carbs}g carbs</span>
                              <span>{dayPlan.dinner.fat}g fat</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p className="font-medium mb-1">Ingredients:</p>
                              <p>{dayPlan.dinner.ingredients.join(', ')}</p>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p className="font-medium mb-1">Instructions:</p>
                              <ol className="list-decimal list-inside space-y-1">
                                {dayPlan.dinner.instructions.map((instruction, index) => (
                                  <li key={index}>{instruction}</li>
                                ))}
                              </ol>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Prep: {dayPlan.dinner.prepTime}min</span>
                              <span>Cook: {dayPlan.dinner.cookTime}min</span>
                              <span className="capitalize">{dayPlan.dinner.difficulty}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Snacks */}
                      {dayPlan.snacks.map((snack, index) => (
                        <Card key={snack.id} className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-lg">
                              <Star className="w-5 h-5 mr-2 text-purple-600" />
                              Snack {index + 1}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <h5 className="font-semibold text-gray-800">{snack.name}</h5>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>{snack.calories} calories</span>
                                <span>{snack.protein}g protein</span>
                                <span>{snack.carbs}g carbs</span>
                                <span>{snack.fat}g fat</span>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p className="font-medium mb-1">Ingredients:</p>
                                <p>{snack.ingredients.join(', ')}</p>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p className="font-medium mb-1">Instructions:</p>
                                <ol className="list-decimal list-inside space-y-1">
                                  {snack.instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                  ))}
                                </ol>
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Prep: {snack.prepTime}min</span>
                                <span>Cook: {snack.cookTime}min</span>
                                <span className="capitalize">{snack.difficulty}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Daily Summary */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-gray-800">Daily Summary</h4>
                      
                      <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-800">Total Calories:</span>
                              <span className="text-2xl font-bold text-pink-600">{dayPlan.totalCalories}</span>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-600">{dayPlan.totalProtein}g</div>
                                <div className="text-sm text-gray-600">Protein</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">{dayPlan.totalCarbs}g</div>
                                <div className="text-sm text-gray-600">Carbs</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-yellow-600">{dayPlan.totalFat}g</div>
                                <div className="text-sm text-gray-600">Fat</div>
                              </div>
                            </div>
                            
                            <div className="mt-4 p-4 bg-white/50 rounded-lg">
                              <h5 className="font-semibold text-gray-800 mb-2">Nutrition Tips:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Stay hydrated with 8-10 glasses of water daily</li>
                                <li>• Include fiber-rich foods for better digestion</li>
                                <li>• Don't skip meals to maintain energy levels</li>
                                <li>• Listen to your body's hunger cues</li>
                                <li>• {goal === 'weight_loss' ? 'Focus on protein and fiber for satiety' : goal === 'weight_gain' ? 'Include healthy fats and complex carbs' : 'Maintain a balanced approach to nutrition'}</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeeklyMealPlan; 