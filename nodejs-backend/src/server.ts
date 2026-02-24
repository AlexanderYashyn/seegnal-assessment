import 'dotenv/config';
import { createApp } from './app';
import { initDbSchema } from './database/schema';

const PORT = process.env.PORT;

initDbSchema();

const app = createApp();
app.listen(Number(PORT), () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Server Swagger UI at http://localhost:${PORT}/swagger`);
});
