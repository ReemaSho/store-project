## Store Project

It is a backend application. connected to mongoDB atlas.

this application has one get request function, and it returns products collection from database.

## featured

#### Queries:

- [x] user can search for products by name , company name and if it is featured or not.

- [x] user can sort items by name or/and price.

- [x] user can filter price and rating by numerical filters: ( >,>=,=,<,<=).

- [x] The frontend can choose which properties/fields to get from thr product object.

## Project Set up

- Run **npm install**

- In order to run the project, setup **.env** and set _MONGO_URI_variable equal to_DB_ connection string.

- In order to add data dynamically from product.js file to your mongoDB atlas, run **node populate**

- In order to avoid port collisions, In the source code port value is 3000.
