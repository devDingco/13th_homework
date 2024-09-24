/** @format */

import { ICreateFormBoard } from '@/models/formBoard';
import axios from 'axios';

export default async function postBoard(data: ICreateFormBoard) {
    const response = await axios.post(
        'http://172.16.2.165:8080/api/board',
        data
    );
    console.log(response);

    return response.data;
}
