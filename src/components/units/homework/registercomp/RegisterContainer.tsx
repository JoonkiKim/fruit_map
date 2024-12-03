import { useState } from "react";
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

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";

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

  name: yup.string().required("이름은 필수입력입니다"),

  // 비밀번호 검증은 passwordConfirm으로 한다
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
    .required("비밀번호는 필수입력입니다."),
});

type IRegisterData = yup.InferType<typeof schema>;

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
  const { register, handleSubmit, formState } = useForm<IRegisterData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();

  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const onClickRegister = async (data: IRegisterData) => {
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
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
  };

  const moveToLogin = () => {
    router.push(`/login/`);
  };

  return (
    <>
      <RegisterWrapper>
        <form onSubmit={wrapFormAsync(handleSubmit(onClickRegister))}>
          <RegisterTitle>회원가입</RegisterTitle>
          <RegisterDivWrapper>
            <RegisterInputTitle>이메일</RegisterInputTitle>
            <RegisterInput
              type="text"
              {...register("email")}
              placeholder="이메일을 입력해주세요"
            />
            <RegisterErrorMsg>
              {formState.errors.email?.message}
            </RegisterErrorMsg>
          </RegisterDivWrapper>
          <RegisterDivWrapper>
            <RegisterInputTitle>이름</RegisterInputTitle>
            <RegisterInput
              type="text"
              {...register("name")}
              placeholder="이름을 입력해주세요"
            />
            <RegisterErrorMsg>
              {formState.errors.name?.message}
            </RegisterErrorMsg>
          </RegisterDivWrapper>
          <RegisterDivWrapper>
            <RegisterInputTitle>비밀번호</RegisterInputTitle>
            <RegisterInput
              type="password"
              {...register("password")}
              placeholder="비밀번호를 입력해주세요"
            />
            <RegisterErrorMsg>
              {formState.errors.password?.message}
            </RegisterErrorMsg>
          </RegisterDivWrapper>
          <RegisterDivWrapper>
            <RegisterInputTitle> 비밀번호 확인 </RegisterInputTitle>

            <RegisterInput
              type="password"
              {...register("passwordConfirm")}
              placeholder="비밀번호를 입력해주세요"
            />
            <RegisterErrorMsg>
              {formState.errors.passwordConfirm?.message}
            </RegisterErrorMsg>
          </RegisterDivWrapper>
          <RegisterBtn type="submit">회원가입하기</RegisterBtn>
        </form>
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
