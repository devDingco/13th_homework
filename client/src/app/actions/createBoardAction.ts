/** @format */
'use server';
import { IFormState } from '@/models/formBoard';

export async function createBoardAction(
    prevstate: IFormState,
    formData: FormData
): Promise<IFormState> {
    const required = '필수입력 사항입니다.';

    const author = formData.get('Author');
    const password = formData.get('Password');
    const title = formData.get('Title');
    const content = formData.get('Content');

    return {
        errors: {
            author: author ? undefined : required,
            password: password ? undefined : required,
            title: title ? undefined : required,
            content: content ? undefined : required,
        },
    };
}
