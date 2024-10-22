import Image from "next/image";

export default function DetailFormContent({ value }: IDetailContentProps) {
  const content = `${value}`;
  return (
    <>
      <Image src="/assets/beach.png" alt="beach" width={400} height={0} />
      <div className="whitespace-pre-line">{content}</div>
      <Image
        src="/assets/sofa_video.png"
        alt="sofa"
        width={1280}
        height={0}
        sizes="100vw"
      />
    </>
  );
}
