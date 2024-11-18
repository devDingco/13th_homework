"use client";
export default function Button({ children }: { children: React.ReactNode }) {
  const onClickButton = async () => {
    const result = await fetch("https://koreanjson.com/posts/1");
    const data = await result.json();
    console.log(data);
  };
  return <button onClick={onClickButton}>{children}</button>;
}
