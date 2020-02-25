class GroceryController < ApiController
    def show
        week_recipes = Week.find(params[:id]).meals.where.not(meal_type_id: 1).pluck(:recipe_id)
        week_ingredients = Hash.new(0)
        ingredient_list = []
        week_recipes.each do | r |
            rec = Recipe.joins(:ingredients).where("recipes.id = #{r}").pluck('ingredients.id,ingredients.unit,recipe_ingredients.amount')
            ingredient_list << rec
        end
        ingredient_list.each { |r| r.each { |i| week_ingredients[i[0]] += i[2].to_f } } 
        @totals = []
        week_ingredients.each { |i| 
            ingredient = Ingredient.find(i[0])
            checked = Grocery.where(week_id: params[:id], ingredient_id: ingredient.id).first
            if !checked.nil?
                box_checked=checked.checked
            else
                box_checked=false
            end
            p checked
            ingredient.unit = '' if ingredient.unit == 'unit'
            (i[1] = "-") if i[1] == 0
            @totals << { :name => ingredient.name, :amount => i[1], :unit => ingredient.unit, ingredient_id: ingredient.id, checked: box_checked }
        }
        render json: @totals
    end

    def update
        grocery_update = Grocery.where(ingredient_id: grocery[:ingredient_id], week_id: grocery[:week_id]).first_or_create
        grocery_update.update(checked: grocery[:checked])
        render status: 200, json: {}
    end

    private
    def grocery
      params.require(:grocery)
    end
end