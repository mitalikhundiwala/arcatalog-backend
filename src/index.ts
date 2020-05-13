import { initializeApp } from './app';

const app = initializeApp();

app.listen().then((deets) => {
    console.log(`Server is now running on port
  http:/localhost:${deets.port}`);
});
