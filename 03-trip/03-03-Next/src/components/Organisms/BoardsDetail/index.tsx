"use client";

import { useParams, useRouter } from "next/navigation";

import Input from "@/components/Atoms/_Input";
import AddressFieldUI from "@/components/Molecules/_AddrField";

import Image from "next/image";
import styles from "./styles.module.css";
import { FrownFilled, HeartFilled } from "@ant-design/icons";

import useUpdate from "@/commons/hooks/useUpdate";
import useDaumPostApi from "@/commons/hooks/useDaumPostApi";

export default function BoardsDetailUI({ isEdit }: { isEdit: boolean }) {
    const Params = useParams();
    const Router = useRouter();
    const { isModalOpen, addressData, onToggleModal, handleComplete } =
        useDaumPostApi();
    const { handleChange, handleUpdate, data } = useUpdate({ addressData });

    return (
        <>
            <header className={styles.detail_header}>
                <p className={styles.header_title}>
                    {isEdit ? "게시글 수정" : data?.fetchBoard.title}
                </p>

                <div className={styles.header_info}>
                    <div className={styles.info_profile}>
                        <Image
                            src="/svg/person.svg"
                            alt="profile"
                            width={24}
                            height={24}
                            sizes="100%"
                        />
                        <p className={isEdit ? styles.profile_text : ""}>
                            {data?.fetchBoard.writer}
                        </p>
                    </div>
                    <div>
                        <p className={isEdit ? styles.date_text : ""}>
                            {isEdit
                                ? "**비밀번호**"
                                : data?.fetchBoard.createdAt.split("T")[0]}
                        </p>
                    </div>
                </div>

                <div className={styles.info_link}>
                    <Image
                        src="/svg/link.svg"
                        alt="share"
                        width={24}
                        height={24}
                        sizes="100%"
                    />
                    <Image
                        src="/svg/location.svg"
                        alt="location"
                        width={24}
                        height={24}
                        sizes="100%"
                    />
                </div>
            </header>

            <section className={styles.detail_main}>
                <Image
                    src="/img/bg01.png"
                    alt="thumbnail"
                    width={400}
                    height={500}
                    sizes="100%"
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
                    </>
                )}

                <div className={styles.main_video}>
                    <Image
                        src="/img/bg02.png"
                        alt="video"
                        width={660}
                        height={360}
                        sizes="100%"
                    />
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
                            <Image
                                src="/svg/close.svg"
                                alt="close"
                                width={24}
                                height={24}
                                sizes="100%"
                            />
                        ) : (
                            <Image
                                src="/svg/menu.svg"
                                alt="menu"
                                width={24}
                                height={24}
                                sizes="100%"
                            />
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
                            <Image
                                src="/svg/return.svg"
                                alt="return"
                                width={24}
                                height={24}
                                sizes="100%"
                            />
                        ) : (
                            <Image
                                src="/svg/edit.svg"
                                alt="edit"
                                width={24}
                                height={24}
                                sizes="100%"
                            />
                        )}
                        <p>{isEdit ? "수정완료" : "수정하기"}</p>
                    </div>
                </div>
            </section>
        </>
    );
}
