import styled from "@emotion/styled";

// 각 요소의 width를 %를 활용해서 주면 FirstLine과 List의 가로 길이를 같게 맞출 수 있다

export const Wrapper = styled.div`
  box-sizing: border-box;
  width: 1500px;
  margin-left: 50px;
  margin-top: 50px;
  /* background-color: green; */
  text-align: center;
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
`;

export const MainContent = styled.div`
  width: 1200px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

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
  width: 50px;
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
  width: 150px;
  height: 40px;
  background-color: white;
  color: black;
  border-radius: 5px;
`;
