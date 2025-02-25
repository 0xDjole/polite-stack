export const config = {
  endpoint: '',
};

export function configure(options = {}) {
  Object.assign(config, options);
}
