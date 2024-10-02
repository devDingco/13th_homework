const App = () => {
  //rest
  const restApi = async () => {
    const result = await fetch("https://koreanjson.com/users");
    const data = await result.json();
    console.log(data);
    console.log(data[1].name);
  };
  return <button onClick={restApi}>REST-API 요청하기</button>;
};
