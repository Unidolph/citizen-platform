import { Request, Response } from 'express';
import Message from '../models/message';
import message from '../models/message';


export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { projectId, message } = req.body;
    const userId = (req as any).user?._id;

    if (!projectId || !message) {
      return res.status(400).json({ message: "Project ID and message are required" });
    }

    const newMessage = await message.create({
      project: projectId,
      sender: userId,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const messages = await message.find({ project: projectId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
};

export const saveMessage = async (sender: string, content: string, room: string) => {
  const message = new Message({ sender, content, room });
  await message.save();
  return message;
};