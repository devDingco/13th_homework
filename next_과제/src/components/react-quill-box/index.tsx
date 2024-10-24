import dynamic from "next/dynamic";
const ReactQuillBox = dynamic(() => import("./reactQuillbox"), { ssr: false });
export default ReactQuillBox;
