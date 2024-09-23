import styles from './postDisplay.module.css';

interface Params {
    id: string;
}

interface PostDisplayProps {
    params: Params;
}

export default function PostDisplay({ params } : PostDisplayProps) {
  const post = {
    username: '작성자 이름',
    date: '2023/09/11',
    title: '게시물 제목',
    content: `게시물 내용: 여기에 게시물 내용을 표시합니다. 게시물에는 여러 줄이 포함될 수 있습니다.`,
    image: '/images/image1.jpg',
    youtubeLink: '/images/thumbnail1.jpg',
  };

  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <div className={styles.info}>
        <span>{post.username}</span>
        <span>{post.date}</span>
      </div>
      <div className={styles.content}>
        <img src={post.image} alt="Post Image" className={styles.image} />
        <p>{post.content}</p>
        <img src={post.youtubeLink} alt="YouTube Thumbnail" className={styles.youtubeThumbnail} />
      </div>
      <div className={styles.actions}>
        <button>수정하기</button>
        <button>삭제하기</button>
      </div>
    </div>
  );
}
