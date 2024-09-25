"use client";
import React, { useState} from 'react';
import formStyles from './ui/form.module.css';

interface FormData {
    name: string;
    pw: string;
    title: string;
    content: string;
}

interface FormError {
    name: string;
    pw: string;
    title: string;
    content: string;
}
const FormComponent: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        pw: '',
        title: '',
        content: ''
    });

    const [formError, setFormError] = useState<FormError>({
        name: '',
        pw: '',
        title: '',
        content: ''
    });

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setFormError({
            ...formError,
            [name]: ""
        });
    };

    let hasError = false;
    const handleSubmit = (e: React.FormEvent):void => {
        e.preventDefault();
        const newError:FormError = {
            name: '',
            pw: '',
            title: '',
            content: ''
        };
        
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof FormData].trim()) {
                newError[key as keyof FormData] = "필수입력사항입니다";
                hasError = true;
            }
        });

        setFormError(newError);

        if (!hasError) {
            alert("제출되었습니다");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <ul className="mt-40 list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <div className="flex space-x-4">
                    <li className="flex-1 p-2">작성자<code className="text-red-600">*</code>
                        <input name="name" value={formData.name} onChange={handleInputChange} className="container rounded max-w-screen-xl border" type="text" placeholder='작성자명을 입력해 주세요.' />
                        {(formData.name === '') && <code className="text-red-600">필수입력 사항입니다</code>}
                    </li>
                    <li className="flex-1 p-2">비밀번호<code className="text-red-600">*</code>
                        <input name="pw" value={formData.pw} onChange={handleInputChange} className="container rounded max-w-screen-xl border" type="password" placeholder='비밀번호를 입력해 주세요.' />
                        {(formData.pw === '') && <code className="text-red-600">필수입력 사항입니다</code>}
                    </li>
                </div>
                <hr className="mb-2 mt-6" />
                <li className="flex-1 p-2">제목<code className="text-red-600">*</code>
                    <input name="title" value={formData.title} onChange={handleInputChange} className="container rounded max-w-screen-xl border" type="text" placeholder='제목을 입력해 주세요.' />
                    {(formData.title === '') && <code className="text-red-600">필수입력 사항입니다</code>}
                </li>
                <li className="flex-1 p-2">내용<code className="text-red-600">*</code>
                    <textarea name="content" value={formData.content} onChange={handleInputChange} className="container rounded max-w-screen-xl h-24 border" placeholder='내용을 입력해 주세요.'></textarea>
                    {(formData.content === '') && <code className="text-red-600">필수입력 사항입니다</code>}
                </li>
            </ul>
            <div className="flex justify-end gap-2 p-2">
                <button className="text-black bg-white rounded px-4 py-2" type="submit">취소</button>
                <button className="text-white bg-blue-500 rounded px-4 py-2" type="submit">등록하기</button>
            </div>
        </form>
    );
}

export default FormComponent;