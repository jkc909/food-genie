import os
import re
import unicodedata
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup

class ScraperHf:
    def __init__(self):
        self.cwd = (os.getcwd()+'/dev_subjects/hf_recipes')

    def start_crawling(self):
        self.recipes = []
        for filename in os.listdir(self.cwd):
            print(f"scrape {filename}")
            if filename.endswith('.html'):
                with open((self.cwd+'/'+filename), 'r') as raw_html:
                    html = self.get_parsed_html(raw_html)
                    ingredients = self.get_ingredients(html)
                    ingredients_not_included = self.get_ingredients_not_included(html)
                    name = self.get_recipe_name(html)
                    prep_time = self.get_prep_time(html)
                    nutrition = self.get_nutrition(html)
                    self.recipes += [{"name": name, "prep_time": prep_time, "ingredients": ingredients, "ingredients_not_included": ingredients_not_included, "nutrition": nutrition}]
        return self.recipes

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
        ingredients = html.find('div', {"data-test-id": "recipeDetailFragment.ingredients"}).find_all("div", recursive=False)[3]["class"]
        ingredients = html.find('div', { 'class': ingredients}).find_all("div")[0]
        for i in ingredients:
            name = i.find_all("div")[-1].find_all("p")[1].text
            amount = i.find_all("div")[-1].find_all("p")[0].text
            try:
                replace = amount.split()[0]
                amount = amount.replace(replace, str(unicodedata.numeric(replace)))
            except:
                pass
            ingredient_payload += [{"name": name, "amount": amount}]
        return ingredient_payload

    def get_ingredients_not_included(self, html):
        ingredient_payload = []
        ingredients = html.find('span', {"data-translation-id": "recipe-detail.ingredients.not-included"}).parent.parent.find("div").find("div").find_all("div", recursive=False)
        for i in ingredients:
            name = i.find_all("p")[1].text
            amount = i.find_all("p")[0].text
            try:
                replace = amount.split()[0]
                amount = amount.replace(replace, str(unicodedata.numeric(replace)))
            except:
                pass
            ingredient_payload += [{"name": name, "amount": amount}]
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
for r in recipe_payload:
    print(r)
    print("--------")



