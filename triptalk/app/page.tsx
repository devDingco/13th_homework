import { FormEvent } from 'react';
export default function Home() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await fetch('#', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
    }
    return (
        <form className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <ul className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-2">작성자<code className="text-red-600">*</code>
                    <input type="text" name="name" placeholder='작성자명을 입력해 주세요.' />
                </li>
                <li className="mb-2">비밀번호<code className="text-red-600">*</code>
                    <input type="password" name="pw" placeholder='비밀번호를 입력해 주세요.' />
                </li>
                <hr />
                <li className="mb-2">제목<code className="text-red-600">*</code>
                    <input type="text" name="title" placeholder='제목을 입력해 주세요.' />
                </li>
                <li className="mb-2">내용<code className="text-red-600">*</code>
                    <textarea name="content" placeholder='내용을 입력해 주세요.'></textarea>
                </li>
            </ul>
            <button className="text-white bg-blue-500 rounded" type="submit">등록하기</button>
        </form>
    );
}