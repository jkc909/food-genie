from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class create_session():
	def __init__(self):
		self.Engine = create_engine("postgres://joe@localhost/food-genie_development")
		self.Sessionmaker = sessionmaker(bind=self.Engine)

	def return_session(self):
		session = self.Sessionmaker()
		return session