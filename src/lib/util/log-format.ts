import { colors } from "./colors";

export const formatStatus = (status: number) => {
  switch (true) {
    case status >= 500:
      return `${colors.BgRed} ${status} ${colors.Reset}`;
    case status >= 400:
      return `${colors.BgYellow} ${status} ${colors.Reset}`;
    case status >= 300:
      return `${colors.BgCyan} ${status} ${colors.Reset}`;
    case status >= 200:
      return `${colors.BgGreen} ${status} ${colors.Reset}`;
    default:
      return `${colors.Reset}`;
  }
};

export const formatMethod = (method = "") => {
  switch (method) {
    case "GET":
      return `${colors.BgGreen} ${method}      => ${colors.Reset}`;
    case "POST":
      return `${colors.BgCyan} ${method}      => ${colors.Reset}`;
    case "PUT":
      return `${colors.BgYellow} ${method}      => ${colors.Reset}`;
    case "PATCH":
      return `${colors.BgMagenta} ${method}      => ${colors.Reset}`;
    case "DELETE":
      return `${colors.BgRed} ${method}      => ${colors.Reset}`;
    default:
      return `${colors.Reset}`;
  }
};
