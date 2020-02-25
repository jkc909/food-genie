from engine_session import create_session

from sqlalchemy.ext.declarative import declarative_base
from py_db.ingredients import Ingredients

import datetime

# db connection

session = create_session().return_session()

time = str(datetime.datetime.now())


insert = (f"INSERT INTO recipes (title, user_id, created_at, updated_at, prep_category_id) VALUES ('hello', 1, '{time}', '{time}', 1);")

# session.execute(insert)

result = session.execute(f"SELECT * FROM recipes;")
for r in result:
    print(r)
    print("")

