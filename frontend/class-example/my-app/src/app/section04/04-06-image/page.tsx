'use client'

import Image from 'next/image'
import styles from './styles.module.css'

export default function ImagePage() {

    return(
        <>
            {/* 이미지 고전 방식 */}
            <img src='/images/img.jpeg' alt="강아지이미지" className={styles.이미지를보여주자}/>

            {/* 이미지 Next 방식 
            사용방법; css에서 지정한거와는 별개로 width,height,sizes를 지정해줘야함
            auto값은 사용할 수 없기때문에 css에 값을 쓰고싶다면 0이라고 명시해줌
            
            고전방식보다 쓰기엔 번거로울 순 있으나 최적화가 잘되어있음
            (layload - 화면에 나오지않는 이미지는 굳이 로딩하지않음 / 화면사이즈 별로 이미지 크기를 맞게 로딩함(.next - cache - images폴더에서 확인가능))
            */}
            <Image
                src='/images/img.jpeg'
                alt="강아지이미지"
                className={styles.이미지를보여주자}
                width={0}
                height={0}
                sizes='100vw'
            />

        </>
    );
}