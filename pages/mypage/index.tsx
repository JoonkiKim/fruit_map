import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../../src/commons/types/generated/types";
import { 로그인체크 } from "../../src/components/commons/hocs/로그인체크";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        _id
        amount

        createdAt
        updatedAt
      }
    }
  }
`;

function MyPage() {
  const { data, refetch } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const router = useRouter();

  const moveToCharge = () => {
    router.push(`/mypage/pointCharge`);
  };

  useEffect(() => {
    refetch();
  }, [data]);

  return (
    <>
      <div>
        {data?.fetchUserLoggedIn.name}님 환영합니다! 여기는 마이페이지입니다
      </div>
      <div style={{ marginTop: "50px" }}>
        현재포인트는 {data?.fetchUserLoggedIn.userPoint.amount} 입니다
      </div>

      <button style={{ marginTop: "50px" }} onClick={moveToCharge}>
        포인트 충전하러가기
      </button>
    </>
  );
}

export default 로그인체크(MyPage);
