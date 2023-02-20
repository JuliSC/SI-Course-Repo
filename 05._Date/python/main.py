from datetime import datetime
now = datetime.now()

# print current date
print(now)

formattedDate = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
print(formattedDate)