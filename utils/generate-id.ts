// https://gist.github.com/gordonbrander/2230317
export default function() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}
