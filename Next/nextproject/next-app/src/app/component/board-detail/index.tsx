import styles from "./style.module.css";
import { UseDetailWrite } from "./hook";
import Image from "next/image";
import React from "react";

export default function DetailWrite() {
  const {
    onModify,
    data,
    onList,
    onChangeName,
    name,
    onChangePassword,
    password,
    onChangeComment,
    comment,
  } = UseDetailWrite();
  console.log(data);
  return (
    <div className={styles.css_layout}>
      <div className={styles.css_header}>{data?.fetchBoard.title}</div>
      <div className={styles.css_info}>
        <div className={styles.css_user}>
          <Image
            src="/assets/Profile.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="profile"
            className={styles.css_profileimage}
          />
          <div className={styles.css_name}>{data?.fetchBoard?.writer}</div>
          <div className={styles.css_date}>
            {data?.fetchBoard?.createdAt.split("T")[0]}
          </div>
        </div>
        <div className={styles.css_detailhr}></div>
        <div className={styles.css_side}>
          <div className={styles.css_sidebutton}>
            <div className={styles.css_clip}>
              <Image
                src="/assets/Clip.png"
                width={0}
                height={0}
                sizes="100vw"
                alt="clip"
                className={styles.css_clip}
              />
            </div>
            <div className={styles.css_location}>
              <Image
                src="/assets/Location.png"
                width={0}
                height={0}
                sizes="100vw"
                alt="location"
                className={styles.css_location}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.css_image}>
          <Image
            src="/assets/MainImage.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="mainimage"
            className={styles.css_image}
          />
        </div>
      </div>
      <div className={styles.css_text}>{data?.fetchBoard.contents}</div>
      <div className={styles.css_bottomimage}>
        <Image
          src="/assets/BottomImage.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="bottomimage"
          className={styles.css_bottomimageImage}
        />
      </div>
      <div className={styles.css_heart}>
        <div className={styles.css_hate}>
          <Image
            src="/assets/Hate.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="hate"
            className={styles.css_hate}
          />
          <span>24</span>
        </div>
        <div className={styles.css_like}>
          <Image
            src="/assets/Like.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="like"
            className={styles.css_like}
          />{" "}
          <span>12</span>
        </div>
      </div>
      <div className={styles.css_detailbutton}>
        <button className={styles.css_list}>
          <Image
            src="/assets/List.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="list"
            className={styles.css_listimage}
            onClick={onList}
          />
        </button>
        <button className={styles.css_modify}>
          <Image
            src="/assets/Modify.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="modify"
            className={styles.css_modifyimage}
            onClick={onModify}
          />
        </button>
      </div>
      <div className={styles.css_commentbox}>
        <div className={styles.css_comment}>
          <div className={styles.css_commentheader}>
            <div className={styles.css_commenttag}>댓글</div>
          </div>
          <div className={styles.css_input}>
            <div className={styles.css_inputbox}>
              <div className={styles.css_namebox}>
                <div className={styles.css_namelabel}>작성자</div>
                <input
                  type="text"
                  id="title_id"
                  placeholder="작성자 명을 입력해 주세요."
                  name="title"
                  defaultValue={name}
                  onChange={onChangeName}
                  className={styles.css_nameinput}
                />
              </div>
              <div className={styles.css_namebox}>
                <div className={styles.css_namelabel}>비밀번호</div>
                <input
                  type="text"
                  id="pwd_id"
                  placeholder="비밀번호를 입력해 주세요."
                  name="pwd"
                  defaultValue={password}
                  onChange={onChangePassword}
                  className={styles.css_pwdinput}
                />
              </div>
            </div>
          </div>
          <div className={styles.css_commentinput}>
            <input
              type="comment"
              id="comment_id"
              placeholder="댓글을 입력해 주세요."
              name="comment"
              defaultValue={comment}
              onChange={onChangeComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
