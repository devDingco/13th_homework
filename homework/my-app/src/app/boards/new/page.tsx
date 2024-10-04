'use client'
import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import BoardsWrite from '@/components/boards-write'


const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
    _id
    writer
    title
    contents
    youtubeUrl
    likeCount
    dislikeCount
    images
    boardAddress {
      zipcode
      address
      addressDetail
    }
    user {
      _id
      name
      email
    }
    createdAt
    updatedAt
    deletedAt
  }
}

`;

const BoardsNew = () => {

  return <BoardsWrite isEdit={false}/>

}

export default BoardsNew
