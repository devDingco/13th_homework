export default function ImageSlide() {
  return (
    <div className="w-full h-480 relative">
      <div className="w-full h-full bg-purple-300 "></div>
      <span className="absolute bottom-20 right-20 h-20 w-40 px-8 py-4 bg-black/60 rounded-[100px] text-[#f2f2f2] text-[11px] font-medium leading-3 flex justify-center">
        1/6
      </span>
    </div>
  );
}
