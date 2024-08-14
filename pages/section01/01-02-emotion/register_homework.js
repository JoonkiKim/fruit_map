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
} from "../../../styles/register_css.js";

export default function RegisterPage() {
  // 여기는 자바스크립트 쓰는 곳
  return (
    <Wrapper>
      <Title>게시물 등록</Title>
      <TitleInputWrapper>
        <TitleCaption>제목</TitleCaption>
        <TitleInput placeholder="제목을 작성해주세요."></TitleInput>
      </TitleInputWrapper>
      <ContentInputWrapper>
        <ContentCaption>내용</ContentCaption>
        <ContentInput placeholder="내용을 작성해주세요."></ContentInput>
      </ContentInputWrapper>
      <AdressWrapper>
        <AdressCaption>주소</AdressCaption>
        <FirstLineWrapper>
          <PostCodeInput placeholder="07250"></PostCodeInput>
          <PostSearchButton>우편번호 검색</PostSearchButton>
        </FirstLineWrapper>
        <AdressInputWrapper>
          <AdressInput></AdressInput>
        </AdressInputWrapper>

        <AdressInputWrapper>
          <AdressInput></AdressInput>
        </AdressInputWrapper>
      </AdressWrapper>
      <YoutubeInputWrapper>
        <YoutubeCaption>유튜브</YoutubeCaption>
        <YoutubeInput placeholder="링크를 복사해주세요."></YoutubeInput>
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
            <MainSettingInput type="radio" name="media"></MainSettingInput>
            유튜브
          </MsWrapper>
          <MsWrapper>
            <MainSettingInput type="radio" name="media"></MainSettingInput>
            사진
          </MsWrapper>
        </MsButtonWrapper>
      </MainSettingWrapper>

      <RegisterButton>등록하기</RegisterButton>
    </Wrapper>
  );
}
