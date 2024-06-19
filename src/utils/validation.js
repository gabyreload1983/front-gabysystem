export const validateCreateServiceWork = (user) =>
  user.role === "premium" || user.role === "saler";
