import styled from "@emotion/styled";
import { Modal, Rate } from "antd";

export const Wrapper = styled.div`
  box-sizing: border-box;
  width: 996px;

  /* background-color: green; */

  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WriteWrapper = styled.div`
  width: 996px;
  /* background-color: red; */
`;

export const CommentTitle = styled.div`
  width: 996px;
  /* background-color: gray; */
  margin-bottom: 30px;
  font-weight: 600;
`;

export const CommentWritPass = styled.div`
  width: 996px;
  /* background-color: purple; */
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CommentWriter = styled.input`
  width: 180px;
  height: 52px;
  margin-right: 10px;
  border-radius: 0px;
  border: 1px solid #bdbdbd;
`;

export const CommentPw = styled.input`
  width: 180px;
  height: 52px;
  margin-right: 10px;
  border-radius: 0px;
  border: 1px solid #bdbdbd;
`;

export const Rating = styled.div`
  width: 200px;
  height: 52px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PositionWrapper = styled.div`
  width: 989px;

  position: relative;

  /* background-color: yellow; */
`;

export const CommentContent = styled.textarea`
  width: 997px;
  height: 161px;
  position: absolute;
  border-radius: 0px;
  z-index: 1;
  top: 0;
  left: 0;
  border: 1px solid #bdbdbd;
  resize: none;
  overflow: hidden;

  /* background-color: yellow; */
`;

export const CommentBottomWrapper = styled.div`
  width: 996px;

  /* background-color: gray; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 113px;
  left: 0;
  z-index: 2;
  border-top: 1px solid #f2f2f2;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -2px;
    width: 1px;
    height: 1px;
    background-color: #bdbdbd;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const TextCounter = styled.span`
  width: 996px;
  margin-left: 10px;
  color: #bdbdbd;
  /* background-color: red; */
`;

export const CommentBtn = styled.button`
  width: 94px;
  height: 45px;
  background-color: black;
  color: white;
  font-size: 16px;
`;

export const ListWrapper = styled.div`
  width: 996px;
  margin-top: 200px;
  /* background-color: blue; */
  /* height: 100px; */
`;

export const CommentListWrapper = styled.div`
  /* margin-top: 200px; */
  width: 996px;
  /* height: 165px; */
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #bdbdbd;
  /* background-color: blue; */
`;

export const PicWrapper = styled.div`
  width: 70px;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-right: 30px;
`;

export const Avatar = styled.img`
  /* margin-right: 10px; */
`;

export const MainContentWrapper = styled.div`
  width: 700px;
  /* background-color: blue; */
`;

export const WritRatWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  /* background-color: blue; */
`;

export const WriterWrapper = styled.div`
  width: 100px;
  /* background-color: blue; */
  font-size: 16px;
  font-weight: 600;
`;

export const RatingWrapper = styled.div`
  width: 200px;
  /* background-color: blue; */
`;

export const TextContentWrapper = styled.div`
  width: 500px;
  /* background-color: blue; */
  margin-bottom: 10px;
`;

export const DateWrapper = styled.div`
  width: 100px;
  /* background-color: blue; */
  font-size: 12px;
  color: #bdbdbd;
`;

export const DeleteBtn = styled.button`
  width: 24px;
  height: 24px;
  font-size: 20px;
  background-color: white;
  border: none;
  color: #bdbdbd;
  margin-right: 20px;
  /* margin-left: 200px; */
  /* background-color: red; */
`;

export const UpdateBtn = styled.button`
  width: 24px;
  height: 24px;
  font-size: 20px;
  background-color: white;
  border: none;
  color: #bdbdbd;
  margin-right: 20px;
  margin-left: 100px;
`;

export const StarFive = styled(Rate)``;

export const StarResult = styled(Rate)``;

export const ModalAlert = styled(Modal)``;
