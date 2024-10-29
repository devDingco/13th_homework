import { UpdateBoardCommentDocument } from "./../../../commons/graphql/graphql";
import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface IUseCommentWriterProps {
  isEdit?: boolean;
  defaultValue?: {
    contents: string;
    rating: number;
    _id: string;
    writer: string;
  };
  onCancel?: () => void;
  boardId: string;
  onSuccess?: () => void;
}

export default function useCommentWriter(props: IUseCommentWriterProps) {
  //#region 댓글 등록후 초기화
  const INITIAL_COMMENT_DATA = {
    writer: "",
    password: "",
    rating: props.defaultValue?.rating ?? 0,
    contents: props.defaultValue?.contents ?? "",
  };

  // input에 따라 상태 변화
  const [commentData, setCommentData] = useState(INITIAL_COMMENT_DATA);

  // 댓글 수정
  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);

  //그래프큐엘 내용들 보내기
  const [createBoardComment] = useMutation(CreateBoardCommentDocument, {
    onCompleted: () => {
      // 댓글 작성 완료 후 콜백 실행
      props.onSuccess?.();
    },
  });

  const params = useParams();
  const boardId = params.boardId as string;

  useEffect(() => {
    if (props.defaultValue) {
      setCommentData((prev) => ({
        ...prev,
        contents: props.defaultValue?.contents ?? "",
        rating: props.defaultValue?.rating ?? 0,
      }));
    }
  }, [props.defaultValue]);

  //  typing value will udate 'commentData.writer or ...' to my typing
  const onChange = (event) => {
    // #region event...? I dont knw type....
    const { name, value } = event.target;
    console.log(typeof event.target.value); //rating -> string...

    // contents일때만 길이 체크
    if (name === "contents") {
      if (value.length <= 100) {
        setCommentData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      // 100자 넘으면 입력안되게
    } else if (name === "rating") {
      const ratingValue = parseFloat(value);
      setCommentData((prev) => ({
        ...prev,
        [name]: ratingValue,
      }));
    } else {
      // 다른 필드라면 그래도 업데이트
      setCommentData((prev) => ({
        ...prev, //copies all existing properties from the current state
        [name]: value, // updates only specific (writer,, or ~) property with the new value
      }));
    }
    console.log(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); //폼 제출 기본 동작 방지

    try {
      if (props.isEdit) {
        // 수정 시 비밀번호 검증 먼저 시도
        try {
          await updateBoardComment({
            variables: {
              updateBoardCommentInput: {
                contents: commentData.contents,
                rating: commentData.rating,
              },
              password: commentData.password,
              boardCommentId: props.defaultValue?._id as string,
            },
            refetchQueries: [
              {
                query: FetchBoardCommentsDocument,
                variables: { boardId },
              },
            ],
          });
          alert("댓글이 수정되었습니다.");
          props.onCancel?.();
        } catch (error) {
          if (error instanceof Error) {
            if (error.message.includes("password")) {
              alert("비밀번호가 일치하지 않습니다.");
            } else {
              alert(error.message);
            }
          }
        }
      } else {
        await createBoardComment({
          variables: {
            createBoardCommentInput: commentData,
            boardId,
          },
          refetchQueries: [
            {
              query: FetchBoardCommentsDocument,
              variables: { boardId },
            },
          ],
        });
        alert("댓글이 등록되었습니다. 🍀");
        setCommentData(INITIAL_COMMENT_DATA);
      }
    } catch (error) {
      console.log("댓글 수정 실패: ", error);
    }
  };

  return {
    commentData,
    handleSubmit,
    onChange,
  };
}
