import { ChangeEvent, MouseEvent } from "react";

import {
  Wrapper,
  Title,
  TitleInputWrapper,
  TitleCaption,
  TitleInput,
  ContentInputWrapper,
  ContentCaption,
  ContentInput,
  AdressWrapper,
  AdressCaption,
  PostCodeInput,
  AdressInput,
  PostSearchButton,
  FirstLineWrapper,
  AdressInputWrapper,
  YoutubeCaption,
  YoutubeInputWrapper,
  YoutubeInput,
  PictureInputWrapper,
  PictureCaption,
  PictureButton,
  ButtonText,
  ButtonWrapper,
  MainSettingWrapper,
  MainSettingCaption,
  MainSettingInput,
  MsButtonWrapper,
  MsWrapper,
  RegisterButton,
  WriterCaption,
  WriterWrapper,
  WriterInput,
  PwWrapper,
  PwCaption,
  PwInput,
  TopLineWrapper,
  ErMes,
} from "../../../../../styles/register_css";
import { IQuery } from "../../../../commons/types/generated/types";

interface IBoardWriteUIProps {
  aa: (event: ChangeEvent<HTMLInputElement>) => void;
  bb: (event: ChangeEvent<HTMLInputElement>) => void;
  cc: (event: ChangeEvent<HTMLInputElement>) => void;
  dd: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickUpdate: (event: MouseEvent<HTMLButtonElement>) => void;
  writerError: string;
  pwError: string;
  titleError: string;
  contentError: string;
  isActive?: boolean;
  isEdit?: boolean;
  data?: Pick<IQuery, "fetchBoard">;
}

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  return (
    <Wrapper>
      {/* 해당 태그가 어떤 종류의 태그인지 알고 싶으면 컨트롤+좌클릭하면 확인할 수 있음, 이렇게 나타난 미리보기 창에서 css 수정도 가능함! */}
      {/* 여기서 다른 파일로 나갔다가 다시 여기로 돌아오고 싶으면 alt + 왼쪽 방향키 */}

      <Title>게시물 {props.isEdit ? "수정" : "등록"}</Title>
      <TopLineWrapper>
        <WriterWrapper>
          <WriterCaption>작성자</WriterCaption>
          <WriterInput
            type="text"
            onChange={props.aa}
            placeholder="이름을 적어주세요."
            defaultValue={props.data?.fetchBoard.writer ?? ""}
            // ?? "" 는 앞의 값이 null이나 undefined이면 빈문자열을 넣어달라는 뜻
            readOnly={!!props.data?.fetchBoard.writer}
            // !!는 뒤에오는 값을 boolean으로 바꿔줌. 여기서는 뒤의 값이 있으면~ 이라는 뜻!
            // Boolean(props.data?.fetchBoard.writer) 이렇게도 가능함!

            // readOnly는 읽기만 가능하게 하는건데, 내용이 있으면 readOnly가 실행되어서 작성이 안되고, 없으면 작성자 입력이 가능하게 된다
          ></WriterInput>
          <ErMes>{props.writerError}</ErMes>
        </WriterWrapper>
        <PwWrapper>
          <PwCaption>비밀번호</PwCaption>
          <PwInput
            type="text"
            onChange={props.bb}
            placeholder="비밀번호를 입력해주세요."
            // defaultValue={props.data?.fetchBoard.password}
          ></PwInput>
          <ErMes>{props.pwError}</ErMes>
        </PwWrapper>
      </TopLineWrapper>
      <TitleInputWrapper>
        <TitleCaption>제목</TitleCaption>
        <TitleInput
          type="text"
          onChange={props.cc}
          placeholder="제목을 작성해주세요."
          defaultValue={props.data?.fetchBoard.title}
        ></TitleInput>
        <ErMes>{props.titleError}</ErMes>
      </TitleInputWrapper>
      <ContentInputWrapper>
        <ContentCaption>내용</ContentCaption>
        <ContentInput
          type="text"
          onChange={props.dd} //dd
          placeholder="내용을 작성해주세요."
          defaultValue={props.data?.fetchBoard.contents}
          // 그냥 placeholder밑에 defaultValue 바로 써주면 알아서 둘 중 하나로 표시된다
        ></ContentInput>
        <ErMes>{props.contentError}</ErMes>
      </ContentInputWrapper>
      <AdressWrapper>
        <AdressCaption>주소</AdressCaption>
        <FirstLineWrapper>
          <PostCodeInput
            type="text"
            // onChange={props.ff}
            placeholder="07250"
          ></PostCodeInput>

          <PostSearchButton>우편번호 검색</PostSearchButton>
        </FirstLineWrapper>
        <AdressInputWrapper>
          <AdressInput type="text"></AdressInput>
        </AdressInputWrapper>
        <AdressInputWrapper>
          <AdressInput></AdressInput>
        </AdressInputWrapper>
      </AdressWrapper>
      <YoutubeInputWrapper>
        <YoutubeCaption>유튜브</YoutubeCaption>
        <YoutubeInput
          type="text"
          placeholder="링크를 복사해주세요."
        ></YoutubeInput>
      </YoutubeInputWrapper>
      <PictureInputWrapper>
        <PictureCaption>사진 첨부</PictureCaption>

        <ButtonWrapper>
          <PictureButton>
            <ButtonText>+</ButtonText>
            <ButtonText>upload</ButtonText>
          </PictureButton>
          <PictureButton>
            <ButtonText>+</ButtonText>
            <ButtonText>upload</ButtonText>
          </PictureButton>
          <PictureButton>
            <ButtonText>+</ButtonText>
            <ButtonText>upload</ButtonText>
          </PictureButton>
        </ButtonWrapper>
      </PictureInputWrapper>

      <MainSettingWrapper>
        <MainSettingCaption>메인 설정</MainSettingCaption>
        <MsButtonWrapper>
          <MsWrapper>
            <MainSettingInput
              // 라디오 버튼도 onChange로 제어한다!!
              type="radio"
              name="media"
              value="youtube"
            ></MainSettingInput>
            유튜브
          </MsWrapper>
          <MsWrapper>
            <MainSettingInput
              type="radio"
              name="media"
              value="picture"
            ></MainSettingInput>
            사진
          </MsWrapper>
        </MsButtonWrapper>
      </MainSettingWrapper>

      <RegisterButton
        isActive={props.isEdit ? true : props.isActive}
        // 수정하기에서는 항상 노란불이 들어오도록 만들었다
        onClick={props.isEdit ? props.onClickUpdate : props.onSubmit}
      >
        {props.isEdit ? "수정" : "등록"}하기
      </RegisterButton>
    </Wrapper>
  );
}
