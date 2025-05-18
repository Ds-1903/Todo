import app from './app.js';
import cron from 'node-cron';
import { connectDB } from './config/dbConnection.js';
import { statusUpdateCron } from './job/statusUpdateCron.js'; 


const PORT = process.env.PORT || 5000;

// Connect to MongoDB
await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Schedule the cron job to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily status update cron...');
  await statusUpdateCron();
});


process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason: any, promise) => {
  console.error('Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  process.exit(1);
});