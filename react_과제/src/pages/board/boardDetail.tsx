import Main from "layout/main";
import Icon from "components/iconFactory";

const detailData = {
  title: "게시글 제목",
  writeName: "홍길동",
  writeDate: "2023.01.01",
  contentImgUrl: [
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
  ],
  content: `<p>모든 국민은 양심의 자유를 가진다. 사면·감형 및 복권에 관한 사항은 법률로 정한다. 법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은 헌법재판소에 제청하여 그 심판에 의하여 재판한다.</p>

<p>국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다. 가부동수인 때에는 부결된 것으로 본다.</p>

<p>법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다.</p>

<p>대통령으로 선거될 수 있는 자는 국회의원의 피선거권이 있고 선거일 현재 40세에 달하여야 한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다.</p>

<p>대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다.</p>

<p>국회의원은 국회에서 직무상 행한 발언과 표결에 관하여 국회외에서 책임을 지지 아니한다. 대법원과 각급법원의 조직은 법률로 정한다. 국가는 법률이 정하는 바에 의하여 재외국민을 보호할 의무를 진다.</p>

<p>위원은 정당에 가입하거나 정치에 관여할 수 없다. 대통령은 제1항과 제2항의 처분 또는 명령을 한 때에는 지체없이 국회에 보고하여 그 승인을 얻어야 한다.</p>

<p>이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다.</p>

<p>형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는 불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에 의하여 국가에 정당한 보상을 청구할 수 있다.</p>

<p>이 헌법시행 당시에 이 헌법에 의하여 새로 설치될 기관의 권한에 속하는 직무를 행하고 있는 기관은 이 헌법에 의하여 새로운 기관이 설치될 때까지 존속하며 그 직무를 행한다.</p>

<p>의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 사법권은 법관으로 구성된 법원에 속한다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은 사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다.</p>

`,
  youtubeUrl: "https://youtu.be/qIDeEbsCv1k?si=dxwiT6E_MW_MVb0Y",
};

const BoardDetail = () => {
  return (
    <Main>
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl">{detailData.title}</h3>
        <div>
          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1 text-gray-700">
              <span className="bg-gray-300 rounded-full w-6 h-6">
                <Icon icon="mypage" className="fill-gray-500 w-fit" />
              </span>
              {detailData.writeName}
            </div>
            <div>{detailData.writeDate}</div>
          </div>
          <hr className="my-4" />
          <div className="flex gap-2 justify-end">
            <span className="w-6 h-6">
              <Icon icon="link" className="fill-gray-500 w-fit" />
            </span>
            <span className="w-6 h-6">
              <Icon icon="location" className="fill-gray-500 w-fit" />
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          {detailData.contentImgUrl.length > 0 &&
            detailData.contentImgUrl.map((url, index) => (
              <img key={index} src={url} alt="content" className="" />
            ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: detailData.content }}></div>
        <div className="bg-gray-200 py-6">
          <div className="videoContainer max-w-4xl mx-auto">
            <iframe
              title="YouTube video player"
              src={
                detailData.youtubeUrl.includes(".be/")
                  ? `https://www.youtube.com/embed/${
                      detailData.youtubeUrl.split(".be/")[1]
                    }`
                  : detailData.youtubeUrl
              }
            ></iframe>
          </div>
        </div>

        <div className="flex gap-6 justify-center">
          <div className="flex items-center flex-col gap-1">
            <div className="w-6 h-6">
              <Icon icon="bad" className="fill-gray-700 w-fit" />
            </div>
            <div>0</div>
          </div>
          <div className="flex items-center flex-col gap-1">
            <div className="w-6 h-6">
              <Icon icon="good" className="fill-red-600 w-fit" />
            </div>
            <div className="text-red-600">0</div>
          </div>
        </div>

        <div className="flex gap-6 justify-center">
          <button className="btn btn-outline">
            <div className="w-6 h-6">
              <Icon icon="menu" className="fill-current w-fit" />
            </div>
            목록으로
          </button>
          <button className="btn btn-outline">
            <div className="w-6 h-6">
              <Icon icon="edit" className="fill-current w-fit" />
            </div>
            수정하기
          </button>
        </div>
      </div>
    </Main>
  );
};

export default BoardDetail;
