export const config = {
  endpoint: null,
};

export function configure(options = {}) {
  Object.assign(config, options);
}
