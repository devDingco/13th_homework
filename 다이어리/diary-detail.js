const queryString = new URLSearchParams(location.search)

const mood = queryString.get(mood);
const title = queryString.get(title);
const content = queryString.get(content);
const imageName = queryString.get(imageName);
const color = queryString.get(color);
const date = queryString.get(date);
const id = queryString.get(id);

