import Image from 'next/image';
import CommentStar from '@/../public/icons/comment_star.svg';
import Input from '../form/Input';
import Textarea from '../form/Textarea';

export default function CommentWrite() {
  return (
    <>
      <form action="">
        <div className="flex">
          <Image src={CommentStar} width={0} height={0} alt="댓글 별리뷰1" />
          <Image src={CommentStar} width={0} height={0} alt="댓글 별리뷰2" />
          <Image src={CommentStar} width={0} height={0} alt="댓글 별리뷰3" />
          <Image src={CommentStar} width={0} height={0} alt="댓글 별리뷰4" />
          <Image src={CommentStar} width={0} height={0} alt="댓글 별리뷰5" />
        </div>
        <Input
          // value={postData.userTitle}
          type="text"
          placeholder="작성자 명을 입력해 주세요"
          label="작성자"
          id="commentUser"
          // required={requiredMessage}
          onChangeFnc={onPostFormChange}
        />
        <Input
          // value={postData.userTitle}
          placeholder="비밀번호을 입력해주세요."
          label="비밀번호"
          id="commentPw"
          // required={requiredMessage}
          onChangeFnc={onPostFormChange}
        />
        <Textarea
          // value={postData.usercontent}
          placeholder="내용을 입력해주세요."
          label="내용"
          id="usercontent"
          // required={requiredMessage}
          onChangeFnc={onPostFormChange}
        />
      </form>
    </>
  );
}
