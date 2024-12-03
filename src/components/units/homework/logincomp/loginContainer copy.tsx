import { gql, useMutation } from "@apollo/client";
import {
  EmailWrapper,
  LoginBtn,
  LoginErrorMsg,
  LoginInput,
  LoginTitleWrapper,
  LoginWrapper,
  Navigatortxt,
  NavigatorWrapper,
  PasswordWrapper,
  StayLoginIcon,
  StayLogintxt,
  StayLoginWrapper,
} from "./loginStyles";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../../commons/types/generated/types";
import { useRecoilState } from "recoil";
import { accessTokenState, loggedInCheck } from "../../../../commons/stores";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginContainer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailEr, setEmailEr] = useState("");
  const [passwordEr, setPasswordEr] = useState("");

  const [, setIsLoggedIn] = useRecoilState(loggedInCheck);

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onClickLogin = async (): Promise<void> => {
    if (!email) {
      setEmailEr("이메일은 필수 입력입니다.");
    }
    if (!password) {
      setPasswordEr("비밀번호는 필수 입력입니다.");
    }
    if (email && password) {
      try {
        const result = await loginUser({
          variables: {
            email,
            password,
          },
        });

        const accessToken = result.data?.loginUser.accessToken;
        console.log(accessToken);

        if (accessToken === undefined) {
          alert("로그인에 실패했습니다. 다시 시도해주세요");
          return;
        }
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        // 글로벌스테이트를 여기서 true로 바꿔주면 헤더 부분이 유저 정보로 바뀐다
        setIsLoggedIn(true);
        router.push("/mypage");
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  const moveToRegister = () => {
    router.push("/register");
  };

  return (
    <>
      <LoginWrapper>
        <LoginTitleWrapper>로그인</LoginTitleWrapper>
        <EmailWrapper>
          <LoginInput
            type="text"
            onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요"
          />{" "}
          <LoginErrorMsg>{emailEr}</LoginErrorMsg>
        </EmailWrapper>
        <PasswordWrapper>
          <LoginInput
            type="password"
            onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요"
          />{" "}
          <LoginErrorMsg>{passwordEr}</LoginErrorMsg>
        </PasswordWrapper>
        <StayLoginWrapper>
          <StayLoginIcon />

          <StayLogintxt>로그인 상태 유지</StayLogintxt>
        </StayLoginWrapper>
        <LoginBtn onClick={onClickLogin}>로그인 하기</LoginBtn>
        <NavigatorWrapper>
          <Navigatortxt>이메일 찾기</Navigatortxt>
          <Navigatortxt>비밀번호 찾기</Navigatortxt>
          <Navigatortxt onClick={moveToRegister}>회원가입</Navigatortxt>
        </NavigatorWrapper>
      </LoginWrapper>
    </>
  );
}
