export function nameValidator(name) {
  const re = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
  if (!name) return "Name can't be empty.";
  if (re.test(name)) return 'Ooops! You entered numbers in Name field';
  return '';
}
