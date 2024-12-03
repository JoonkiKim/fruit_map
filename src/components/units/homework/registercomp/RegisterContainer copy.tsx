import { ChangeEvent, useState } from "react";
import {
  RegisterBtn,
  RegisterDivWrapper,
  RegisterErrorMsg,
  RegisterInput,
  RegisterInputTitle,
  RegisterTitle,
  RegisterWrapper,
} from "./RegisterStyles";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUserArgs,
} from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";
import { ModalAlert } from "../comment/BoardComment.style";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

export default function RegisterContainer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [emailEr, setEmailEr] = useState("");
  const [nameEr, setNameEr] = useState("");
  const [passwordEr, setPasswordEr] = useState("");
  const [passwordCheckEr, setPasswordCheckEr] = useState("");

  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onChangePasswordCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(event.currentTarget.value);
  };
  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const onClickRegister = async () => {
    if (!email) {
      setEmailEr("이메일은 필수 입력입니다.");
    }
    if (!name) {
      setNameEr("이름은 필수 입력입니다.");
    }

    if (!password) {
      setPasswordEr("비밀번호는 필수 입력입니다.");
    }

    if (!passwordCheck) {
      setPasswordCheckEr("비밀번호는 필수 입력입니다.");
    }

    if (passwordEr !== passwordCheck) {
      setPasswordCheckEr("비밀번호가 일치하지 않습니다");
    }

    if (email && name && password && password === passwordCheck) {
      try {
        const result = await createUser({
          variables: {
            createUserInput: {
              email,
              password,
              name,
            },
          },
        });

        console.log(result);
        setModalMessage("회원가입을 축하합니다!");
        onToggleAlertModal();
      } catch (error) {
        if (error instanceof Error) setModalMessage(String(error));
        onToggleAlertModal();
      }
    }
  };

  const moveToLogin = () => {
    router.push(`/login/`);
  };

  return (
    <>
      <RegisterWrapper>
        <RegisterTitle>회원가입</RegisterTitle>
        <RegisterDivWrapper>
          <RegisterInputTitle>이메일</RegisterInputTitle>
          <RegisterInput
            type="text"
            onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요"
          />
          <RegisterErrorMsg>{emailEr}</RegisterErrorMsg>
        </RegisterDivWrapper>
        <RegisterDivWrapper>
          <RegisterInputTitle>이름</RegisterInputTitle>
          <RegisterInput
            type="text"
            onChange={onChangeName}
            placeholder="이름을 입력해주세요"
          />
          <RegisterErrorMsg>{nameEr}</RegisterErrorMsg>
        </RegisterDivWrapper>
        <RegisterDivWrapper>
          <RegisterInputTitle>비밀번호</RegisterInputTitle>
          <RegisterInput
            type="password"
            onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요"
          />
          <RegisterErrorMsg>{passwordEr}</RegisterErrorMsg>
        </RegisterDivWrapper>
        <RegisterDivWrapper>
          <RegisterInputTitle> 비밀번호 확인 </RegisterInputTitle>

          <RegisterInput
            type="password"
            onChange={onChangePasswordCheck}
            placeholder="비밀번호를 입력해주세요"
          />
          <RegisterErrorMsg>{passwordCheckEr}</RegisterErrorMsg>
        </RegisterDivWrapper>
        <RegisterBtn onClick={onClickRegister}>회원가입하기</RegisterBtn>
      </RegisterWrapper>
      <ModalAlert
        open={isModalAlertOpen}
        onOk={moveToLogin}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <span>{modalMessage}</span>
      </ModalAlert>
    </>
  );
}
