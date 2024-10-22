"use client";

import { useParams, useRouter } from "next/navigation";

import Input from "@/components/Atoms/_Input";
import AddressFieldUI from "@/components/Molecules/_AddrField";

import Image from "next/image";
import profile from "/public/svg/person.svg";
import link from "/public/svg/link.svg";
import location from "/public/svg/location.svg";
import close from "/public/svg/close.svg";
import menu from "/public/svg/menu.svg";
import submit from "/public/svg/submit.svg";
import edit from "/public/svg/edit.svg";

import styles from "./styles.module.css";
import { FrownFilled, HeartFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import YouTube from "react-youtube";

import useUpdate from "@/commons/hooks/useUpdate";
import useDaumPostApi from "@/commons/hooks/useDaumPostApi";
import ImgField from "@/components/Molecules/_ImgField";
import useUploadImg from "@/commons/hooks/useUploadImg";

export default function BoardsDetailUI({ isEdit }: { isEdit: boolean }) {
    const Params = useParams();
    const Router = useRouter();
    const { isModalOpen, addressData, onToggleModal, handleComplete } =
        useDaumPostApi();

    const { imageUrl, onChangeFile } = useUploadImg();

    const { handleChange, handleUpdate, data } = useUpdate({ addressData });

    return (
        <>
            <header className={styles.detail_header}>
                <p className={styles.header_title}>
                    {isEdit ? "게시글 수정" : data?.fetchBoard.title}
                </p>

                <div className={styles.header_info}>
                    <div className={styles.info_profile}>
                        <Image src={profile} alt="profile" />
                        <p className={isEdit ? styles.profile_text : ""}>
                            {data?.fetchBoard.writer}
                        </p>
                    </div>
                    <div>
                        <p className={isEdit ? styles.date_text : ""}>
                            {isEdit
                                ? "**비밀번호**"
                                : data?.fetchBoard.updatedAt.split("T")[0]}
                        </p>
                    </div>
                </div>

                <div className={styles.info_link}>
                    <Image src={link} alt="share" />
                    <Tooltip
                        title={data?.fetchBoard.boardAddress?.address}
                        color="#FFBE98"
                    >
                        <Image src={location} alt="location" />
                    </Tooltip>
                </div>
            </header>

            <section className={styles.detail_main}>
                <Image
                    src={`https://storage.googleapis.com/${data?.fetchBoard.images}`}
                    alt="thumbnail"
                    width={400}
                    height={500}
                />

                <pre className={styles.main_content}>
                    {isEdit ? "" : data?.fetchBoard.contents}
                </pre>

                {isEdit && (
                    <>
                        <Input
                            id="title_ID"
                            value={data?.fetchBoard.title}
                            onChange={handleChange}
                        />
                        <Input
                            id="content_ID"
                            value={data?.fetchBoard.contents}
                            onChange={handleChange}
                            textarea
                        />
                    </>
                )}

                <div className={styles.main_video}>
                    {isEdit ? (
                        <>
                            <div style={{ width: "40rem" }}>
                                <AddressFieldUI
                                    onChange={handleChange}
                                    isModalOpen={isModalOpen}
                                    addressData={addressData}
                                    onToggleModal={onToggleModal}
                                    handleComplete={handleComplete}
                                    data={data}
                                    isEdit={true}
                                />
                                <Input
                                    id="link_ID"
                                    value={data?.fetchBoard.youtubeUrl}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <ImgField
                                    imageUrl={imageUrl}
                                    onChange={onChangeFile}
                                />
                            </div>
                        </>
                    ) : (
                        <YouTube videoId="e7g54ZvcKDI" />
                    )}
                </div>

                <div className={styles.main_recommend}>
                    <div className={styles.recommend_bad}>
                        <FrownFilled />
                        <p>1</p>
                    </div>
                    <div className={styles.recommend_good}>
                        <HeartFilled style={{ color: "#f55" }} />
                        <p>2</p>
                    </div>
                </div>

                <div className={styles.main_btn}>
                    <div
                        className={styles.btn_list}
                        onClick={
                            isEdit
                                ? () => Router.push(`/boards/${Params.boardId}`)
                                : () => Router.push(`/boards`)
                        }
                    >
                        {isEdit ? (
                            <Image src={close} alt="close" />
                        ) : (
                            <Image src={menu} alt="menu" />
                        )}
                        <p>{isEdit ? "취소하기" : "목록으로"}</p>
                    </div>
                    <div
                        className={styles.btn_edit}
                        onClick={
                            isEdit
                                ? handleUpdate
                                : () =>
                                      Router.push(
                                          `/boards/${Params.boardId}/edit`
                                      )
                        }
                    >
                        {isEdit ? (
                            <Image src={submit} alt="submit" />
                        ) : (
                            <Image src={edit} alt="edit" />
                        )}
                        <p>{isEdit ? "수정완료" : "수정하기"}</p>
                    </div>
                </div>
            </section>
        </>
    );
}
