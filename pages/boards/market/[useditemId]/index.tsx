import Head from "next/head";
import { CommentTitle } from "../../../../src/components/units/homework/comment/BoardComment.style";
import { DetailWholeWrapper } from "../../../../src/components/units/homework/markets/detail/UseditemDetail.style";
import UseditemDetail from "../../../../src/components/units/homework/markets/detail/UseditemDetailIndex";
import MarketCommentList from "../../../../src/components/units/homework/markets/marketcomment/MarketCommentList.container";
import MarketCommentWrite from "../../../../src/components/units/homework/markets/marketcommentwrite/MarketCommentWrt.container";
import { ParsedUrlQuery } from "querystring";
import { GraphQLClient } from "graphql-request";
import { IQuery } from "../../../../src/commons/types/generated/types";
import { gql } from "@apollo/client";

const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      images
    }
  }
`;

export default function MarketItemDetailPage(props: any) {
  return (
    <>
      <Head>
        <meta property="og:title" content={props.qqq?.name} />
        <meta property="og:description" content={props?.qqq?.remarks} />
        <meta property="og:image" content={props?.qqq?.images?.[0]} />
      </Head>
      <DetailWholeWrapper>
        <UseditemDetail />
        <CommentTitle>💬댓글</CommentTitle>
        <MarketCommentWrite />
        <MarketCommentList />
      </DetailWholeWrapper>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { useditemId } = context.params as ParsedUrlQuery;

  console.log("여기는 서버입니다");
  const graphQLClient = new GraphQLClient(
    "https://backend-practice.codebootcamp.co.kr/graphql",
  );

  const result = await graphQLClient.request<Pick<IQuery, "fetchUseditem">>(
    FETCH_USEDITEM,
    {
      useditemId: String(useditemId),
    },
  );

  return {
    props: {
      qqq: {
        name: result.fetchUseditem.name,
        remarks: result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      },
    },
  };
};
