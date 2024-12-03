import styled from "@emotion/styled";
import { Modal } from "antd";

export const ListPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: red; */
`;

// 각 요소의 width를 %를 활용해서 주면 FirstLine과 List의 가로 길이를 같게 맞출 수 있다

export const Wrapper = styled.div`
  box-sizing: border-box;
  width: 1500px;
  /* margin-left: 50px;
  margin-top: 50px; */
  /* background-color: green; */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FirstLineWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* background-color: red; */
  border-top: 2px solid black;
  border-bottom: 1px solid black;
  font-weight: 600;
  &:hover {
    color: blue;
  }
`;

export const MainContentWrapper = styled.div`
  width: 1200px;
  background-color: white;
  border-bottom: 2px solid black;
  margin-bottom: 5px;
`;

export const MainContent = styled.div`
  width: 1200px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5px;

  border-top: 1px solid black;
  &:hover {
    color: blue;
  }
`;

export const DeleteBoxWrapper = styled.div`
  width: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FDeleteBoxWrapper = styled.div`
  width: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const DeleteBtn = styled.button`
  width: 70px;
  height: 50px;
`;

export const FIdWrapper = styled.div`
  width: 20%;
  /* background-color: blue; */
  margin-top: 10px;
  margin-bottom: 10px;
  /* margin-right: 50px; */
  text-align: center;
`;

export const IdWrapper = styled.div`
  width: 20%;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  /* margin-right: 100px; */
`;

export const FTitleWrapper = styled.div`
  width: 20%;
  /* background-color: blue; */
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const TitleWrapper = styled.div`
  width: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const WriterWrapper = styled.div`
  width: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
  /* background-color: red; */
  text-align: center;
`;

export const FWriterWrapper = styled.div`
  width: 20%;

  /* background-color: blue; */
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const TimeStampWrapper = styled.div`
  width: 20%;
  margin-top: 10px;
  margin-bottom: 10px;
  /* background-color: green; */
  text-align: center;
`;

export const FTimeStampWrapper = styled.div`
  width: 20%;

  /* background-color: blue; */
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const Footer = styled.div`
  width: 1200px;
  margin-top: 50px;
  /* background-color: red; */
`;

export const MoveToWrite = styled.button`
  width: 200px;
  height: 80px;
  background-color: white;
  color: black;
  border-radius: 5px;
  margin-bottom: 50px;
`;

export const ModalAlert = styled(Modal)``;

export const SearchWrapper = styled.div`
  width: 1200px;
  height: 80px;
  background-color: #f2f2f2;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
  padding: 5px;
  border-radius: 10px;
`;

export const SearchTitle = styled.span`
  margin-right: 20px;
  font-weight: 900;
  font-size: 25px;
`;

export const SearchWindow = styled.input`
  width: 1000px;
  height: 50px;
  background-color: transparent;
  border: none;
  :focus {
    outline: none;
  }
`;

export const Magnifier = styled.img`
  width: 30px;
  height: 30px;

  margin-left: 20px;
`;
