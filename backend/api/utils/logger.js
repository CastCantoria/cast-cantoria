export const success = (data) => ({ status: 'success', data });
export const error = (message) => ({ status: 'error', message });