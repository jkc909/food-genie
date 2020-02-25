from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship
from dbBase import Base

class Ingredients(Base):
    __tablename__ = 'ingredients'
    id = Column(Integer, primary_key=True)
    #recipe_ingredients = relationship("Recipe", secondary=recipe_ingredients)