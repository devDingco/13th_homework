import { CreateBoardDocument, FetchBoardDocument, UpdateBoardDocument } from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { Address } from "react-daum-postcode";
import { IEditinput } from "./types";
import { UPLOAD_FILE } from "./queries";

export const useBoardsWrite = (props: any) => {
  // graphql
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  // youtube
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // address modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [writeAddressData, setWriteAddressData] = useState({});
  const [zonecode, setZoneCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleComplete = (addressData: Address) => {
    console.log(writeAddressData);
    setWriteAddressData(addressData);
    setZoneCode(addressData.zonecode);
    setAddress(addressData.address);
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
  };

  // router
  const router = useRouter();
  const params = useParams();

  const editId = params.boardId;
  console.log('editId',editId);
  

  // 수정페이지에서사용
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(editId) },
    skip: !props.isEdit,
  });
  console.log("---", props.data);

  // state
  const [writer, setWriter] = useState("");
  const [pw, setPw] = useState("");
  const [title, setTitle] = useState(props.isEdit ? data?.fetchBoard?.title : "");
  const [content, setContent] = useState(props.isEdit ? data?.fetchBoard?.contents : "");

  // error state
  const [errorWriter, setErrorWriter] = useState("");
  const [errorPw, setErrorPw] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorContent, setErrorContent] = useState("");

  // active state
  const disabledBtn = !writer.trim() || !pw.trim() || !title?.trim() || !content?.trim();

  // onChange
  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkWriter = event.target.value;
    setWriter(checkWriter);
  };
  const onChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const onChangeYoutube = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onClickSignup = async () => {
    //등록하기
    if (props.isEdit === false) {
      let hasError = false;

      if (writer.trim() === "") {
        setErrorWriter("필수입력 사항입니다.");
        hasError = true;
      } else {
        setErrorWriter("");
      }

      if (pw.length === 0) {
        setErrorPw("필수입력 사항입니다.");
        hasError = true;
      } else {
        setErrorPw("");
      }

      if (title?.trim() === "") {
        setErrorTitle("필수입력 사항입니다.");
        hasError = true;
      } else {
        setErrorTitle("");
      }

      if (content?.trim() === "") {
        setErrorContent("필수입력 사항입니다.");
        hasError = true;
      } else {
        setErrorContent("");
      }

      if (!hasError) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: writer,
              password: pw,
              title: String(title),
              contents: String(content),
              youtubeUrl: youtubeUrl,
              boardAddress: {
                zipcode: zonecode,
                address: address,
                addressDetail: detailAddress,
              },
              images: imageUrls,
            },
          },
        });

        console.log("data", data);
        alert("게시글이 등록되었습니다!");
        router.push(`/boards/${data?.createBoard._id}`);
      }
    }
    // 수정 관련 내용
    else if (props.isEdit === true) {
      if (content?.trim() === "" && title?.trim() === "") {
        setErrorContent("필수입력 사항입니다.");
        setErrorTitle("필수입력 사항입니다.");
        return;
      }
      if (content?.trim() === "") {
        setErrorContent("필수입력 사항입니다.");
        return;
      }
      if (title?.trim() === "") {
        setErrorTitle("필수입력 사항입니다.");
        return;
      }

      // 비밀번호 확인하기
      const myPw = prompt("글을 작성할때 입력하셨던 비밀번호를 입력해주세요");
      const editInput: IEditinput = {};
      if (title?.trim() && title !== data?.fetchBoard?.title) {
        editInput.title = title;
      }

      // 수정기능
      if (content?.trim() && content !== data?.fetchBoard?.contents) {
        editInput.contents = content;
      }
      if (zonecode || address || detailAddress) {
        editInput.boardAddress = {
          zipcode: zonecode !== data?.fetchBoard?.boardAddress?.zipcode ? zonecode : undefined,
          address: address !== data?.fetchBoard?.boardAddress?.address ? address : undefined,
          addressDetail: detailAddress !== data?.fetchBoard?.boardAddress?.addressDetail ? detailAddress : undefined,
        };
      }
      if (youtubeUrl?.trim() && youtubeUrl !== data?.fetchBoard?.youtubeUrl) {
        editInput.youtubeUrl = youtubeUrl;
      }
      if (imageUrls.length > 0 && JSON.stringify(imageUrls) !== JSON.stringify(data?.fetchBoard?.images)) {
        editInput.images = imageUrls;
      }

      // 수정된 값이 있는 항목만 API 요청
      if (Object.keys(editInput).length > 0) {
        console.log(editInput);
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: editInput,
              password: myPw,
              boardId: String(editId),
            },
          });

          if (result.data) {
            console.log("기존의 글을 수정하는 경우:::", result);
            alert("게시글이 성공적으로 수정되었습니다!");
          } else {
            alert("수정에 실패했습니다.");
          }
          // 수정이 완료되면 상세 화면으로 이동하기
          router.push(`/boards/${editId}`);
        } catch (error) {
          // 에러 발생 시 처리
          if (error) {
            console.log(error);
          } else {
            console.error("네트워크에러 발생");
          }
        }
      } else {
        alert("수정된 내용이 없습니다.");
      }
    }
  };

  // 이미지 미리보기
  const [imageUrls, setImageUrls] = useState(props.isEdit ? data?.fetchBoard?.images || ["", "", ""] : ["", "", ""]);

  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const checkValidationFile = (file?: File) => {
    if (!file) {
      alert("파일이 없습니다.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("파일 용량이 너무 큽니다.(제한: 5MB)");
      return false;
    }

    if (!file.type.includes("jpeg") && !file.type.includes("png")) {
      alert("jpeg 또는 png 파일만 업로드 가능합니다.");
      return false;
    }
    return true;
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];

    if (file) {
      const isValid = checkValidationFile(file);
      if (!isValid) return;

      const result = await uploadFile({ variables: { file } });
      setImageUrls((prev) => {
        const newImageUrls = [...prev];
        newImageUrls[index] = result.data.uploadFile.url ?? "";
        return newImageUrls; // URL 변경
      });
    }
  };

  const onClickImage = (index: number): void => {
    fileRefs[index].current?.click();
  };

  return {
    onClickSignup,
    onChangeContent,
    onChangeTitle,
    disabledBtn,
    onChangePw,
    onChangeWriter,
    errorWriter,
    errorPw,
    errorTitle,
    errorContent,
    data,
    showModal,
    isModalOpen,
    handleOk,
    handleCancel,
    handleComplete,
    zonecode,
    address,
    detailAddress,
    onChangeAddress,
    onChangeYoutube,
    imageUrls,
    onChangeFile,
    onClickImage,
    fileRefs,
  };
};
