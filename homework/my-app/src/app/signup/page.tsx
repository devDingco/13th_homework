"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import Modal from "antd/lib/modal/Modal";
import { gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { loginCheck } from "@/commons/hocs/login-check";

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(
      createUserInput: { name: $name, email: $email, password: $password }
    ) {
      _id
    }
  }
`;

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [createUser] = useMutation(CREATE_USER);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirm(e.target.value);

  const onSubmit = async () => {
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUser({
        variables: { name, email, password },
      });
      setIsModalVisible(true); // 회원가입 성공 모달 띄우기
    } catch (error) {
      alert(error.message);
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    router.push("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="signupContainer">
      <h2>Sign Up</h2>

      <div className="inputGroup">
        <label>Email</label>
        <input type="email" value={email} onChange={onChangeEmail} />
      </div>

      <div className="inputGroup">
        <label>Name</label>
        <input type="text" value={name} onChange={onChangeName} />
      </div>

      <div className="inputGroup">
        <label>Password</label>
        <input type="password" value={password} onChange={onChangePassword} />
      </div>

      <div className="inputGroup">
        <label>Confirm Password</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
        />
      </div>

      <button className="signupButton" onClick={onSubmit}>
        Sign Up
      </button>

      <Modal
        title="Sign Up Successful"
        visible={isModalVisible}
        onOk={handleModalOk}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>You have successfully signed up!</p>
      </Modal>
    </div>
  );
};

export default SignupPage;
