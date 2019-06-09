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

def get_div_names(html):
    divs = html.find_all(['h1','div','span'], {'data-test-id': re.compile(r'recipeDetail*')})
    divs += html.find_all(['h1','div','span'], {'data-translation-id': re.compile(r'recipe-detail*')})
    return divs




def start_crawling():
    parsed_html = loop_through_files()
    return get_div_names(parsed_html)

x = start_crawling()
for r in x:
    if r.get('data-test-id'):
        print(r.get('data-test-id'))
    elif r.get('data-translation-id'):
        print(r.get('data-translation-id'))

