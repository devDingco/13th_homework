"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
// const apiKey = ""; // OpenWeather API 키 입력

export default function Background({ children }) {
  // 날씨 정보를 저장하는 상태
  const [weatherInfo, setWeatherInfo] = useState<string>("");
  // 배경 이미지 URL을 관리하는 상태
  const [background, setBackground] = useState<string>("default.jpg");

  // 사용자의 현재 위치를 기반으로 날씨를 가져오는 함수
  const getWeatherByLocation = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=08077ca991dee566d895349c1e0253aa&units=metric`
      );
      const weather = response.data.weather[0].main; // 주요 날씨 상태
      console.log(weather);
      setWeatherInfo(`현재 날씨: ${weather}`); // 날씨 정보 업데이트
      setBackground(getBackgroundImage(weather)); // 배경 이미지 업데이트
    } catch (error) {
      setWeatherInfo("날씨 정보를 가져오는 데 실패했습니다."); // 오류 메시지
      console.error(error); // 오류 콘솔 출력
    }
  };
  console.log(background);
  console.log(weatherInfo);

  // 날씨에 따른 배경 이미지 URL을 반환하는 함수
  const getBackgroundImage = (weather: string): string => {
    switch (weather) {
      case "Clear":
        return "/assets/Banner1.png";
      case "Clouds":
        return "Banner2.jpg";
      case "Rain":
        return "Banner3.jpg";
      case "Snow":
        return "Like.jpg";
      default:
        return "Hate.jpg";
    }
  };

  // 컴포넌트가 마운트될 때 사용자 위치를 가져옵니다.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByLocation(latitude, longitude); // 위치 기반 날씨 조회
        },
        (error) => {
          setWeatherInfo("위치 정보를 가져오는 데 실패했습니다."); // 위치 오류 처리
          console.error(error); // 오류 콘솔 출력
        }
      );
    } else {
      setWeatherInfo("이 브라우저는 Geolocation을 지원하지 않습니다."); // 지원하지 않을 경우 메시지
    }
  }, []);

  return (
    <div
      className={styles.css_backlayout}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "1280px 2171px",
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        color: "black",
        // textAlign: "center",
      }}
    >
      <div>
        <div style={{ fontSize: "2em", marginTop: "20px" }}>
          {weatherInfo} {/* 날씨 정보 출력 */}
        </div>
        {children}
      </div>
      {/* <Component {...pageProps} /> */}
    </div>
  );
}
