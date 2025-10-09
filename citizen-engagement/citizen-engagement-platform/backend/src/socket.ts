import { Server, Socket } from 'socket.io';
import { saveMessage } from './controllers/chatControllers';

export const initSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('New connection:', socket.id);

    socket.on('join_room', (room: string) => {
      socket.join(room);
    });

    socket.on('send_message', async (data: { sender: string; content: string; room: string }) => {
      const saved = await saveMessage(data.sender, data.content, data.room);
      io.to(data.room).emit('receive_message', saved);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);
    });
  });
};