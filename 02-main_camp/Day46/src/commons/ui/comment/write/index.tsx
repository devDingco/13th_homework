"use client";

import React from "react";
import { Chat } from "../../icon";
import { TextArea } from "../../input/textarea";
import styles from "./styles.module.css";

import { Button, ButtonSize, ButtonVariant } from "../../button";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface ICommentWriteProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  hiddenLabel?: boolean;
  hiddenCancel?: boolean;
  label?: string;
  placeholder: string;
  buttonText: string;
  handleCancel?: () => void;
  handleSubmit: (data: T) => Promise<void>;
}

export default function CommentWrite<T extends FieldValues>({
  methods,
  hiddenLabel = false,
  hiddenCancel = true,
  label,
  placeholder,
  buttonText,
  handleCancel,
  handleSubmit,
}: ICommentWriteProps<T>) {
  return (
    <FormProvider {...methods}>
      <div className={styles.commentWriting__container}>
        {hiddenLabel === false && (
          <div className={styles.label__container}>
            <Chat />
            <span className={styles.label}>{label}</span>
          </div>
        )}
        <div className={styles.contents__container}>
          <TextArea
            keyName="contents"
            showCount={true}
            placeholder={placeholder}
          />
          <div className={styles.buttons__container}>
            {hiddenCancel === false && (
              <Button
                variant={ButtonVariant.tertiary}
                size={ButtonSize.large}
                label="취소"
                onClick={handleCancel}
              ></Button>
            )}
            <Button
              variant={ButtonVariant.secondary}
              size={ButtonSize.large}
              label={buttonText}
              onClick={methods.handleSubmit(handleSubmit)}
            ></Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
