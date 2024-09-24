import './BoardsDetail.css';
import link from '../../../assets/link.png';
import location from '../../../assets/location.png';
import running from '../../../assets/running.jpg';
import fake_video from '../../../assets/fake_video.png';
import broken_heart from '../../../assets/broken_heart.png';
import heart from '../../../assets/heart.png';
import list from '../../../assets/list.png';
import pen from '../../../assets/pen.png';

const BoardsDetail = () => {
    // 날짜
    const date = new Date();
    const options = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate().toString().padStart(2, '0'),
    };

    const 날짜담는통 = options.year + '.' + options.month + '.' + options.date;

    return (
        <>
            <div className="layout">
                <div className="header">
                    <div className="header-title">
                        응? 무슨 게시글할지 아직모름~~
                    </div>
                    <div className="header-detail">
                        <div className="header-detail-name">장화현</div>
                        <div className="header-detail-date">{날짜담는통}</div>
                    </div>
                </div>

                <hr className="detail-hr" />

                <div className="main">
                    <div className="main-link-location">
                        <img src={link} alt="link"></img>
                        <img src={location} alt="location"></img>
                    </div>

                    <img className="main-photo" src={running}></img>
                </div>
                <div className="video">
                    <img src={fake_video} alt="fake_video"></img>
                </div>
                <div className="video-feedback">
                    <img src={broken_heart}></img>
                    <img src={heart}></img>
                </div>
                <div className="bottom-button">
                    <button className="list-button">
                        <img
                            src={list}
                            alt="list"
                            className="list-img"
                            style={{
                                width: '24px',
                                height: '24px',
                                objectFit: 'cover',
                            }}
                        ></img>
                        목록으로
                    </button>
                    <button className="pen-button">
                        <img
                            src={pen}
                            alt="pen"
                            className="pen-img"
                            style={{
                                width: '24px',
                                height: '24px',
                                objectFit: 'cover',
                            }}
                        ></img>
                        수정하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default BoardsDetail;
