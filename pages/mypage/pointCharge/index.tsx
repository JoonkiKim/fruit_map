import { gql, useMutation, useQuery } from "@apollo/client";

import Head from "next/head";
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
  IQuery,
} from "../../../src/commons/types/generated/types";
import { 로그인체크 } from "../../../src/components/commons/hocs/로그인체크";
import { ChangeEvent, useState } from "react";

import styled from "@emotion/styled";
import { useRouter } from "next/router";

export const NumberInput = styled.input`
  width: 300px;
  height: 52px;
  border-radius: 0;
  border: 1px solid #bdbdbd;
  margin-top: 50px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; /* Chrome, Safari에서 스핀 버튼 제거 */
    margin: 0;
  }
  &::placeholder {
    color: #bdbdbd; /* 원하는 색상으로 변경 */

    font-size: 16px; /* 원하는 크기로 변경 */
    padding-left: 5px;
  }
`;

declare const window: typeof globalThis & {
  IMP: any;
};

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

const CREATE_POINT = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
    }
  }
`;

function MyPage() {
  const { data, refetch } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [createPoint] = useMutation<
    Pick<IMutation, "createPointTransactionOfLoading">,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT);

  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const onClickPayment = () => {
    const IMP = window.IMP;
    IMP.init("imp49910675");

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        // merchant_uid: "결제 번호",
        name: `포인트 충전`,
        amount,
        buyer_email: data?.fetchUserLoggedIn.email,
        buyer_name: data?.fetchUserLoggedIn.name,

        m_redirect_url: `/mypage/`,
      },
      function (rsp: any) {
        // callback
        if (rsp.success) {
          console.log(amount);
          console.log(rsp);

          // 여기서 백엔드에 결제관련데이터 넘겨주기 -> 쉽게 말해 mutation넘겨주기
          // 위의 콘솔에서 나오는 imp_uid를 받아서 보내주면 된다
          // [과제 부분에서]
          // createPointTransactionOfLoading 사용하면 됨
          // impUid 입력하면 됨
          // fetchUserLoggedIn 쿼리에서 userPoint의 amount확인하면 충전된 포인트 확인할 수 있음
          // 포인트로 거래 진행하는건 createPointTransactionOfBuyingAndSellUseditem API사용하면됨

          const createPointMutation = async () => {
            try {
              const result = await createPoint({
                variables: {
                  impUid: rsp.imp_uid,
                },
              });
              console.log(result);

              setAmount(0);
              refetch();
            } catch {
              alert("에러 발생");
            }
          };

          createPointMutation();

          router.push("/mypage/");

          alert("결제가 성공했습니다.");
        } else {
          alert("결제에 실패했습니다.");
        }
      },
    );
  };
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ></script>
      </Head>

      <div style={{ marginTop: "50px" }}>
        현재포인트는 {data?.fetchUserLoggedIn.userPoint.amount}입니다
      </div>
      <div>
        <NumberInput
          type="number"
          placeholder=" 충전할 포인트를 입력해주세요"
          onChange={onChangeAmount}
        />
      </div>

      <button style={{ marginTop: "50px" }} onClick={onClickPayment}>
        포인트 충전하기
      </button>
    </>
  );
}

export default 로그인체크(MyPage);
