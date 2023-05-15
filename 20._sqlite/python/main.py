import sqlite3

# Connect to database
conneciton = sqlite3.connect('database.db')

cursor = conneciton.cursor()

res = cursor.execute('SELECT title FROM movies')
print(res.fetchall())