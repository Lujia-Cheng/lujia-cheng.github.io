// todo
export enum ServerStatus {
  STANDBY = "standby",
  CONNECTING = "connecting",
  CONNECTED = "connected",
  TIMEOUT = "timeout",
  ERROR = "error",
}

type ServerStatusAction =
  | { type: "CONNECTING" }
  | { type: "CONNECTED" }
  | { type: "STANDBY" }
  | { type: "TIMEOUT" }
  | { type: "ERROR" };

export function serverStatusReducer(
  state: ServerStatus,
  action: ServerStatusAction
): ServerStatus {
  switch (action.type) {
    case "CONNECTING":
      return ServerStatus.CONNECTING;
    case "CONNECTED":
      return ServerStatus.CONNECTED;
    case "STANDBY":
      return ServerStatus.STANDBY;
    case "TIMEOUT":
        return ServerStatus.TIMEOUT;
    case "ERROR":
      return ServerStatus.ERROR;
    default:
      return state;
  }
}
