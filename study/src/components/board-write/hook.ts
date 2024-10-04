import {
  IeditVariables,
  IformList,
  IformResister,
} from "@/components/board-write/types";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import {
  WRITE_CREATE_BOARD,
  WRITE_UPDATE_BOARD,
  WRITE_FETCH_BOARD,
} from "@/components/board-write/queries";

export const useBoardWrite = (formType: string) => {
  const router = useRouter();
  const params = useParams() as { boardId: string };

  // !수정할 게시글 데이터 가져오기
  const { data } = useQuery(WRITE_FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  // !게시글 등록 및 수정을 위한 useMutation
  const [boardControl] = useMutation(
    formType === "edit" ? WRITE_UPDATE_BOARD : WRITE_CREATE_BOARD
  );

  const {
    control,
    register, // 검증 규칙 적용 메서드
    setValue, // 입력값 설정 메서드
    formState: { errors, isValid, isDirty, dirtyFields }, // 폼의 상태를 나타내는 속성 isValid, isDirty
    getValues, // 폼의 입력값을 반환하는 메서드
  } = useForm<IformList>({
    mode: "onChange",
  }); // 어떤 이벤트에 동작을 하도록 할지 설정

  // !게시글 수정 함수
  const onBoardEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // 비밀번호 확인
      const promptPassword = window.prompt("비밀번호를 입력해 주세요.");

      if (promptPassword) {
        const writeTitleData = getValues("writeTitle"); // useForm의 writeTitle 데이터를 가져옴
        const writeContentsData = getValues("writeContents"); // useForm의 writeTitle 데이터를 가져옴

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
            ...(FETCH_BOARD
              ? [{ query: FETCH_BOARD, variables: { boardId: params.boardId } }]
              : []),
          ],
        });
        // console.log(result);
        alert(`게시글이 수정되었습니다.`);
        router.push(`/boards/${result.data.updateBoard._id}`);
      } else {
        alert("비밀번호가 틀려서 수정할 수 없습니다.");
        return;
      }
    } catch (error) {
      if (error instanceof Error && "graphQLErrors" in error) {
        const graphQLError = error as { graphQLErrors: { message: string }[] };
        alert(`${graphQLError.graphQLErrors[0].message}`);
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  // !게시글 등록 함수
  const onBoardNew = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const {
        writeName,
        writeAddress,
        writePassword,
        writeTitle,
        youtubeUrl,
        writeAddressPost,
        writeAddressDetail,
      } = getValues(); // useForm의 모든 데이터를 가져옴

      const writeVariables = {
        createBoardInput: {
          writer: writeName,
          password: writePassword,
          title: writeTitle,
          contents: getValues("writeContents"),
          youtubeUrl: youtubeUrl as URL,
          boardAddress: {
            zipcode: writeAddressPost,
            address: writeAddress,
            addressDetail: writeAddressDetail,
          },
          images: "",
        },
      };

      // console.log(writeVariables);

      const result = await boardControl({ variables: writeVariables });
      // console.log(result);

      alert(`게시글이 등록되었습니다.`);
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      alert(`게시글 등록에 실패했습니다.`);
      console.log(error);
    }
  };

  const regexPattern = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    password: /(?=.*\d)(?=.*[a-z]).{8,}/, // 8자 이상, 영문, 숫자포함
    phone: /^\d{3}-\d{3,4}-\d{4}$/,
    url: /^http[s]?:\/\/([\S]{3,})/i,
    youtube: /^https?:\/\/(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
  };

  const formResister: IformResister = {
    writeName: {
      required: "필수 입력 사항입니다.",
      maxLength: {
        value: 10,
        message: "작성자명은 10자 이내로 입력해 주세요.",
      },
    },
    writePassword: {
      required: "필수 입력 사항입니다.",
      pattern: {
        value: regexPattern.password,
        message: "비밀번호는 8자 이상, 숫자와 영문자를 포함해야 합니다.",
      },
      minLength: {
        value: 8,
        message: "비밀번호는 8자 이상으로 입력해 주세요.",
      },
    },
    writeTitle: {
      required: "필수 입력 사항입니다.",
      maxLength: {
        value: 20,
        message: "제목은 20자 이내로 입력해 주세요.",
      },
    },
    writeContents: {
      required: "필수 입력 사항입니다.",
      maxLength: {
        value: 300,
        message: "내용은 300자 이내로 입력해 주세요.",
      },
    },
    writeAddress: {},
    youtubeUrl: {
      pattern: {
        value: regexPattern.youtube,
        message: "유투브 URL 형식을 확인해 주세요.",
      },
    },
    imgFile1: {},
    imgFile2: {},
    imgFile3: {},
    email: {
      pattern: {
        value: regexPattern.email,
        message: "이메일 형식을 확인해 주세요.",
      },
    },
    phone: {
      pattern: {
        value: regexPattern.phone,
        message: "휴대폰 번호 형식을 확인해 주세요.",
      },
    },
    userId: {
      required: "필수 입력 사항입니다.",
      maxLength: {
        value: 20,
        message: "아이디는 20자 이내로 입력해 주세요.",
      },
    },
  };

  return {
    onBoardEdit,
    onBoardNew,
    control,
    register,
    setValue,
    errors,
    isValid,
    isDirty,
    dirtyFields,
    data,
    formResister,
    Controller,
    router,
    params,
  };
};
