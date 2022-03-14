# Books API
This repo contains code for following operations

- Add a book to the library: POST /books
- Update book details(only those fields that have been changed): PATCH /books/{bookUuid}
- Delete a book from the library: DELETE /books/{bookUuid}
- Get all books(in a Paginated Manner): GET /books
- Get book details: GET /books/{bookUuid}
- Soft Delete all books: DELETE /books (via Admin token)


## Tech Stack
- [MongoDB]
- [node.js]
- [Express]

## Installation

This requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm start
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [MongoDB]: <http://www.mongodb.com>
   [node.js]: <http://nodejs.org>
