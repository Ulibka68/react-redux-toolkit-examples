// A mock function to mimic making an async request for data
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
