export const exclude = <T, Key extends keyof T>(
  model: T,
  ...keys: Key[]
): Omit<T, Key> => {
  if (!model) throw new Error('Model arg is missing.');

  for (const key of keys) {
    delete model[key];
  }
  return model;
};
