![Image of Snackpass](https://www.snackpass.co/static/media/logo_round_2.d74f1dd2.png)

# 🥞 Snackpass Full Stack Code Challenge

## Project setup
```
1. npm install
```

### Create Dummy Data for MongoDB (note must have mongodb installed locally)
```
2. npm run seed
```

### After install and seeding,
```
3. npm run react-dev
4. npm start
```
### Notes:
```
This is my approach to the SnackPass coding challenge. This was built under the MERN stack and bundled together using webpack. To solve the challenge, I created everything from scratch. Starting from building a schema for the trendings_list and then making a seed file to generate all the dummy data. Afterwards, I continued with the backend and created my server. In order to display a webpage with infinite trending products, I had to first aggregate the trending_list data into a composite form. So a new table in which has each food from every restaurant with their total quantity bought. To directly answer which heuristic sort would be the best, I decided to give the user the option to view BOTH. So once I aggregated the trending_list data into composite form, I then reformatted to an sorted array, sorting from number of Recency and number of Quantiies. Then finally, I continued with the front end and created a trendinglist component where it is a simple table to display each item. By default it is set to display a sort based off Quantity (this default was due to my preference as consumer). There also lies a button that allows the user to toggle to see the recency of Orders.
```

