import webRoutes from './routes/web/index.js';
import apiRoutes from './routes/api/index.js';
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const PORT = 5000;

// ==================== WEB Routes ====================
app.use('/', webRoutes);
// ==================== API Routes ====================
app.use('/api', apiRoutes);

process.on("SIGINT", async () => {
  console.log("\nShutting down server...");
  await mongoose.connection.close();
  console.log("MongoDB disconnected");
  process.exit(0);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

