// 서버에서 데이터를 가져오는 함수
async function getPosts() {
  const res = await fetch("https://dummyapi.online/api/blogposts", {
    cache: "no-store", // 매 요청마다 새 데이터를 가져옴 (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function PostsPage() {
  // 서버 사이드에서 데이터를 불러옴
  const posts = await getPosts();

  return (
    <div>
      <h1>게시글 리스트</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
