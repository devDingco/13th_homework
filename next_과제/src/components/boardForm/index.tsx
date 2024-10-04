"use client";
import Input from "@/components/input";
import { useForm, Controller } from "react-hook-form";
import type { formList } from "@/utils/useformset";
import { formResister } from "@/utils/useformset";
import PostSearchPopBtn from "@/components/postSearchPopBtn";
import ReactQuillBox from "@/components/reactQuillBox";
import { useRouter, useParams } from "next/navigation";
import { useMutation, gql, DocumentNode } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
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

interface IboardFormProps {
  title: string;
  formType: string;
  data?: {
    fetchBoard: {
      writer: string;
      title: string;
      contents: string;
      youtubeUrl: string;
      boardAddress: {
        zipcode: string;
        address: string;
        addressDetail: string;
      };
      images: string[];
    };
  };
  fetchQuery?: DocumentNode;
}

export default function BoardForm(props: IboardFormProps) {
  const router = useRouter();
  const params = useParams() as { boardId: string };
  const { title, formType, data, fetchQuery } = props;

  // 게시글 등록 및 수정을 위한 useMutation
  const [boardControl] = useMutation(
    formType === "edit" ? UPDATE_BOARD : CREATE_BOARD
  );

  const {
    control,
    register, // 검증 규칙 적용 메서드
    setValue, // 입력값 설정 메서드
    formState: { errors, isValid, isDirty, dirtyFields }, // 폼의 상태를 나타내는 속성 isValid, isDirty
    getValues, // 폼의 입력값을 반환하는 메서드
    // getFieldState, // 폼의 입력값 상태를 반환
  } = useForm<formList>({
    mode: "onChange",
  }); // 어떤 이벤트에 동작을 하도록 할지 설정

  // 모든 태그 및 개행문자를 제거한 게시글 내용을 리턴하는 함수
  // const removeTags = (str: string) => {
  //   return str.replace(/(<([^>]+)>)/gi, "").replace(/(\r\n\t|\n|\r\t)/gm, "");
  // };

  // 게시글 수정 함수
  const onBoardEdit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const promptPassword = window.prompt("비밀번호를 입력해 주세요.");

      //!! 작업해야됨!!!
      if (promptPassword) {
        const writeTitleData = getValues("writeTitle"); // useForm의 writeTitle 데이터를 가져옴
        const writeContentsData = getValues("writeContents"); // useForm의 writeTitle 데이터를 가져옴

        interface IeditVariables {
          updateBoardInput: {
            title?: string;
            contents?: string;
          };
          boardId: string;
          password: string;
        }

        // 수정된 내용이 있는 경우에만 데이터 보내도록 처리
        const editVariables: IeditVariables = {
          updateBoardInput: {},
          boardId: params.boardId,
          password: promptPassword,
        };

        if (writeTitleData)
          editVariables.updateBoardInput.title = writeTitleData;
        if (writeContentsData)
          editVariables.updateBoardInput.contents = writeContentsData;

        const result = await boardControl({
          variables: editVariables,
          refetchQueries: [
            ...(fetchQuery
              ? [{ query: fetchQuery, variables: { boardId: params.boardId } }]
              : []),
          ],
        });
        console.log(result);
        alert(`게시글이 수정되었습니다.`);
        router.push(`/boards/${result.data.updateBoard._id}`);
      } else {
        alert("비밀번호가 틀려서 수정할 수 없습니다.");
        return;
      }
    } catch (error) {
      if (error instanceof Error && "graphQLErrors" in error) {
        alert(`${(error as any).graphQLErrors.message}`);
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  // 게시글 등록 함수
  const onBoardNew = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const resultData = getValues(); // useForm의 모든 데이터를 가져옴
      const writeVariables = {
        createBoardInput: {
          writer: resultData.writeName,
          password: resultData.writePassword,
          title: resultData.writeTitle,
          contents: getValues("writeContents"),
          youtubeUrl: resultData.youtubeUrl as URL,
          boardAddress: {
            zipcode: resultData.writeAddressPost,
            address: resultData.writeAddress,
            addressDetail: resultData.writeAddressDetail,
          },
          images: "",
        },
      };

      console.log(writeVariables);

      const result = await boardControl({ variables: writeVariables });
      console.log(result);

      alert(`게시글이 등록되었습니다.`);
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      alert(`게시글 등록에 실패했습니다.`);
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
            defaultValue={formType === "edit" ? data?.fetchBoard.writer : ""}
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
            defaultValue={""}
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
          defaultValue={formType === "edit" ? data?.fetchBoard.title : ""}
        />
        <hr className="my-10" />
        {(data || formType !== "edit") && (
          <Controller
            name="writeContents"
            control={control}
            defaultValue={data?.fetchBoard.contents}
            render={({ field }) => (
              <ReactQuillBox
                id="writeContents"
                title={
                  <div className="flex gap-1 pb-3">
                    내용 <span className="text-red-500">*</span>
                  </div>
                }
                readonly={false}
                placeholder="내용을 입력해 주세요."
                errormessage={errors?.writeContents?.message}
                {...field}
                onChange={(html) => {
                  field.onChange(html);
                  setValue("writeContents", html);
                }}
              />
            )}
          />
        )}

        <div className="py-10" />
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-end max-w-56">
            <Input
              id="writeAddressPost"
              title="주소"
              placeholder="01234"
              type="text"
              {...register("writeAddressPost", formResister.writeAddressPost)}
              errormessage={errors?.writeAddressPost?.message}
              {...(formType === "edit" && { readOnly: true })}
              defaultValue={
                formType === "edit"
                  ? data?.fetchBoard.boardAddress?.zipcode
                  : ""
              }
            />
            <PostSearchPopBtn
              setaddress={(field, value) => setValue("writeAddress", value)}
              setzonecode={(field, value) =>
                setValue("writeAddressPost", value)
              }
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
            {...(formType === "edit" && { readOnly: true })}
            defaultValue={
              formType === "edit" ? data?.fetchBoard.boardAddress?.address : ""
            }
          />
          <Input
            id="writeAddressDetail"
            placeholder="상세 주소를 입력해주세요"
            type="text"
            {...register("writeAddressDetail", formResister.writeAddressDetail)}
            errormessage={errors?.writeAddressDetail?.message}
            {...(formType === "edit" && { readOnly: true })}
            defaultValue={
              formType === "edit"
                ? data?.fetchBoard.boardAddress?.addressDetail
                : ""
            }
          />
        </div>
        <hr className="my-10" />
        <Input
          id="youtubeUrl"
          title="유투브 링크"
          placeholder="링크를 입력해 주세요."
          type="url"
          {...register("youtubeUrl", formResister.youtubeUrl)}
          errormessage={errors?.youtubeUrl?.message}
          {...(formType === "edit" && { readOnly: true })}
          defaultValue={formType === "edit" ? data?.fetchBoard.youtubeUrl : ""}
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
            {...(formType === "edit" && { readOnly: true })}
            defaultValue={formType === "edit" ? data?.fetchBoard.images[0] : ""}
          />
          <Input
            placeholder="클릭해서 사진 업로드"
            type="file"
            accept="image/*"
            {...register("imgFile2", formResister.imgFile2)}
            errormessage={errors?.imgFile2?.message}
            {...(formType === "edit" && { readOnly: true })}
            defaultValue={formType === "edit" ? data?.fetchBoard.images[1] : ""}
          />
          <Input
            placeholder="클릭해서 사진 업로드"
            type="file"
            accept="image/*"
            {...register("imgFile3", formResister.imgFile3)}
            errormessage={errors?.imgFile3?.message}
            {...(formType === "edit" && { readOnly: true })}
            defaultValue={formType === "edit" ? data?.fetchBoard.images[2] : ""}
          />
        </div>
        <div className="flex items-end justify-end gap-4 pt-10">
          <button
            type={formType === "edit" ? "button" : "reset"}
            className="btn btn-outline"
            onClick={() =>
              formType === "edit" && router.push(`/boards/${params.boardId}`)
            }
          >
            취소
          </button>

          <button
            type="submit"
            className="btn btn-primary text-base-100 disabled:btn-disabled"
            value="등록하기"
            onClick={formType === "edit" ? onBoardEdit : onBoardNew}
            // 폼의 유효성 검사를 통과하지 못하면 버튼 비활성화
            disabled={
              formType === "edit"
                ? // 수정 시 내용이나 제목이 변경된 경우만 버튼 활성화
                  dirtyFields.writeContents === true ||
                  dirtyFields.writeTitle === true
                  ? false
                  : true
                : !isValid || !isDirty // 등록 시 폼의 유효성 검사를 통과하지 못하면 버튼 비활성화
            }
          >
            {formType === "edit" ? "수정" : "등록"}하기
          </button>
        </div>
      </form>
    </>
  );
}
