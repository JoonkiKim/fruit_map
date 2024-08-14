import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    # 변수 타입 지정해줄때 느낌표 있는 부분까지 완벽하게 써줘야 한다!! ex. ID가 아니라 ID!
    fetchBoard(boardId: $boardId) {
      #boardId 라는 명칭은 플레이그라운드에서 보고 가져오는거다
      #왼쪽 boardId는 플레이그라운드에서 보고 가져오는거고 오른쪽 $boardId는 폴더이름에서 온거임
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
