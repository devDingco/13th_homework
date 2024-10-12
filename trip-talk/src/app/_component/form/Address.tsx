'use client';

import useModalStore from '@/app/_store/useModalStore';
import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

export default function Address(setA: any) {
  const { closeModal } = useModalStore();
  return (
    <DaumPostcodeEmbed
      onComplete={(result) => {
        console.log('왜 다시 안됨?');
        setA(result);
        closeModal();
      }}
      onClose={() => {
        closeModal();
      }}
    />
  );
}
