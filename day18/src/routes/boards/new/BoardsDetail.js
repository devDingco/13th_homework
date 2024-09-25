import React from "react";
import "./BoardsDetail.css";
import img from "../../../../src/asset/img.png";
import Beachside from "../../../../src/asset/Tranquil Beachside Serenity 1.png";
import Frame from "../../../../src/asset/Frame 427323299.png";
import bad from "../../../../src/asset/bad area.png";
import good from "../../../../src/asset/good area.png";
import button from "../../../../src/asset/button.svg";
import edit from "../../../../src/asset/edit.svg";
import link_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24 from "../../../../src/asset/link_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24.svg";
import location_on_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24 from "../../../../src/asset/location_on_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24.svg";

function BoardsDetail() {
	return (
		<div className="wrapper">
			<div className="container">
				<div className="title">
					살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
					쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
				</div>
				<div className="write">
					<div className="writer">
						<img className="profile" src={img} />
						<div className="name">홍길동</div>
					</div>
					<div className="date">2024.11.11</div>
				</div>
				<div className="line"></div>
				<div className="share">
					<img src={link_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24} />
					<img src={location_on_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24} />
				</div>
				<img className="photo" src={Beachside} />
				<div className="poem">
					살겠노라 살겠노라. 청산에 살겠노라.
					<br />
					머루랑 다래를 먹고 청산에 살겠노라.
					<br />
					얄리얄리 얄랑셩 얄라리 얄라
					<br />
					<br />
					우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
					<br />
					너보다 시름 많은 나도 자고 일어나 우노라.
					<br />
					얄리얄리 얄랑셩 얄라리 얄라
					<br />
					<br />
					갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
					<br />
					이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
					<br />
					얄리얄리 얄랑셩 얄라리 얄라
					<br />
					<br />
					이럭저럭 하여 낮일랑 지내 왔건만
					<br />올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
					<br />
					얄리얄리 얄랑셩 얄라리 얄라
					<br />
					<br />
					어디다 던지는 돌인가
					<br />
					누구를 맞히려던 돌인가.
					<br />
					미워할 이도 사랑할 이도 없이 맞아서 우노라.
					<br />
					얄리얄리 얄랑셩 얄라리 얄라
					<br />
					<br />
					살겠노라 살겠노라. 바다에 살겠노라.
					<br />
					나문재, 굴, 조개를 먹고 바다에 살겠노라.
					<br />
					얄리얄리 얄랑셩 얄라리 얄라
					<br />
					<br />
					가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
					<br />
					사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
					<br />
					얄리얄리 얄랑셩 얄라리 얄라
					<br />
					<br />
					가다 보니 배불룩한 술독에 독한 술을 빚는구나.
					<br />
					조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
					<br />
					얄리얄리 얄라셩 얄라리 얄라
				</div>
				<img className="video" src={Frame} />
				<div className="reaction">
					<img src={bad} />
					<img src={good} />
				</div>
				<div className="button">
					<img className="list" src={button} />
					<img className="edit" src={edit} />
				</div>
			</div>
		</div>
	);
}

export default BoardsDetail;
