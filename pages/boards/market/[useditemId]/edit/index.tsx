import { gql, useQuery } from "@apollo/client";

import { useRouter } from "next/router";

import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../../src/commons/types/generated/types";
import MarketItemRegisterIndexPage from "../../../../../src/components/units/homework/markets/register/RegisterIndex";

export const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      useditemAddress {
        _id
        zipcode
        address
        addressDetail
        lat
        lng
        createdAt
        updatedAt
      }
    }
  }
`;

export default function EditPage() {
  const router = useRouter();

  // 라우터가 없거나 boardId가 스트링이 아니면 아무화면도 보여주지 말라는 뜻
  // 별로 어려운 코드는 아니었지만 그런 상황이 발생할 수 있다는걸 염두에 두자는 의미의 코드!
  if (!router || typeof router.query.useditemId !== "string") return <></>;

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USEDITEM, {
    variables: {
      useditemId: router.query.useditemId,
    },
  });

  return <MarketItemRegisterIndexPage isEdit={true} dataDefault={data} />;
}
