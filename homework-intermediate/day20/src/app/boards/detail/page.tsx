'use client';

import Image from 'next/image';

const BoardsDetail = () => {
  return (
    <div className="flex w-[1920px] py-10 flex-col items-start gap-10">
      <div className="flex px-[320px] flex-col items-center gap-10 self-stretch">
        <div className="flex w-[1280px] flex-col items-start gap-6">
          <div className="text-black font-pretendard text-[28px] font-bold leading-[36px]">
            살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
            쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
          </div>
          <div className="flex items-center justify-between gap-[54px] self-stretch">
            <div className="flex items-center gap-1">
              <Image
                width={0}
                height={0}
                src="/profile_image.png"
                alt="프로필이미지"
              />
              <div>홍길동</div>
            </div>
            <div className="text-[#818181] font-[Pretendard] text-[14px] font-normal leading-[20px]">
              2024.11.11
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#e4e4e4] box-border"></div>
          <div className="w-full flex justify-end gap-2 items-center">
            <Image width={0} height={0} src="/link.png" alt="링크아이콘" />
            <Image width={0} height={0} src="/location.png" alt="위치아이콘" />
          </div>
          <div className="gap-6 flex flex-col">
            <Image
              width={0}
              height={0}
              src="/cheongsan.png"
              alt="청산사진"
              className="w-[480px] h-[531px]"
            />

            <div className="text-black font-[Pretendard] text-[16px] font-normal leading-[24px]">
              <div>살겠노라 살겠노라. 청산에 살겠노라.</div>
              <div>머루랑 다래를 먹고 청산에 살겠노라.</div>
              <div>얄리얄리 얄랑셩 얄라리 얄라</div>
              <div className="h-[20px]"></div>
              <div>우는구나 우는구나 새야. 자고 일어나 우는구나 새야.</div>
              <div>너보다 시름 많은 나도 자고 일어나 우노라.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="h-[20px]"></div>
              <div>
                갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
              </div>
              <div>이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="h-[20px]"></div>
              <div>이럭저럭 하여 낮일랑 지내 왔건만</div>
              <div>올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="h-[20px]"></div>
              <div>어디다 던지는 돌인가 누구를 맞히려던 돌인가.</div>
              <div>미워할 이도 사랑할 이도 없이 맞아서 우노라.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="h-[20px]"></div>
              <div>살겠노라 살겠노라. 바다에 살겠노라.</div>
              <div>나문재, 굴, 조개를 먹고 바다에 살겠노라.</div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="h-[20px]"></div>
              <div>가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.</div>
              <div>
                사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
              </div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
              <div className="h-[20px]"></div>
              <div>가다 보니 배불룩한 술독에 독한 술을 빚는구나.</div>
              <div>
                조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
              </div>
              <div>얄리얄리 얄라셩 얄라리 얄라</div>
            </div>
            <Image width={0} height={0} src="/neotube.png" alt="너튜브사진" />
            <div className="flex justify-center items-center gap-6 self-stretch">
              <div className="flex flex-col items-center justify-center gap-1">
                <Image width={0} height={0} src="/bad.png" alt="싫어요" />
                <div className="text-[#5f5f5f] font-[Pretendard] text-[14px] font-normal leading-[20px]">
                  24
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Image width={0} height={0} src="/good.png" alt="좋아요" />
                <div className="text-[#f66a6a] font-[Pretendard] text-[14px] font-normal leading-[20px]">
                  12
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-6 self-stretch">
              <button className="flex h-[40px] py-2 px-3 items-center gap-2 rounded-[8px] border border-black bg-white">
                <Image
                  width={0}
                  height={0}
                  alt="목록아이콘"
                  src="/hamberger.png"
                />
                <div>목록으로</div>
              </button>
              <button className="flex h-[40px] py-2 px-3 items-center gap-2 rounded-[8px] border border-black bg-white">
                <Image
                  width={0}
                  height={0}
                  alt="수정아이콘"
                  src="/pencil.png"
                />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsDetail;
