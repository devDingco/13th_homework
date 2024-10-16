import { useState, useEffect, ChangeEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  UpdateBoardDocument,
  FetchBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  UpdateBoardMutation,
  UpdateBoardMutationVariables,
  FetchBoardQuery,
  FetchBoardQueryVariables,
} from "@/commons/graphql/graphql";
import { FormData, FormErrors } from "@/types/board";

// 게시글 생성/수정
export const useBoardForm = (mode: "create" | "edit", boardId?: string) => {
  const router = useRouter();

  // 인풋
  const [formData, setFormData] = useState<FormData>({
    writer: "",
    password: "",
    title: "",
    contents: "",
    zipcode: "",
    address: "",
    addressDetail: "",
    youtubeUrl: "",
  });

  // 폼 유효성 검사 오류
  const [errors, setErrors] = useState<FormErrors>({});

  // 폼이 유효한지
  const [isFormValid, setIsFormValid] = useState(false);

  // 폼 데이터가 변경되었는지
  const [isFormChanged, setIsFormChanged] = useState(false);

  // 초기 폼 데이터를 저장하는 상태 (수정)
  const [initialFormData, setInitialFormData] = useState<FormData | null>(null);

  // 게시글 생성
  const [createBoard] = useMutation<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >(CreateBoardDocument);

  //  수정
  const [updateBoard] = useMutation<
    UpdateBoardMutation,
    UpdateBoardMutationVariables
  >(UpdateBoardDocument);

  // query 실행: 게시글 정보 가져오기 ('수정')
  const { data, loading } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(
    FetchBoardDocument,
    {
      variables: { boardId: boardId || "" },
      skip: mode === "create" || !boardId, // '생성'이거나 boardId가 없으면 쿼리 실행 안 함
    }
  );

  // 수정 모드일 때 기존 게시글 데이터로 폼 초기화
  // useEffect : 컴포넌트가 렌더링 될 때마다 특정 작업(Sied effect)을 실행할 수 있게 함
  useEffect(() => {
    if (mode === "edit" && data?.fetchBoard) {
      const { writer, title, contents, youtubeUrl, boardAddress } =
        data.fetchBoard;
      const initialData = {
        writer: writer || "",
        password: "",
        title: title || "",
        contents: contents || "",
        zipcode: boardAddress?.zipcode || "",
        address: boardAddress?.address || "",
        addressDetail: boardAddress?.addressDetail || "",
        youtubeUrl: youtubeUrl || "",
      };
      setFormData(initialData); // 폼 데이터 설정
      setInitialFormData(initialData); // 초기 데이터 저장
      setIsFormChanged(false); // 폼 변경 상태 초기화
    }
  }, [data, mode]);

  // 폼 입력값 변경 처리 함수
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      if (mode === "edit" && initialFormData) {
        // 수정 모드에서 폼 데이터 변경 여부 확인
        const isChanged = Object.keys(newFormData).some((key) => {
          // writer와 password 필드는 제외하고 비교
          if (key === "writer" || key === "password") return false;
          return (
            newFormData[key as keyof FormData] !==
            initialFormData[key as keyof FormData]
          );
        });
        setIsFormChanged(isChanged); // 폼 변경 상태 업데이트
      }
      return newFormData;
    });
    setErrors((prev) => ({ ...prev, [name]: "" })); // 해당 필드의 오류 초기화
    validateForm({ ...formData, [name]: value }); // 폼 유효성 검사
  };

  // 폼 유효성 검사 함수
  const validateForm = (data: FormData) => {
    const requiredFields =
      mode === "create"
        ? ["writer", "password", "title", "contents"]
        : ["title", "contents"];
    const allFieldsFilled = requiredFields.every(
      (field) => data[field as keyof FormData]?.trim() !== ""
    );
    setIsFormValid(
      mode === "create" ? allFieldsFilled : allFieldsFilled && isFormChanged
    );
    return allFieldsFilled;
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    if (!validateForm(formData)) {
      // 폼 유효성 검사 실패 시 오류 메시지 설정
      setErrors({
        writer: formData.writer ? "" : "필수입력 사항입니다.",
        password: formData.password ? "" : "필수입력 사항입니다.",
        title: formData.title ? "" : "필수입력 사항입니다.",
        contents: formData.contents ? "" : "필수입력 사항입니다.",
      });
      return;
    }

    try {
      if (mode === "create") {
        // 게시글 생성 로직
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: formData.writer,
              password: formData.password,
              title: formData.title,
              contents: formData.contents,
              youtubeUrl: formData.youtubeUrl || undefined,
              boardAddress: {
                zipcode: formData.zipcode,
                address: formData.address,
                addressDetail: formData.addressDetail,
              },
            },
          },
        });
        alert("게시글이 성공적으로 등록되었습니다.");
        if (result.data) {
          router.push(`/boards/${result.data.createBoard._id}`); // 생성된 게시글 페이지로 이동
        }
      } else if (boardId) {
        // 게시글 수정 로직
        const password = prompt("글을 수정하기 위해 비밀번호를 입력해주세요");
        if (!password) return;

        await updateBoard({
          variables: {
            updateBoardInput: {
              title: formData.title,
              contents: formData.contents,
              youtubeUrl: formData.youtubeUrl || undefined,
              boardAddress: {
                zipcode: formData.zipcode,
                address: formData.address,
                addressDetail: formData.addressDetail,
              },
            },
            password,
            boardId,
          },
        });
        alert("게시글이 성공적으로 수정되었습니다.");
        router.push(`/boards/${boardId}`); // 수정된 게시글 페이지로 이동
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(
          mode === "create"
            ? `게시글 등록 중 오류가 발생했습니다: ${error.message}`
            : `게시글 수정 중 오류가 발생했습니다: ${error.message}`
        );
      }
    }
  };

  return {
    formData,
    errors,
    isFormValid,
    isFormChanged,
    loading,
    handleChange,
    handleSubmit,
    setFormData,
  };
};
