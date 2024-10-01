"use client";
import Input from "@/components/input";
import { set, useForm } from "react-hook-form";
import type { formList } from "@/utils/useformset";
import { formResister } from "@/utils/useformset";
import PostSearchPopBtn from "@/components/postSearchPopBtn";
import { useEffect, useState } from "react";
import ReactQuillBox from "@/components/reactQuillBox";
import { useRouter, useParams } from "next/navigation";
import { useMutation, gql, useQuery } from "@apollo/client";

interface ItypeSet {
  [key: string]: {
    createBoardInput?: {
      writer: string | undefined;
      password: string | undefined;
      title: string | undefined;
      contents: string | undefined;
      youtubeUrl?: URL | undefined;
      boardAddress?: {
        zipcode: string | undefined;
        address: string | undefined;
        addressDetail: string | undefined;
      };
      images?: string | undefined;
    };
    updateBoardInput?: {
      title: string | undefined;
      contents: string | undefined;
      youtubeUrl?: URL | undefined;
      boardAddress?: {
        zipcode: string | undefined;
        address: string | undefined;
        addressDetail: string | undefined;
      };
      images?: string | undefined;
    };
    password?: string | undefined;
    boardId?: string | undefined;
  };
}

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      user {
        picture
        deletedAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
    }
  }
