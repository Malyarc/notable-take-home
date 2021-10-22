![Image of Snackpass](https://www.snackpass.co/static/media/logo_round_2.d74f1dd2.png)

# 🥞 Snackpass Full Stack Code Challenge

Welcome to the Snackpass Challenge. We really appreciate you taking the time time to participate 🙏

## 🧩 The Challenge

Assume the customers around a campus order 5000 orders a day from 50 local restaurants. Each order contains one or multiple products where each product is a food item from that restaurant's menu. For example, one order could be summarized as: `2 burritos, a soda, and a side of chips`.

To complete this challenge, please build a functional website with frontend & backend code that achieves the following:

1. Displays a webpage with an infinite-scrolling list of "trending" products
   - A product is "trending" if it has been purchased at least once in the last 48 hours
   - Each item in the list should be visibly tagged with two attributes:
     * a recent purchase tag, ie: `5 purchased recently`
     * a time tag, ie: `ordered 3 min ago`
2. The trending products list should be sorted by a heuristic based on at least purchase recency & the number of recent purchases.
   - There is no "right" answer here; we'd like to see your reasoning for any heuristic you choose!

## 🏌️ Getting Started

> Note: If you would like to choose your own language, framework and database, you are most welcome to not use provided scaffolding, database and data import.

In order for you to give headstart, be respectful of your time and get a valuable `signal` from this challenge, we will be providing the following

1. Server Scaffolding
   1. Saves ton of time by providing `basic server scaffolding`, `data model`and`import script` to import sample orders.
   2. Gives you a clean slate client project for you to choose any technology.
2. UI Mocks
   1. Please seek to fit your UI as close as possible to the provided mocks: [Code Challenge Mocks](https://www.figma.com/file/kYoGXQa5CNkCALUmRfB79B/Snackpass-Full-Stack-Code-Challenge?node-id=1%3A21)

> Note: These mocks include some UI elements beyond the 3 requirements outlined above. Consider these good stretch goals to reach for as time allows!

### 🎼 Docker Compose

This repo is constructed as a yarn workspace monorepo containing both client and server projects. We have also provided MongoDB for your use via a `docker-compose.yaml` file. Using Docker is option, but encouraged.

### `./server` - Nest Architecture

This scaffolding has been developed following a very simple nestjs framework. If you are new to nestjs, there is plenty of docs at [nestjs docs](https://docs.nestjs.com/)

### `./client` - Clean-Sheet

The `./client` directory is a blank slate for you to build the frontend as-you-wish. If you create Dockerfile and package.json, it would be very easy to integrate into `docker-compose.yaml`

### 🏗 Installation

You should have these prerequisites installed:

- `node` 14.x
- `yarn`
- Docker

To spin up the stack, this is all you need to do…

```shell
$ yarn up
…logspew…
^C to shut down
```

You can explore the other `yarn` script options with…

```shell
$ yarn run
$ yarn server run
$ yarn client run
```

If you prefer to not use the Docker dev containers for client and/or server, you can start only the DBs like this…

```shell
$ yarn start mongo-db   # start up MongoDB via Docker
```

### Postman Collection
To verify that the service is up and running, you could use [this postman collection](https://drive.google.com/file/d/1nh-Mdu9drJjq-rBOEkxw4A99WAjJccle/view?usp=sharing)
> Note: Use `http://localhost:5000/` as environment variable for {{LocalURL}}

### Data Import
Now that you verified that you have installed and verified services, you could import sample data. Please run the following command in the server container. 
```shell
[Wed Oct 20 05:54:34 shri ~]$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                                           NAMES
7f54065e7474   27020fdd61ab   "docker-entrypoint.s…"   16 minutes ago   Up 16 minutes   0.0.0.0:5000->5000/tcp, :::5000->5000/tcp       take_home_challenge_contractors_server_1
2fed4dff57ac   0a2f1fdf242c   "docker-entrypoint.s…"   16 minutes ago   Up 16 minutes   0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   take_home_challenge_contractors_mongo-db_1
[Wed Oct 20 05:54:36 shri ~]$ docker exec -it 7f54065e7474 bash
root@7f54065e7474:/src# NODE_PATH=./ npx ts-node --project tsconfig.build.json --transpile-only -r tsconfig-paths/register src/scripts/seed.ts
Running Init DB!
Hang tight! This will take a few mins to complete...
Init DB Successful. Processed orders count:  25584
root@7f54065e7474:/src#
```

This concludes our setup. Alternatively, if you prefer not to use docker, you could build all of these locally. 

Happy Hacking 🙌

## ✅ Submission Checklist

1. [ ] Implement a trending algorithm, it's api and associated code.
2. [ ] Implement a client app with infinite scrolling support.
3. [ ] Provide a written description of your submission; see [Solution](#Solution) below.
4. [ ] If you have stretch goals but don't have time, please include an explanation.
5. [ ] Please submit within 72 hours from the time you accept invitation. (If circumstances don't allow for this, please let us know early!).
6. [ ] **Please create an issue and tag @BiancaVGreen, @ChanlMckee, @shrimuthu, and @nprbst when you are ready to submit**

## 📖 Practices

### ⌨️ Quality of code

Please use best practices for writing code and publish to this repo. We want to see how you _really_ code when shipping to production - please use good formatting, in-code documentation, and performant code patterns as much as possible.

### ❓Q & A

If you have any questions, please do not hesitate to chat with us. Just create an issue and tag @shrimuthu, @aduca98, @nprbst or @seankwalker. 


## 🗣 Feedback

This challenge project scaffolding is brand-new as of Oct 2021. We would really appreciate any reactions and feedback you’d like to share to help us make it an even better experience! Please, if you have any question or comment, open an issue in your repo and share your thoughts with our team.

## ✨ Solution

_Your solution content goes here..._

We would love to hear about how you solved the problem. You can be as verbose as you like!
