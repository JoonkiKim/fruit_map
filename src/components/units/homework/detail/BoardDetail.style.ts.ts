import styled from "@emotion/styled";
import ReactPlayer from "react-player";
import { Button, Modal, Tooltip } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";

export const Wrapper = styled.div`
  // 중앙 정렬을 위한 마진이나 패딩만 넣어보기
  box-sizing: border-box;
  width: 1200px;
  // Wrapper의 세로를 설정 안해야 내부 내용물들이 안 찌그러진다
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 100px;
`;

export const SecWrapper = styled.div`
  width: 1000px;

  border: 1px solid white;
  box-shadow: 7px 7px 39px #bdbdbd;
  /* background-color: blue ; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 200px; */
`;

export const HeaderWrapper = styled.div`
  width: 800px;
  /* background-color: blue ; */
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  border-bottom: 2px solid #bdbdbd;
  margin-top: 50px;
  margin-bottom: 100px;
  padding-bottom: 20px;
`;

export const PicWrapper = styled.div`
  width: 10%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const Avatar = styled.img`
  /* margin-right: 10px; */
`;

export const ProfWrapper = styled.div`
  width: 80%;
  /* background-color: blue; */
`;

export const TTWrapper = styled(Tooltip)`
  width: 10%;
`;

export const PinTip = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  /* margin-right: 10px; */
`;

export const WriterName = styled.div`
  width: 200px;
  /* background-color: red; */
  font-size: 16px;
  font-weight: 500;
`;

export const CreatedTime = styled.div`
  width: 200px;
  /* background-color: blue; */
  font-size: 16px;
  font-weight: 500;
`;

export const ContentWrapper = styled.div`
  width: 800px;
  /* background-color: red ; */
`;

export const ContentTitle = styled.div`
  width: 800px;
  font-size: 30px;
  /* background-color: red; */
  margin-bottom: 20px;
  font-weight: 900;
`;

export const ContentReal = styled.div`
  width: 800px;
  height: 100px;

  /* background-color: red; */
`;

export const LikeButton = styled(Button)`
  /* background-color: red; */
  width: 40px;
  height: 51px;
  margin-bottom: 50px;
  margin-left: 300px;
`;

export const LikeYes = styled(LikeFilled)`
  /* background-color: red; */
  font-size: 50px;
`;

export const LikeNo = styled(LikeOutlined)`
  /* background-color: red; */
  font-size: 50px;
`;

export const BtnWrapper = styled.div`
  margin-top: 50px;
  width: 800px;
  // Wrapper의 세로를 설정 안해야 내부 내용물들이 안 찌그러진다

  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ToList = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid black;

  background-color: white;
`;

export const ToFix = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid black;

  background-color: white;
`;

export const ToDelete = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid black;

  background-color: white;
`;

export const YoutubeScreen = styled(ReactPlayer)`
  width: 400px;
  height: 300px;
  margin-bottom: 50px;
`;

export const ImgWrapper = styled.img`
  width: 300px;
  border: 1px solid black;
  margin-bottom: 50px;
`;

export const ModalAlert = styled(Modal)``;
