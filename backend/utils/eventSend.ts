import dataAccessModel from "../models/dataAccessModel";
import { io } from "../socket";

const access = new dataAccessModel();

export const broadcast = (
  roomId: string,
  eventName: string,
  parameter: string = ""
): void => {
  const room = access.findRoom(roomId);

  if (room) {
    room.gameData.forEach((member) => {
      io.to(member.getSocketId()).emit(eventName, parameter);
    });
  }
};

export const sendEvent = (
  socketId: string,
  eventName: string,
  parameter: string = ""
): boolean => {
  io.to(socketId).emit(eventName, parameter);
  try {
    io.to(socketId).emit(eventName, parameter);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
