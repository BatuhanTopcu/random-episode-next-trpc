import { createRouter } from "./context";

export const userRouter = createRouter().mutation("delete-user", {
  async resolve({ ctx }) {
    const { session, prisma } = ctx;
    if (!session?.user?.email) {
      return { success: false, msg: "No user logged in" };
    }
    try {
      await prisma.user.delete({
        where: { email: session.user.email },
      });
      return { success: true, msg: "User deleted" };
    } catch (e) {
      return { success: false, msg: "Error deleting user" };
    }
  },
});
