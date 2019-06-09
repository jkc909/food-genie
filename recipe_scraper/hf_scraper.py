import os
import re

from bs4 import BeautifulSoup

from sqlalchemy import create_engine

# db connection
db_string = "postgres://joe@localhost/food-genie_development"

engine = create_engine(db_string)

result = engine.execute("SELECT * FROM RECIPES;")
for r in result:
    print(r)

# init stuff
cwd = (os.getcwd()+'/recipe_scraper/dev_subjects/hf_recipes')

def get_parsed_html(raw_html):
    return BeautifulSoup(raw_html)

def loop_through_files():
    for filename in os.listdir(cwd):
        if filename.endswith('.htm'):
            with open((cwd+'/'+filename), 'r') as raw_html:
                parsed_html = get_parsed_html(raw_html)
                return parsed_html

def get_ingredients(html):
    ingredient_payload = []
    ingredients = html.find('div', {"class": "fela-71c2kl"}).find("div")
    for i in ingredients:
        img = i.find("img")
        name = img["alt"]
        src = img["src"]
        amount = i.find("div", {"class": "fela-1qz307e"}).find("p").text
        ingredient_payload += [{"name": name, "src": src, "amount": amount}]
    return ingredient_payload

def get_ingredients_not_included(html):
    ingredient_payload = []
    ingredients = html.find('div', {"class": "fela-18bp2md"}).find("div")
    for i in ingredients:
        img = i.find("img")
        name = img["alt"]
        src = img["src"]
        amount = i.find("div", {"class": "fela-1qz307e"}).find("p").text
        ingredient_payload += [{"name": name, "src": src, "amount": amount}]
    return ingredient_payload



def get_recipe_name(html):
    name = html.find('h1', {'data-test-id': 'recipeDetailFragment.recipe-name'}).text
    return name

def get_prep_time(html):
    prep_time = html.find('div', {'class': 'fela-19qpnoj'}).find_all('span')
    prep_time = prep_time[2].text
    return prep_time

def get_nutrition(html):
    nutrition_payload = []
    nutrition_tags = html.find('div', {'data-test-id':'recipeDetailFragment.nutrition-values'})
    calories = nutrition_tags.find('span', text=re.compile(r'. kcal')).text
    carbs = nutrition_tags.find("span", text="Carbohydrate").parent.text.replace("Carbohydrate", "")
    fat = nutrition_tags.find("span", text="Fat").parent.text.replace("Fat", "")
    protein = nutrition_tags.find("span", text="Protein").parent.text.replace("Protein", "")
    nutrition_payload += [{"calories": calories, "carbs": carbs, "fat": fat, "protein": protein}]
    return nutrition_payload



def start_crawling():
    html = loop_through_files()
    ingredients = get_ingredients(html)
    ingredients_not_included = get_ingredients_not_included(html)
    name = get_recipe_name(html)
    prep_time = get_prep_time(html)
    nutrition = get_nutrition(html)
    return {"name": name, "prep_time": prep_time, "ingredients": ingredients, "ingredients_not_included": ingredients_not_included, "nutrition": nutrition}





x = start_crawling()
print(x)