import os
import re

from bs4 import BeautifulSoup

class ScraperHf:
    def __init__(self):
        self.cwd = (os.getcwd()+'/dev_subjects/hf_recipes')

    def start_crawling(self):
        html = self.loop_through_files()
        ingredients = self.get_ingredients(html)
        ingredients_not_included = self.get_ingredients_not_included(html)
        name = self.get_recipe_name(html)
        prep_time = self.get_prep_time(html)
        nutrition = self.get_nutrition(html)
        return {"name": name, "prep_time": prep_time, "ingredients": ingredients, "ingredients_not_included": ingredients_not_included, "nutrition": nutrition}

    def loop_through_files(self):
        for filename in os.listdir(self.cwd):
            if filename.endswith('.htm'):
                with open((self.cwd+'/'+filename), 'r') as raw_html:
                    parsed_html = self.get_parsed_html(raw_html)
                    return parsed_html

    def get_parsed_html(self, raw_html):
        return BeautifulSoup(raw_html, "lxml")

    def get_ingredients(self, html):
        ingredient_payload = []
        ingredients = html.find('div', {"class": "fela-71c2kl"}).find("div")
        for i in ingredients:
            img = i.find("img")
            name = img["alt"]
            src = img["src"]
            amount = i.find("div", {"class": "fela-1qz307e"}).find("p").text
            ingredient_payload += [{"name": name, "src": src, "amount": amount}]
        return ingredient_payload

    def get_ingredients_not_included(self, html):
        ingredient_payload = []
        ingredients = html.find('div', {"class": "fela-18bp2md"}).find("div")
        for i in ingredients:
            img = i.find("img")
            name = img["alt"]
            src = img["src"]
            amount = i.find("div", {"class": "fela-1qz307e"}).find("p").text
            ingredient_payload += [{"name": name, "src": src, "amount": amount}]
        return ingredient_payload

    def get_recipe_name(self, html):
        name = html.find('h1', {'data-test-id': 'recipeDetailFragment.recipe-name'}).text
        return name

    def get_prep_time(self, html):
        prep_time = html.find('div', {'class': 'fela-19qpnoj'}).find_all('span')
        prep_time = prep_time[2].text
        return prep_time

    def get_nutrition(self, html):
        nutrition_payload = []
        nutrition_tags = html.find('div', {'data-test-id':'recipeDetailFragment.nutrition-values'})
        calories = nutrition_tags.find('span', text=re.compile(r'. kcal')).text
        carbs = nutrition_tags.find("span", text="Carbohydrate").parent.text.replace("Carbohydrate", "")
        fat = nutrition_tags.find("span", text="Fat").parent.text.replace("Fat", "")
        protein = nutrition_tags.find("span", text="Protein").parent.text.replace("Protein", "")
        nutrition_payload += [{"calories": calories, "carbs": carbs, "fat": fat, "protein": protein}]
        return nutrition_payload

recipe_payload = ScraperHf().start_crawling()
print(recipe_payload)