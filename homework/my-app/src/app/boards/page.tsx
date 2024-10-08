'use client';

import styles from './style.module.css';
import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import ko from 'date-fns/locale/ko'; 
import 'react-datepicker/dist/react-datepicker.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import BoardList from '@/components/boards-list';









const Page = () => {


  return (
    <BoardList />
  );
};

export default Page;
