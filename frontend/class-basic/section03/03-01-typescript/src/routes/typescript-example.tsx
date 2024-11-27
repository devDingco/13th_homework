import React from 'react'

const TypescriptExample = () => {

    //타입추론
    let aaa = "안녕하세요"
    aaa = 3

    //타입명시
    let bbb:string = "반갑습니다"
    bbb = 10 

    //타입명시가 필요한 상황
    let ccc: number | string = 1000
    ccc = "1000원"

    //숫자타입
    let bbb = 10
    ddd = '철수'

    //불린타입
    let eee = true
    eee = false
    eee = "false" //true로 작동함

    //배열타입
    let fff: number[] = [1,2,3,4,5, "안녕하세요"]
    let ggg: string[] = ["철수", "영희", "훈이", 10]
    let hhh: (string | number)[] = [1,2,3,4,5,"안녕하세요"] //타입을 추론해서 어떤타입인지 역으로 알아내기

    //객체타입
    interface IProfile {
        name: string
        age: number | string
        school: string
        hobby?: string
    }
    const profile: IProfile = {
        name:'철수',
        age: 8,
        school: "다람쥐초등학교"
    }

    profile.name = "훈이"
    profile.age = "9살"
    profile.school = "공룡초등학교"
    profile.hobby = "수영"

    //함수타입 ->어디서 몇번이든 호출가능하므로, 타입추론안됨!(타입을 명시해줘야 함) 함수 괄호 마지막에 명시한 타입은 리턴타입이다 
    function add(num1:number, num2:number, unit:string):string {
        return num1 + num2 + unit
    }
    const result = add(1000,2000,"원")

    const add2 = (num1:number, num2:number, unit:string): string => {
        return num1 + num2 + unit
    }
    const result2 = add(1000,2000,"원")

    //any 타입
    let qqq:any = "철수" //자바스크립트와 동일!
    qqq = 111
    qqq = true





  return (
    <div>
      
    </div>
  )
}

export default TypescriptExample
