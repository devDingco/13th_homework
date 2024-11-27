export default function RatioScalingPage() {

    // 1. 피그마에 제시된 사이즈가 (360 * 840) 이라고 가정
    // => 하지만, 아래 화면은 비율이 늘어지 않음(픽셀로 고정해두었기 때문)
    // return(
    //     <div style={{width:"100vw", height:"100vh", backgroundColor:"yellow"}}>
    //         <div style={{width:"300px", height:"400px", backgroundColor:"red"}}>네모상자</div>
    //     </div>
    // )

    // 2. 비율늘리기
    // => px 방식을 rem으로 변경(html 폰트사이즈에 의존)
    // => 해야할일: 1. html 폰트 사이즈를 화면사이즈에 비례하도록 변경
    //            2. 모든 컴포넌트 단위를 rem으로 적용
    return(
        <div style={{width:"100vw", height:"100vh", backgroundColor:"yellow"}}>
             <div style={{width:"18.75rem", height:"25rem", backgroundColor:"red"}}>네모상자</div>
        </div>
    )
}