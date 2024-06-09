export const outputEventLog = (
  logLevel: string,
  socketId: string,
  eventName: string
): void => {
  let logMsg: string = "";

  const current = new Date();
  const date = current.toDateString();
  const time = current.toLocaleTimeString();

  logMsg = `<${logLevel}> ${date} ${time}: From[${socketId}] Event[${eventName}]`;

  console.log(logMsg);
};
