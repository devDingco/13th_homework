import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { CREATE_BOARD, FETCH_BOARD, UPDATE_BOARD } from "./queries";
import { IBoardWriteprops } from "./type";
import { Address } from "react-daum-postcode";
import { FetchBoardQuery } from "@/commons/graphql/graphql";

export const useBoardsWrite = (props: IBoardWriteprops) => {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [isAllFilled, setIsAllFilled] = useState(false);

  const [aboutUpLoadBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const router = useRouter();
  const params = useParams(); // useParams() 호출

  const { data, refetch } = useQuery<FetchBoardQuery>(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  const [title, setTitle] = useState(data?.fetchBoard.title || "");
  const [content, setContent] = useState(data?.fetchBoard.contents || "");

  useEffect(() => {
    if (!props.isEdit) return; // isEdit이 false면 실행하지 않음
    const enteredPassword = prompt("비밀번호를 입력하세요");

    if (!enteredPassword) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    const updateBoardFunc = async () => {
      try {
        const result = await updateBoard({
          variables: {
            updateBoardInput: {
              title: title || "", // 제목 수정 여부 체크
              contents: content || "", // 내용 수정 여부 체크
              youtubeUrl: youtubeUrl || "",
              boardAddress: {
                zipcode: zoneCode || "",
                address: address || "",
                addressDetail: addressDetail || "",
              },
              images: [],
            },
            password: enteredPassword,
            boardId: params.boardId,
          },
        });
        setPassword(enteredPassword);
        console.log(result);
      } catch (error: any) {
        console.log(error.message);

        // 에러 메시지에 "비밀번호가 일치하지 않습니다."가 포함되어 있는지 확인
        if (error.message.includes("비밀번호가 일치하지 않습니다.")) {
          alert("비밀번호가 틀렸습니다. 다시 시도해 주세요.");
          router.push("/board"); // 비밀번호가 틀리면 다른 페이지로 리다이렉트
        } else {
          alert("다른 에러가 발생했습니다.");
          router.push("/board");
        }
      }
    };

    updateBoardFunc();
  }, [props.isEdit]);

  useEffect(() => {
    // 수정 모드가 아닌 경우에만 필수 입력사항을 체크하여 버튼 활성화
    if (!props.isEdit) {
      setIsAllFilled(!!(author && password && title && content));
    } else {
      setIsAllFilled(true); // 수정 모드에서는 항상 true로 설정하여 버튼 활성화
    }
  }, [author, password, title, content, props.isEdit]);

  const authorOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const contentOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const youtubeOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const signupButtonHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (props.isEdit) {
      await onClickUpdate(); // 수정하기
    } else {
      await onClickSubmit(); // 새 게시글 등록
    }
  };

  const onClickSubmit = async () => {
    try {
      const result = await aboutUpLoadBoard({
        variables: {
          createBoardInput: {
            writer: author,
            password: password,
            title: title,
            contents: content,
            youtubeUrl: youtubeUrl,
            boardAddress: {
              zipcode: zoneCode,
              address: address,
              addressDetail: addressDetail,
            },
            images: [],
          },
        },
      });
      console.log("result", result);
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      console.log(error);
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  const onClickUpdate = async () => {
    try {
      const updateBoardInput: any = {
        // title, content 수정 안했으면 기존 값 유지, 수정했을 때 지울 수 있도록 빈 값 전달
        title: title !== undefined ? title : data?.fetchBoard.title,
        contents: content !== undefined ? content : data?.fetchBoard.contents,
        youtubeUrl:
          youtubeUrl !== undefined ? youtubeUrl : data?.fetchBoard.youtubeUrl,

        // 주소도 마찬가지로 null이나 빈 값이 올 수 있도록 설정
        boardAddress: {
          zipcode:
            zoneCode !== undefined
              ? zoneCode
              : data?.fetchBoard.boardAddress?.zipcode,
          address:
            address !== undefined
              ? address
              : data?.fetchBoard.boardAddress?.address,
          addressDetail:
            addressDetail !== undefined
              ? addressDetail
              : data?.fetchBoard.boardAddress?.addressDetail,
        },
      };

      const result = await updateBoard({
        variables: {
          boardId: String(params.boardId), // boardId는 별도로 전달
          password: password, // password도 별도로 전달
          updateBoardInput: updateBoardInput, // update할 데이터 전달
        },
      });

      alert("수정이 완료되었습니다.");
      await refetch();

      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error: any) {
      if (error.message.includes("비밀번호가 일치하지 않습니다.")) {
        alert("비밀번호가 틀렸습니다. 다시 시도해 주세요.");
      } else {
        alert("에러가 발생하였습니다. 다시 시도해 주세요.");
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const [zoneCode, setZoneCode] = useState(
    data?.fetchBoard.boardAddress?.zipcode || ""
  );
  const [address, setAddress] = useState(
    data?.fetchBoard.boardAddress?.address || ""
  );
  const [addressDetail, setAddressDetail] = useState(
    data?.fetchBoard.boardAddress?.addressDetail || ""
  );
  const [youtubeUrl, setYoutubeUrl] = useState(
    data?.fetchBoard.youtubeUrl || ""
  );

  const handleComplete = (data: Address) => {
    setZoneCode(data.zonecode); // 우편번호를 상태에 저장

    // 사용자가 선택한 주소 타입에 따라 도로명 주소 또는 지번 주소를 설정
    if (data.userSelectedType === "R") {
      setAddress(data.roadAddress); // 도로명 주소 선택 시
    } else if (data.userSelectedType === "J") {
      setAddress(data.jibunAddress); // 지번 주소 선택 시
    }
    onToggleModal();
  };

  return {
    authorOnChange,
    passwordOnChange,
    titleOnChange,
    contentOnChange,
    signupButtonHandler,
    isAllFilled,
    handleComplete,
    setZoneCode,
    zoneCode,
    onToggleModal,
    isModalOpen,
    address,
    setAddress,
    addressDetail,
    setAddressDetail,
    youtubeOnChange,
    data,
  };
};
