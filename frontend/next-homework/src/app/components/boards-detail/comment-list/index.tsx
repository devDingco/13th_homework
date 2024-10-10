"use client";

import useCommentList from "./hook";

const CommentListComponent = () => {
  const { data } = useCommentList();

  return (
    <div>
      <div>
        {data?.fetchBoardComments.map((el) => (
          <div key={el._id}>
            <div>
              {/* <Image src={el.user.picture ?? ""} alt="profile" width={0} height={0} /> */}
              {/* <span>{el.user.name}</span> */}
            </div>
            <div>{/* <Image /> */}</div>
            <p>{el.contents}</p>
            <p>{el.createdAt.split("T")[0]}</p>
            <p>수정됨</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentListComponent;