`;

export default function BoardForm(props: { title: string; formType: string }) {
  const router = useRouter();
  const params = useParams();
  const { title, formType } = props;

  const [contents, setContents] = useState({ text: "", html: "" }); // 게시글 내용
  const [disabled, setDisabled] = useState(true);

  const [boardControl] = useMutation(
    formType === "edit" ? UPDATE_BOARD : CREATE_BOARD
  );

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  const {
    register, // 검증 규칙 적용 메서드
    setValue, // 입력값 설정 메서드
    formState: { errors, isValid }, // 폼의 상태를 나타내는 속성
    getValues, // 폼의 입력값을 반환하는 메서드
  } = useForm<formList>({
    mode: "onChange",
  }); // 어떤 이벤트에 동작을 하도록 할지 설정

  useEffect(() => {
    if (data && formType === "edit") {
      setValue("writeName", data.fetchBoard.writer);
      setValue("writeTitle", data.fetchBoard.title);
      setValue("writeContents", data.fetchBoard.contents);
      setContents({
        text: data.fetchBoard.contents,
        html: data.fetchBoard.contents,
      });
      setValue("youtubeUrl", data.fetchBoard.youtubeUrl);
      setValue("writeAddressPost", data.fetchBoard.boardAddress?.zipcode);
      setValue("writeAddress", data.fetchBoard.boardAddress?.address);
      setValue(
        "writeAddressDetail",
        data.fetchBoard.boardAddress?.addressDetail
      );
    }
    console.log(data?.fetchBoard);
  }, [data, setValue, formType]);

  // isValid가 true여도 content.text가 빈 문자열이면 disabled를 true로 설정
  // isValid가 true이고 content.text가 빈 문자열이 아니면 disabled를 false로 설정
  useEffect(() => {
    if (isValid && contents.text !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isValid, contents.text]);

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const resultData = getValues();
    const typeSet: ItypeSet = {
      edit: {
        updateBoardInput: {
          title: resultData.writeTitle,
          contents: contents.html,
        },
        password: resultData.writePassword,
        boardId: params.boardId as string,
      },
      write: {
        createBoardInput: {
          writer: resultData.writeName,
          password: resultData.writePassword,
          title: resultData.writeTitle,
          contents: contents.html,
          youtubeUrl: resultData.youtubeUrl as URL,
          boardAddress: {
            zipcode: resultData.writeAddressPost,
            address: resultData.writeAddress,
            addressDetail: resultData.writeAddressDetail,
          },
          images: "",
        },
      },
    };

    try {
      if (formType === "edit") {
        const prompt = window.prompt("비밀번호를 입력해 주세요.");
        //!! 작업해야됨!!!
        if (prompt) {
        } else {
          alert("비밀번호가 틀려서 수정할 수 없습니다.");
          return;
        }
      }
      const result = await boardControl({
        variables: {
          ...typeSet[formType],
        },
      });
      console.log(result);

      alert(`게시글이 ${formType === "edit" ? "수정" : "등록"}되었습니다.`);
      router.push(`/board/detail/${result.data.createBoard._id}`);
    } catch (error) {
      alert(`게시글 ${formType === "edit" ? "수정" : "등록"}에 실패했습니다.`);
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">{title}</h1>
      <form>
        <div className="flex justify-between gap-10 flex-nowrap">
          <Input
            id="writeName"
            title="작성자"
            // required
            placeholder="작성자 명을 입력해 주세요."
            type="text"
            {...register("writeName", formResister.writeName)}
            errormessage={errors?.writeName?.message}
            defaultValue=""
            {...(formType === "edit" && { readOnly: true })}
          />

          <Input
            id="writePassword"
            title="비밀번호"
            required
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            {...register("writePassword", formResister.writePassword)}
            errormessage={errors?.writePassword?.message}
            defaultValue=""
            {...(formType === "edit" && { readOnly: true })}
          />
        </div>
        <hr className="my-10" />
        <Input
          id="writeTitle"
          title="제목"
          required
          placeholder="제목을 입력해 주세요."
          type="text"
          {...register("writeTitle", formResister.writeTitle)}
          errormessage={errors?.writeTitle?.message}
          defaultValue=""
        />
        <hr className="my-10" />
        <ReactQuillBox
          title={
            <div className="flex gap-1 pb-3">
              내용 <span className="text-red-500">*</span>
            </div>
          }
          id="writeContents"
          contents={contents}
          setcontents={setContents}
          onChange={(text) => {
            register("writeContents", formResister.writeContents);
            setValue("writeContents", text);
          }}
          readonly={false}
          placeholder="내용을 입력해 주세요."
          errormessage={errors?.writeContents?.message}
          defaultValue=""
        />

        <div className="py-10" />
        <div className="flex gap-2 items-end max-w-56">
          <Input
            id="writeAddressPost"
            title="주소"
            placeholder="01234"
            type="text"
            {...register("writeAddressPost", formResister.writeAddressPost)}
            errormessage={errors?.writeAddressPost?.message}
            defaultValue={getValues("writeAddressPost")}
            {...(formType === "edit" && { readOnly: true })}
          />
          <PostSearchPopBtn
            setaddress={(field, value) => setValue("writeAddress", value)}
            setzonecode={(field, value) => setValue("writeAddressPost", value)}
            btnstyle="btn btn-outline"
            {...(formType === "edit" && { readOnly: true })}
          />
        </div>
        <Input
          id="writeAddress"
          placeholder="주소"
          type="text"
          {...register("writeAddress", formResister.writeAddress)}
          errormessage={errors?.writeAddress?.message}
          defaultValue={getValues("writeAddress")}
          {...(formType === "edit" && { readOnly: true })}
        />
        <Input
          id="writeAddressDetail"
          placeholder="상세 주소를 입력해주세요"
          type="text"
          {...register("writeAddressDetail", formResister.writeAddressDetail)}
          errormessage={errors?.writeAddressDetail?.message}
          {...(formType === "edit" && { readOnly: true })}
        />
        <hr className="my-10" />
        <Input
          id="youtubeUrl"
          title="유투브 링크"
          placeholder="링크를 입력해 주세요."
          type="url"
          {...register("youtubeUrl", formResister.youtubeUrl)}
          errormessage={errors?.youtubeUrl?.message}
          {...(formType === "edit" && { readOnly: true })}
        />
        <hr className="my-10" />
        <div className="flex gap-4 items-end">
          <Input
            title="사진 첨부"
            placeholder="클릭해서 사진 업로드"
            type="file"
            accept="image/*"
            {...register("imgFile1", formResister.imgFile1)}
            errormessage={errors?.imgFile1?.message}
          />
          <Input
            placeholder="클릭해서 사진 업로드"
            type="file"
            accept="image/*"
            {...register("imgFile2", formResister.imgFile2)}
            errormessage={errors?.imgFile2?.message}
          />
          <Input
            placeholder="클릭해서 사진 업로드"
            type="file"
            accept="image/*"
            {...register("imgFile3", formResister.imgFile3)}
            errormessage={errors?.imgFile3?.message}
          />
        </div>
        <div className="flex items-end justify-end gap-4 pt-10">
          <button type="reset" className="btn btn-outline">
            취소
          </button>

          <button
            type="submit"
            className="btn btn-primary disabled:btn-disabled"
            value="등록하기"
            onClick={(event) => onSubmit(event)}
            // 폼의 유효성 검사를 통과하지 못하면 버튼 비활성화
            disabled={disabled}
          >
            등록하기
          </button>
        </div>
      </form>
    </>
  );
}
