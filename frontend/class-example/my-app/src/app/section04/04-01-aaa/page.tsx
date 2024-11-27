import Link from "next/link"


const Aaa = () => {

  return (
    <div>
        <div>Aaa 페이지 입니다.</div>
        <Link href="/section04/04-01-bbb">Bbb 페이지로 이동</Link>

        <a href='/bbb'>Bbb 페이지로 이동</a>
    </div>
  )
}

export default Aaa
