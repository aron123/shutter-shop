#!/bin/bash

# For presenting assignment in webtech2 course.

MONGO_HOST_IP=127.0.0.1
MONGO_PORT=27017
DATABASE_NAME=shutterShop

docker run --detach -p $MONGO_PORT:$MONGO_PORT mongo

chmod +r *.json

mongoimport --host $MONGO_HOST_IP --db $DATABASE_NAME --collection employees employees.json
mongoimport --host $MONGO_HOST_IP --db $DATABASE_NAME --collection customers customers.json
mongoimport --host $MONGO_HOST_IP --db $DATABASE_NAME --collection shutters shutters.json
mongoimport --host $MONGO_HOST_IP --db $DATABASE_NAME --collection orders orders.json

mongo --host $MONGO_HOST_IP
