'use client';

import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/app/_api/firebase/firebase';
import { CheckSquareOutlined } from '@ant-design/icons';
import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../_component/form/Input';
import Textarea from '../_component/form/Textarea';
import Button from '../_component/form/Button';
import { Card } from 'antd';

export default function FirebasePage() {
  const [data, setData] = useState<any>();

  const onClickSubmit = async () => {
    const myBoard = collection(getFirestore(firebaseApp), 'myBoard');
    await addDoc(myBoard, {
      writer: '준수',
      title: '안녕하세요',
      contents: '반갑습니다.',
    });
  };

  const onClickFetch = async () => {};

  useEffect(() => {
    (async () => {
      const myBoard = collection(getFirestore(firebaseApp), 'myBoard');
      const result = await getDocs(myBoard);
      const datas = result.docs.map((el) => el.data());

      setData(datas);
      console.log(datas);
    })();
  }, []);
  return (
    <div className="w-full">
      <h2 className="flex justify-center items-center gap-2 text-[1.5rem]">
        <CheckSquareOutlined />
        <span>TODO</span>
        <CheckSquareOutlined />
      </h2>
      <div className=" flex justify-center gap-2">
        <Input
          type="text"
          id={''}
          onChangeFnc={function (
            name: string,
            e: ChangeEvent<HTMLInputElement>,
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
        <Input
          type="text"
          id={''}
          onChangeFnc={function (
            name: string,
            e: ChangeEvent<HTMLInputElement>,
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
        <Input
          type="text"
          id={''}
          onChangeFnc={function (
            name: string,
            e: ChangeEvent<HTMLInputElement>,
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      <div className="flex justify-end pt-2">
        <Button style="default" onClickFnc={onClickSubmit}>
          등록하기
        </Button>
      </div>
      <ul className="grid grid-cols-3">
        {data?.map((el: any, i: number) => (
          <Card key={i}>
            <p>{el.writer}</p>
            <p>{el.title}</p>
            <p>{el.contents}</p>
          </Card>
        ))}
      </ul>
    </div>
  );
}
