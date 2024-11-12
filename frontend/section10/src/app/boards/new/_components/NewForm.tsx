"use client";

import React, { useEffect, useRef, useState } from "react";

import NewFormText from "./NewFormText";
import NewFormPhoto from "./NewFormPhoto";
import NewFormButton from "./NewFormButton";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/commons/graphql/graphql";
import { Button } from "@/components/ui/button";
import NewFormAddressModal from "./NewFormAddressModal";
import { useToast } from "@/components/hooks/use-toast";

export default function NewForm({ isEdit }: INewFormProps) {
  const { toast } = useToast();

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const router = useRouter();
  const params = useParams();

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId as string },
    skip: !isEdit,
  });

  const [inputValue, setInputValue] = useState<IInputValue>(
    isEdit
      ? {
          author: data?.fetchBoard.writer,
          password: String(sessionStorage.getItem("password")),
          title: data?.fetchBoard.title,
          content: data?.fetchBoard.contents,
          youtube: data?.fetchBoard.youtubeUrl,
        }
      : {
          author: "",
          password: "",
          title: "",
          content: "",
          youtube: "",
        }
  );
  console.log("😎", inputValue);

  const [inputAddress, setInputAddress] = useState(
    isEdit
      ? {
          zipcode: data?.fetchBoard.boardAddress.zipcode,
          address: data?.fetchBoard.boardAddress.address,
          addressDetail: data?.fetchBoard.boardAddress.addressDetail,
        }
      : {
          zipcode: "",
          address: "",
          addressDetail: "",
        }
  );
  console.log("🥞", inputAddress);

  // NOTE : 여기
  const [showAddressModal, setShowAddressModal] = useState(false);
  const handleAddressModal = () => [
    // set
    setShowAddressModal((prev) => !prev),
  ];

  const onChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  const onChangeInputAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  const handleAddressSelect = (selectedAddress) => {
    console.log(selectedAddress);
    setInputAddress((prev) => ({
      ...prev,
      zipcode: selectedAddress.zipcode,
      address: selectedAddress.fullAddress,
    }));
  };

  const disabled: boolean =
    inputValue.author &&
    inputValue.password &&
    inputValue.title &&
    inputValue.content
      ? false
      : true;

  const onClickSubmit = async () => {
    try {
      console.log("GraphQL 쿼리 실행");
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: inputValue.author,
            title: String(inputValue.title),
            password: inputValue.password,
            contents: String(inputValue.content),
            boardAddress: inputAddress,
            youtubeUrl: inputValue.youtube,
          },
        },
      });
      console.log("등록성공:", result.data);
      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      console.error("GraphQL 요청 오류:", error);
    }
  };

  const onClickUpdate = async () => {
    const updateInput = {};
    if (!updateInput.boardAddress) {
      updateInput.boardAddress = {}; // boardAddress가 없으면 빈 객체로 초기화
    }
    if (
      inputValue.title?.trim() &&
      inputValue.title !== data?.fetchBoard?.title
    ) {
      updateInput.title = inputValue.title;
    }
    if (
      inputValue.content?.trim() &&
      inputValue.content !== data?.fetchBoard?.contents
    ) {
      updateInput.contents = inputValue.content;
    }
    if (
      inputValue.youtube?.trim() &&
      inputValue.youtube !== data?.fetchBoard?.youtubeUrl
    ) {
      updateInput.youtubeUrl = inputValue.youtube;
    }
    if (inputAddress.zipcode !== data?.fetchBoard?.boardAddress?.zipcode) {
      updateInput.boardAddress.zipcode = inputAddress.zipcode;
      updateInput.boardAddress.address = inputAddress.address;
    }
    if (
      inputAddress.addressDetail?.trim() &&
      data?.fetchBoard?.boardAddress?.addressDetail
    ) {
      updateInput.boardAddress.addressDetail = inputAddress.addressDetail;
    }
    console.log(updateInput.boardAddress);
    if (Object.keys(updateInput).length > 0) {
      console.log("수정된 항목만 날아가고있나? ::: updateInput", updateInput);
      try {
        const result = await updateBoard({
          variables: {
            updateBoardInput: updateInput,
            password: inputValue.password,
            boardId: params.boardId as string,
          },
        });

        if (result.data) {
          console.log("기존의 글을 수정하는 경우:::", result);
          toast({
            description: "게시글이 성공적으로 수정되었습니다!",
          });
          // alert("게시글이 성공적으로 수정되었습니다!");
        } else {
          toast({
            description: "수정에 실패했습니다.",
            variant: "destructive",
          });
          // alert("수정에 실패했습니다.");
        }
        // 수정이 완료되면 상세 화면으로 이동하기
        router.push(`/boards/${params.boardId}`);
      } catch (error) {
        console.error("GraphQL 요청 오류:", error);
      }
    } else {
      alert("수정된 내용이 없습니다.");
    }
  };

  return (
    <>
      <NewFormAddressModal
        open={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onAddressSelect={handleAddressSelect}
      />
      <div className="flex flex-col gap-10 py-10">
        <div className="prose-b_20_28">
          {!isEdit ? "게시물 등록" : "게시물 수정"}
        </div>
        <div className="input-area">
          <div className="id-pw-area">
            <NewFormText
              title={"author"}
              value={`${inputValue.author}`}
              onChange={onChangeInputValue}
              disabled={isEdit && true}
            />
            <NewFormText
              title={"password"}
              value={inputValue.password}
              onChange={onChangeInputValue}
              disabled={isEdit && true}
            />
          </div>
          <NewFormText
            title={"title"}
            value={inputValue.title}
            onChange={onChangeInputValue}
          />
          <NewFormText
            title={"content"}
            value={inputValue.content}
            onChange={onChangeInputValue}
          />
          <div>
            {/* NOTE: 여기 */}
            <div className="flex justify-start items-end gap-2">
              <NewFormText
                title={"addressNum"}
                value={inputAddress.zipcode}
                disabled={inputAddress.zipcode && true}
              />
              <Button variant={"outlined"} onClick={handleAddressModal}>
                우편번호 검색
              </Button>
            </div>
            <NewFormText
              title={"addressInput"}
              value={inputAddress.address}
              disabled={inputAddress.address && true}
            />
            <NewFormText
              title={"addressDetail"}
              value={inputAddress.addressDetail}
              onChange={onChangeInputAddress}
            />
          </div>

          <NewFormText
            title={"youtube"}
            value={inputValue.youtube}
            onChange={onChangeInputValue}
          />
          <hr />
          <NewFormPhoto title={"photo"} />
        </div>

        <div className="button-area">
          <NewFormButton value={"cancel"} />
          <NewFormButton
            value={isEdit ? "edit" : "register"}
            disabled={disabled}
            onClick={isEdit ? onClickUpdate : onClickSubmit}
          />
        </div>
      </div>
    </>
  );
}
