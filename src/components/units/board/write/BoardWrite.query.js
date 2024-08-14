import { gql } from "@apollo/client";

// 그래프큐엘 코드 생성! -> export로 내보내기
export const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    # 변수로 받고 싶으면 위에서 이게 무슨 타입인지 선언해줘야됨
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;
