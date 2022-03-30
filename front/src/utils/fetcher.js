export const fetcher = (...args) =>
  fetch(...args).then((res) => {
    return res.json();
  });
