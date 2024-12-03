// import { gql, useQuery } from "@apollo/client";
// import { IQuery } from "../../../src/commons/types/generated/types";
import { 로그인체크 } from "../../../src/components/commons/hocs/로그인체크";
import UseditemList from "../../../src/components/units/homework/markets/list/UseditemListIndex";

// const FETCH_USER_LOGGED_IN = gql`
//   query {
//     fetchUserLoggedIn {
//       email
//       name
//     }
//   }
// `;

function MarketPage() {
  // const { data } =
  //   useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  return (
    <div>
      <UseditemList />
    </div>
  );
}

export default 로그인체크(MarketPage);
