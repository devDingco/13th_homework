'use client'
import { useRouter } from "next/navigation"


export const useLoginCheck = () => {
    const router = useRouter()

    const loginCheck = () => {
        //1. 로그인체크
        //..
        //2. 실패하면?
        alert("로그인 해주세요")
        router.push("/section08/08-06-custom-hook-login")
    }

    return {
        loginCheck
    }

}