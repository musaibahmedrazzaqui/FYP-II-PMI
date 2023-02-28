export const validatePassword = (password) => {
  if (password.length < 6) {
    return false;
  } else return true;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (
    password.length === 0 ||
    confirmPassword.length === 0 ||
    password !== confirmPassword
  )
    return false;
  if (password === confirmPassword) return true;
  else return false;
};
