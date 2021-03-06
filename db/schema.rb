# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_13_014212) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "daily_totals", force: :cascade do |t|
    t.bigint "week_id"
    t.bigint "day_id"
    t.integer "calories"
    t.integer "fat"
    t.integer "carbs"
    t.integer "protein"
    t.integer "cost"
    t.integer "time"
    t.index ["day_id"], name: "index_daily_totals_on_day_id"
    t.index ["week_id"], name: "index_daily_totals_on_week_id"
  end

  create_table "days", force: :cascade do |t|
    t.string "name"
  end

  create_table "groceries", force: :cascade do |t|
    t.bigint "week_id"
    t.bigint "ingredient_id"
    t.boolean "checked", default: false, null: false
    t.index ["ingredient_id"], name: "index_groceries_on_ingredient_id"
    t.index ["week_id"], name: "index_groceries_on_week_id"
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.string "unit"
  end

  create_table "meal_types", force: :cascade do |t|
    t.bigint "day_id", null: false
    t.integer "meal_time", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["day_id"], name: "index_meal_types_on_day_id"
  end

  create_table "meals", force: :cascade do |t|
    t.bigint "week_id", null: false
    t.bigint "recipe_id"
    t.bigint "meal_type_id"
    t.bigint "prep_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meal_type_id"], name: "index_meals_on_meal_type_id"
    t.index ["prep_category_id"], name: "index_meals_on_prep_category_id"
    t.index ["recipe_id"], name: "index_meals_on_recipe_id"
    t.index ["week_id"], name: "index_meals_on_week_id"
  end

  create_table "prep_categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_ingredients", force: :cascade do |t|
    t.bigint "recipe_id"
    t.bigint "ingredient_id"
    t.string "amount"
    t.index ["ingredient_id"], name: "index_recipe_ingredients_on_ingredient_id"
    t.index ["recipe_id"], name: "index_recipe_ingredients_on_recipe_id"
  end

  create_table "recipe_nutrition_values", force: :cascade do |t|
    t.bigint "recipe_id"
    t.integer "energy"
    t.integer "calories"
    t.integer "fat"
    t.integer "carbs"
    t.integer "protein"
    t.index ["recipe_id"], name: "index_recipe_nutrition_values_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title", null: false
    t.string "parsed_name"
    t.text "description"
    t.string "image_url"
    t.float "servings"
    t.integer "cook_time"
    t.string "image"
    t.decimal "rating"
    t.integer "ratings"
    t.integer "cost", default: 0
    t.index ["user_id"], name: "index_recipes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weeks", force: :cascade do |t|
    t.date "week_of"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_weeks_on_user_id"
  end

end
