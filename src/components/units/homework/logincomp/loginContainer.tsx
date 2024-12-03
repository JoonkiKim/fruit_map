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
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../../commons/types/generated/types";
import { useRecoilState } from "recoil";
import { accessTokenState, loggedInCheck } from "../../../../commons/stores";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
// import { useEffect } from "react";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const schema = yup.object({
  email: yup
    .string()
    .email("이메일 형식에 적합하지 않습니다")
    .required("이메일은 필수입력입니다."),

  password: yup
    .string()
    .min(6, "비밀번호는 최소 6자리 이상 입력해주세요")
    .max(15, "비밀번호는 최대 15자리로 입력해주세요")
    .required("비밀번호는 필수 입력입니다. "),
});

type IFormData = yup.InferType<typeof schema>;

export default function LoginContainer() {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const router = useRouter();

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const [, setIsLoggedIn] = useRecoilState(loggedInCheck);

  // data: IFormData를 통해 data를 인자로 받아줘야 된다!!!!
  const onClickLogin = async (data: IFormData): Promise<void> => {
    try {
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      const accessToken = result.data?.loginUser.accessToken;

      if (accessToken === undefined) {
        alert("로그인에 실패했습니다. 다시 시도해주세요(로그인 페이지 에러)");
        return;
      }
      setAccessToken(accessToken);
      // localStorage.setItem("accessToken", accessToken);
      // 글로벌스테이트를 여기서 true로 바꿔주면 헤더 부분이 유저 정보로 바뀐다

      setIsLoggedIn(true);

      // 새로고침해야지만 로그인이 된거로 판정되길래 그냥 새로고침을 해줬다
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // 이동이 안되는 문제 해결을 위해 useEffect사용
  useEffect(() => {
    if (accessToken) {
      router.push("/mypage");
    }
  }, [accessToken]);

  const moveToRegister = () => {
    router.push("/register");
  };

  return (
    <>
      {/* form을 로그인, 회원가입에 사용할때는 onSubmit을 쓰자 */}
      <form onSubmit={handleSubmit(onClickLogin)}>
        <LoginWrapper>
          <LoginTitleWrapper>로그인</LoginTitleWrapper>
          <EmailWrapper>
            <LoginInput type="email" {...register("email")} />{" "}
            <LoginErrorMsg>{formState.errors.email?.message}</LoginErrorMsg>
          </EmailWrapper>
          <PasswordWrapper>
            <LoginInput type="password" {...register("password")} />{" "}
            <LoginErrorMsg>{formState.errors.password?.message}</LoginErrorMsg>
          </PasswordWrapper>
          <StayLoginWrapper>
            <StayLoginIcon />

            <StayLogintxt>로그인 상태 유지</StayLogintxt>
          </StayLoginWrapper>
          <LoginBtn type="submit">로그인 하기</LoginBtn>
          <NavigatorWrapper>
            <Navigatortxt>이메일 찾기</Navigatortxt>
            <Navigatortxt>비밀번호 찾기</Navigatortxt>
            <Navigatortxt onClick={moveToRegister}>회원가입</Navigatortxt>
          </NavigatorWrapper>
        </LoginWrapper>
      </form>
    </>
  );
}
