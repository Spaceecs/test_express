import 'dotenv/config';
import express from 'express';
import uploadRoutes from './routes/upload';
import chatRoutes from './routes/chat';


const app = express();

app.use(express.json());

app.use('/upload', uploadRoutes);
app.use('/chat', chatRoutes);

app.listen(4000, () => {
  console.log('Server started on :4000');
});
