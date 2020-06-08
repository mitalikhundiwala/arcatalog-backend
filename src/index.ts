import { initializeApp } from './app';

const app = initializeApp();

app.listen({ port: process.env.PORT || 4000 }).then((deets) => {
    console.log(`Server is now running on port
  http:/localhost:${deets.port}`);
    console.log('url', deets.url);
});
