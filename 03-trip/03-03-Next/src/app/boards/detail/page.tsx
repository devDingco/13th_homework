const Content = () => {
  return (
    <>
      살겠노라 살겠노라. 청산에 살겠노라. <br />
      머루랑 다래를 먹고 청산에 살겠노라. <br />
      얄리얄리 얄랑셩 얄라리 얄라 <br />
      <br />
      우는구나 우는구나 새야. 자고 일어나 우는구나 새야. <br />
      너보다 시름 많은 나도 자고 일어나 우노라. <br />
      얄리얄리 얄라셩 얄라리 <br />
      <br />
      얄라 갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐 <br />
      이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐. <br />
      얄리얄리 얄라셩 얄라리 얄라 <br />
      <br />
      이럭저럭 하여 낮일랑 지내 왔건만 <br />
      올 이도 갈 이도 없는 밤일랑 또 어찌 할것인가. <br />
      얄리얄리 얄라셩 얄라리 얄라 <br />
      <br />
      어디다 던지는 돌인가 누구를 맞히려던 돌인가. <br />
      미워할 이도 사랑할 이도 없이 맞아서 우노라. <br />
      얄리얄리 얄라셩 얄라리 얄라 <br />
      <br />
      살겠노라 살겠노라. 바다에 살겠노라. <br />
      나문재, 굴, 조개를 먹고 바다에 살겠노라. <br />
      얄리얄리 얄라셩 얄라리 얄라 <br />
      <br />
      가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라. <br />
      사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라. <br />
      얄리얄리 얄라셩 얄라리 얄라 <br />
      <br />
      가다 보니 배불룩한 술독에 독한 술을 빚는구나. <br />
      조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1] <br />
      얄리얄리 얄라셩 얄라리 얄라 <br />
      <br />
    </>
  );
};

const TestComp = () => {
  return (
    <>
      <header>
        <p style={{ fontSize: "20px", padding: "20px 0px" }}>
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
          쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img alt="profile" src="/svg/person.svg" />
            <p>홍길동</p>
          </div>
          <p style={{ fontSize: "14px" }}>2024. 11. 11</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px 0px",
          }}
        >
          <img alt="link" src="/svg/link.svg" />
          <img alt="location" src="/svg/location.svg" />
        </div>
      </header>
      <div style={{ width: "1000px" }}>
        <img alt="mainImg" src="/img/bg01.png" />
        <p
          style={{ whiteSpace: "pre-wrap", width: "500px", margin: "20px 0px" }}
        >
          <Content />
        </p>
        <div
          style={{
            backgroundColor: "#F2F2F2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <img alt="videoImg" src="/img/bg02.png" height={"360px"} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", margin: "20px" }}
          >
            <img alt="bad" src="/svg/bad.svg" />
            <p>24</p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "20px" }}
          >
            <img alt="good" src="/svg/good.svg" />
            <p>12</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "60px",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              border: "1px solid #222",
              borderRadius: "8px",
            }}
          >
            <img alt="list" src="/svg/menu.svg" />
            <p>목록으로</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              border: "1px solid #222",
              borderRadius: "8px",
            }}
          >
            <img alt="edit" src="/svg/edit.svg" />
            <p>수정하기</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestComp;
