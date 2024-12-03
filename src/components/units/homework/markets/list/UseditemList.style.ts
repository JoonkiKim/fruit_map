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
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FDeleteBoxWrapper = styled.div`
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const DeleteBtn = styled.button`
  width: 70px;
  height: 50px;
`;

export const FIdWrapper = styled.div`
  width: 100px;
  /* background-color: blue; */
  margin-top: 10px;
  margin-bottom: 10px;
  /* margin-right: 50px; */
  text-align: center;
`;

export const IdWrapper = styled.div`
  width: 100px;
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
  width: 100px;
  /* background-color: blue; */
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const TitleWrapper = styled.div`
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const WriterWrapper = styled.div`
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  /* background-color: red; */
  text-align: center;
`;

export const FWriterWrapper = styled.div`
  width: 100px;

  /* background-color: blue; */
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

export const TimeStampWrapper = styled.div`
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  /* background-color: green; */
  text-align: center;
`;

export const FTimeStampWrapper = styled.div`
  width: 100px;

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
  width: 250px;
  height: 80px;
  background-color: white;
  color: black;
  border-radius: 5px;
  margin-bottom: 50px;
  cursor: pointer;
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

export const ListWrapper = styled.div`
  width: 3000px;
  height: 1000px;
  /* background-color: green; */
  display: flex;
  flex-direction: row;
  align-items: start;
  overflow-y: scroll;
`;

export const ListWrapper2 = styled.div`
  width: 1700px;
  display: flex;
  flex-direction: row;
  align-items: start;
`;

export const TodayWrapper = styled.div`
  position: sticky;
  top: 100px; /* Adjust this value as needed */
  background-color: white;
  padding: 10px;
  margin-left: 20px;
  border: 1px solid #bdbdbd;
  z-index: 10;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TodayTitle = styled.div`
  width: 300px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
`;

export const TodayList = styled.div`
  border: 1px solid #bdbdbd;
  width: 280px;
  margin-top: 30px;
  padding: 10px;
  cursor: pointer;
  /* height: 300px; */
`;

export const TodayImgWrapper = styled.div`
  width: 250px;
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TodayImg = styled.img`
  width: 150px;
  height: 100px;

  border: 1px solid #bdbdbd;
  object-fit: contain;

  /* background-color: green; */
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const TodayName = styled.div`
  width: 250px;
  /* background-color: green; */
  font-weight: 600;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TodayRemarks = styled.div`
  width: 250px;
  color: #4f4f4f;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TodayPrice = styled.div`
  width: 280px;
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 10px;
`;

export const TodayTags = styled.div`
  width: 250px;
  font-size: 16px;
  color: #bdbdbd;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UseditemImg = styled.img`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 1px solid #bdbdbd;
`;

export const UseditemUdef = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 1px solid #bdbdbd;
`;
