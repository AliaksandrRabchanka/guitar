# Backend part

##create mongoDB
1. download Robo 3t from [here](https://robomongo.org/download), install, launch
2. `docker-compose up mongo-guitar`in cmd from root folder
3. connect to mongo database by Robo 3T
4. create default connection without any data (default DB/ `MONGO_INITDB_ROOT_USERNAME` from .env file/ `MONGO_INITDB_ROOT_PASSWORD` from .env file)
5. save
6. connect
7. create new database named `MONGO_INITDB_DATABASE` from .env file
8. go to "Users" folder and create new user (use credentials from .env file form `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` lines) and choose next options:
  - read;
  - readWrite;
  - dbAdmin;