"use client";

import { Form, Button, Input } from "antd";
import React, { useEffect } from "react";
import useMyApisWrite from "./hook";
import styles from "./styles.module.css";
import { IMyApisWriteProps } from "./types";

export default function MyApisWrite(props: IMyApisWriteProps) {
  const { isEdit } = props;
  const [form] = Form.useForm();
  const {
    data,
    setData,
    onClickRegist,
    onClickUpdate,
    onChangeUpdateWriter,
    onChangeUpdateTitle,
    onChangeUpdateContents,
    getPrevData,
    onClickCancel,
    isRegistCondition,
  } = useMyApisWrite(form, isEdit);

  useEffect(() => {
    getPrevData();
  }, [isEdit]);

  return (
    <div className={styles.layout}>
      <div className={styles.postTitle}>
        {props.isEdit ? "게시물 수정" : "게시물 등록"}
      </div>
      <div className={styles.part}>
        <div className={styles.group}>
          <Form
            initialValues={data}
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            onFinish={isEdit ? onClickUpdate : onClickRegist} // 수정됨
          >
            <Form.Item
              label="작성자"
              name="writer"
              rules={[
                { required: true, message: "작성자 명을 입력해 주세요." },
              ]}
            >
              <Input
                readOnly={isEdit ? false : true}
                value={data.writer}
                className={styles.writer}
                onChange={(e) => onChangeUpdateWriter(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="제목"
              name="title"
              rules={[{ required: true, message: "제목을 입력해 주세요." }]}
            >
              <Input
                readOnly={isEdit ? false : true}
                value={data.title}
                onChange={(e) => onChangeUpdateTitle(e.target.value)}
                className={styles.title}
              />
            </Form.Item>

            <Form.Item
              label="내용"
              name="contents"
              rules={[{ required: true, message: "내용을 입력해 주세요." }]}
            >
              <Input.TextArea
                readOnly={isEdit ? false : true}
                value={data.contents}
                rows={10}
                className={styles.contents}
                onChange={(e) => onChangeUpdateContents(e.target.value)}
              />
            </Form.Item>

            <div className={styles.buttons}>
              <button
                className={styles.cancel}
                type="button"
                onClick={onClickCancel}
              >
                취소
              </button>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit" // onClick 제거됨
                  style={{
                    backgroundColor: isRegistCondition ? "#2974E5" : "#C7C7C7",
                  }}
                  className={styles.regist}
                >
                  {props.isEdit ? "수정" : "등록"}하기
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className={styles.layout}>
  //       <div className={styles.postTitle}>
  //         {props.isEdit ? "게시물 수정" : "게시물 등록"}
  //       </div>
  //       <div className={styles.part}>
  //         <div className={styles.group}>
  //           <Form
  //             initialValues={data}
  //             form={form}
  //             name="basic"
  //             labelCol={{ span: 8 }}
  //             wrapperCol={{ span: 16 }}
  //             style={{ maxWidth: 600 }}
  //             autoComplete="off"
  //           >
  //             <Form.Item
  //               label="작성자"
  //               name="writer"
  //               rules={[
  //                 { required: true, message: "작성자 명을 입력해 주세요." },
  //               ]}
  //             >
  //               <Input
  //                 readOnly={isEdit ? false : true}
  //                 value={data.writer}
  //                 className={styles.writer}
  //                 onChange={(e) => onChangeUpdateWriter(e.target.value)}
  //               />
  //             </Form.Item>
  //           </Form>
  //         </div>

  //         <div className={styles.part}>
  //           <div className={styles.group}>
  //             <Form.Item
  //               label="제목"
  //               name="title"
  //               rules={[{ required: true, message: "제목을 입력해 주세요." }]}
  //             >
  //               <Input
  //                 readOnly={isEdit ? false : true}
  //                 value={data.title}
  //                 onChange={(e) => onChangeUpdateTitle(e.target.value)}
  //                 className={styles.title}
  //               />
  //             </Form.Item>
  //           </div>
  //         </div>

  //         <div className={styles.content_part}>
  //           <div className={styles.group}>
  //             <Form.Item
  //               label="내용"
  //               name="contents"
  //               rules={[{ required: true, message: "내용을 입력해 주세요." }]}
  //             >
  //               <textarea
  //                 readOnly={isEdit ? false : true}
  //                 value={data.contents}
  //                 rows={10}
  //                 className={styles.contents}
  //                 onChange={(e) => onChangeUpdateContents(e.target.value)}
  //               />
  //             </Form.Item>
  //           </div>
  //         </div>

  //         <div className={styles.buttons}>
  //           <Button
  //             className={styles.cancel}
  //             type="primary"
  //             onClick={onClickCancel}
  //           >
  //             취소
  //           </Button>
  //           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
  //             <Button
  //               type="primary"
  //               htmlType="submit"
  //               onClick={isEdit ? onClickUpdate : onClickRegist}
  //               style={{
  //                 backgroundColor:
  //                   isRegistCondition === true ? "#2974E5" : "#C7C7C7",
  //               }}
  //             >
  //               {props.isEdit ? "수정" : "등록"}하기
  //             </Button>
  //           </Form.Item>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
