class WeeksController < ApiController

    def show
      @user = User.find(params[:user_id])
      week_of = self.current_or_date(params[:id])
      @week = @user.weeks.where(week_of: week_of).first_or_create do |w|
        w.save
        self.create_new_week(w)
      end
      render json: @week, serializer: SimpleWeekSerializer
    end

    def self.user_recipe(week)
      render json: week, serializer: SimpleWeekSerializer
    end

    def update
      update_daily_totals(week_params[:update_totals])
      Week.find(params[:id]).meals.where(meal_type_id: week_params[:meal_type_id]).first.try(:update_attributes, {meal_type_id: 1})
      Meal.find(week_params[:meal_id]).update!(meal_type_id: week_params[:meal_type_id])
      render status: 200, json: {}
    end

    def create_new_week(week)
      i = 1
      until i == 22
          Meal.create!(
            week: week, 
            recipe: Recipe.offset(rand(Recipe.count)).first, 
            meal_type: MealType.first,
            prep_category: PrepCategory.offset(rand(PrepCategory.count)).first) 
        i += 1
      end
      Day.where("name != 'unused'").all.each do |day|
        DailyTotal.create!(week: week, day: day, calories: 0, fat: 0, carbs: 0, protein: 0, time: 0, cost: 0)
      end
      @new_week
    end

    def current_or_date(week_request)
      if week_request == "0"
        self.class.current_week
      else
        week_request.split("").insert(2,"-").insert(5,"-").join("").to_date
      end
    end

    def self.current_week
      Time.now.beginning_of_week
    end

    def update_daily_totals(totals)
      totals.each do |t|
        if t != ""
          DailyTotal.find(t[:id]).update!(
            calories: t[:calories],
            fat: t[:fat],
            protein: t[:protein],
            carbs: t[:carbs],
            time: t[:time],
            cost: t[:cost],
          )
        end
      end
    end

    private
    def week_params
      params.require(:recipes)
    end
end