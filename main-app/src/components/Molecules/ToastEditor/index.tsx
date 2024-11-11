import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";

export default function ToastEditorUI() {
    const editorRef = useRef<Editor>(null);

    function onChangeContents() {
        const contents = editorRef.current?.getInstance().getMarkdown();
        console.log(contents);
    }

    return (
        <Editor
            placeholder="내용을 입력해 주세요."
            previewStyle="vertical"
            minHeight="200px"
            initialEditType="wysiwyg"
            hideModeSwitch="true"
            useCommandShortcut={true}
            ref={editorRef}
            onChange={onChangeContents}
        />
    );
}
