import { gql } from "@apollo/client";

// 그래프큐엘 코드 생성!
export const MyDataTransfer = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    # 변수로 받고 싶으면 위에서 이게 무슨 타입인지 선언해줘야됨
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      # 요청하는 내용도 docs내용에 맞게 써야된다
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id

      # 요청하는 내용도 docs내용에 맞게 써야된다
    }
  }
`;
