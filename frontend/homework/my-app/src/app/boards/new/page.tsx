"use client";
import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import BoardsWrite from "@/components/boards-write";
import { loginCheck } from "@/commons/hocs/login-check";

const BoardsNew = () => {
  return <BoardsWrite isEdit={false} />;
};

export default loginCheck(BoardsNew);
