import csv
import pymongo as pm
import time
import calendar

client = pm.MongoClient("localhost")
db = client.atf
db.drop_collection('evolution')

with open("evolution_joined.csv", "r") as file:
    reader = csv.reader(file)
    time_pattern = '%Y-%m-%d'
    index = 0
    keys = []
    for row in reader:
        if index == 0:
            keys = row
            index += 1
            continue

        data = {}
        for i in range(0, len(keys)):
            if (i == 0):
                print row[i]
                rdate = int(calendar.timegm(time.strptime(row[i], time_pattern)))
                data[keys[i]] = rdate
            else:
                data[keys[i]] = row[i]
        db.evolution.insert(data)



