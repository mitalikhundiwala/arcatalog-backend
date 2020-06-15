import { initializeApp } from './app';

const app = initializeApp();

console.log(process.env.NODE_ENV);

app.listen({ port: process.env.PORT || 4000 }).then((deets) => {
    console.log(`Server is now running on port
  http:/localhost:${deets.port}`);
});
