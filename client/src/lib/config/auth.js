import { getServerSession } from "next-auth";
import { authOptions } from "./authOption";

export const getServerSessionData = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw Error("Session not available");
  }

  return session.user;
};
