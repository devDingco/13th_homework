export default function DetailContents({ data }) {
  return (
    <div className="w-full py-16 text-[#333333] text-sm font-normal leading-tight whitespace-pre-wrap">
      {data?.fetchSolplaceLog?.contents}
    </div>
  );
}
