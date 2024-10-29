import { useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Input, Tag, Tooltip } from "antd";
import styles from "./index.module.scss";
import { ItagInputProps } from "./types";

const TagInput: React.FC<ItagInputProps> = (props) => {
  const { title, required } = props;
  const [tags, setTags] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [InputVisible, setInputVisible] = useState(true);
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    setTimeout(() => {
      // 한글의 경우 두번 입력되는 문제 해결위해서 setTimeout 사용
      if (inputValue && !tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
      }
      setInputValue("");
    }, 100);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  return (
    <label className="flex flex-col gap-2">
      <div className="flex gap-1">
        {title}
        {required && <span className="text-red-500">*</span>}
      </div>
      <div className="flex gap-1 border border-gray-200 rounded-lg items-center px-4 py-3">
        {tags.map<React.ReactNode>((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                value={editInputValue}
                onChange={handleEditInputChange}
                onPressEnter={handleEditInputConfirm}
                style={{ width: "auto" }}
              />
            );
          }
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable={true}
              style={{
                userSelect: "none",
                display: "flex",
                alignItems: "center",
              }}
              onClose={() => handleClose(tag)}
            >
              <span
                className="text-base"
                onDoubleClick={(e) => {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {InputVisible && (
          <Input
            id={styles.tagInput}
            ref={inputRef}
            type="text"
            size="large"
            value={inputValue}
            onChange={handleInputChange}
            onPressEnter={handleInputConfirm}
            placeholder={tags.length === 0 ? "태그를 입력해 주세요." : ""}
          />
        )}
      </div>
    </label>
  );
};

export default TagInput;
