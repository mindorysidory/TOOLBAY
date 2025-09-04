import { Server } from 'socket.io';
import { logger } from './logger';

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    // Handle joining tool-specific rooms for real-time updates
    socket.on('join_tool', (toolId: string) => {
      if (!toolId || typeof toolId !== 'string') {
        socket.emit('error', { message: 'Invalid tool ID' });
        return;
      }
      
      socket.join(`tool_${toolId}`);
      logger.debug(`Socket ${socket.id} joined tool room: ${toolId}`);
      
      socket.emit('joined_tool', { toolId });
    });

    // Handle leaving tool-specific rooms
    socket.on('leave_tool', (toolId: string) => {
      if (!toolId || typeof toolId !== 'string') {
        socket.emit('error', { message: 'Invalid tool ID' });
        return;
      }
      
      socket.leave(`tool_${toolId}`);
      logger.debug(`Socket ${socket.id} left tool room: ${toolId}`);
      
      socket.emit('left_tool', { toolId });
    });

    // Handle real-time opinion updates
    socket.on('opinion_typing', (data: { toolId: string; username: string }) => {
      if (!data.toolId || !data.username) {
        socket.emit('error', { message: 'Invalid typing data' });
        return;
      }
      
      // Broadcast to other users in the same tool room
      socket.to(`tool_${data.toolId}`).emit('user_typing', {
        username: data.username,
        timestamp: Date.now()
      });
    });

    // Handle user activity tracking
    socket.on('user_activity', (data: { action: string; toolId?: string }) => {
      logger.debug(`User activity: ${data.action}`, { 
        socketId: socket.id, 
        toolId: data.toolId 
      });
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      logger.info(`Client disconnected: ${socket.id}, reason: ${reason}`);
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error('Socket error:', error);
    });
  });

  // Global event handlers for database changes
  return {
    // Broadcast new opinion to tool room
    broadcastNewOpinion: (toolId: string, opinion: any) => {
      io.to(`tool_${toolId}`).emit('new_opinion', opinion);
      logger.debug(`Broadcasting new opinion to tool ${toolId}`);
    },

    // Broadcast opinion update
    broadcastOpinionUpdate: (toolId: string, opinion: any) => {
      io.to(`tool_${toolId}`).emit('opinion_updated', opinion);
      logger.debug(`Broadcasting opinion update to tool ${toolId}`);
    },

    // Broadcast vote update
    broadcastVoteUpdate: (toolId: string, data: any) => {
      io.to(`tool_${toolId}`).emit('vote_updated', data);
      logger.debug(`Broadcasting vote update to tool ${toolId}`);
    },

    // Broadcast tool rating update
    broadcastRatingUpdate: (toolId: string, data: any) => {
      io.to(`tool_${toolId}`).emit('rating_updated', data);
      logger.debug(`Broadcasting rating update to tool ${toolId}`);
    },

    // Broadcast new tool addition
    broadcastNewTool: (tool: any) => {
      io.emit('new_tool', tool);
      logger.debug(`Broadcasting new tool: ${tool.name}`);
    },

    // Get connected users count for a tool
    getToolRoomSize: async (toolId: string): Promise<number> => {
      const room = io.sockets.adapter.rooms.get(`tool_${toolId}`);
      return room?.size || 0;
    },

    // Get all connected clients count
    getConnectedCount: (): number => {
      return io.engine.clientsCount;
    }
  };
};

export default setupSocketHandlers;