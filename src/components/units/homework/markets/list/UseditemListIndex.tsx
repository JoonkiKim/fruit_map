import moment from "moment-timezone";

import { gql, useApolloClient, useQuery } from "@apollo/client";

// import LazyLoad from "react-lazyload";

import _ from "lodash";

import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "../../../../../commons/types/generated/types";

import {
  IdWrapper,
  ListWrapper,
  ListWrapper2,
  MainContent,
  MainContentWrapper,
  MoveToWrite,
  TimeStampWrapper,
  TitleWrapper,
  TodayImg,
  TodayImgWrapper,
  TodayList,
  TodayName,
  TodayPrice,
  TodayRemarks,
  TodayTags,
  TodayTitle,
  // TodayList,
  // TodayList,
  TodayWrapper,
  UseditemImg,
  UseditemUdef,
  WriterWrapper,
} from "./UseditemList.style";
import { formatDate } from "../../../../../commons/libraries/utils";
import React, { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

import InfiniteScroll from "react-infinite-scroller";

import MarketSearchBar from "../../../../commons/marketSearchBar";
import { useMoveToPage } from "../../../../commons/hooks/useMoveToPage";
import Head from "next/head";
// import { useRecoilState } from "recoil";
// import { loggedInCheck } from "../../../../../commons/stores";
// import { wrapAsync } from "../../../../../commons/libraries/asyncFunc";

export const FETCH_USEDITEMS = gql`
  query fetchUseditems($isSoldout: Boolean, $page: Int, $search: String) {
    fetchUseditems(isSoldout: $isSoldout, page: $page, search: $search) {
      _id
      name
      remarks
      contents
      createdAt
      price
      tags
      images
      soldAt
      pickedCount
    }
  }
`;

const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      createdAt
      useditemAddress {
        _id
        lat
        lng
        createdAt
        updatedAt
      }
      seller {
        _id
        email
        name
        createdAt
        updatedAt
      }
    }
  }
`;

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export default function UseditemList() {
  const router = useRouter();

  const [, setIsModalAlertOpen] = useState(false);
  const [, setModalMessage] = useState("");

  const { data, refetch, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USEDITEMS);

  const { onClickMoveToPage } = useMoveToPage();
  const [keyword, setKeyword] = useState("");

  const [todayItems, setTodayItems] = useState<any[]>([]);

  // const [isLoggedIn] = useRecoilState(loggedInCheck);

  //   const { onClickMoveToPage } = useMoveToPage();

  // const [deleteUseditem] = useMutation<
  //   Pick<IMutation, "deleteUseditem">,
  //   IMutationDeleteUseditemArgs
  // >(DELETE_USEDITEM);

  useEffect(() => {
    refetch(); // Ensures data is up-to-date
  }, [router]);

  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    const loadTodayItems = () => {
      const useditemData = JSON.parse(
        localStorage.getItem("useditemData") || "[]",
      );

      // 최신순으로 정렬한 후 두 개의 아이템만 가져옵니다.
      let latestItems = useditemData.reverse().slice(0, 2);

      // 사용자 정보가 있는 경우 (로그인 상태인 경우) 필터링합니다.
      if (userData?.fetchUserLoggedIn) {
        const userId = userData.fetchUserLoggedIn._id;
        const userEmail = userData.fetchUserLoggedIn.email;

        // 사용자의 ID와 이메일이 일치하는 상품만 필터링
        latestItems = latestItems.filter(
          (item: any) =>
            item.user._id === userId && item.user.email === userEmail,
        );
      }

      setTodayItems(latestItems);
    };

    loadTodayItems();
  }, []);

  // 매일 오후 1시 30분 이후 'useditemData' 삭제
  useEffect(() => {
    const checkAndClearLocalStorage = () => {
      const currentTime = moment().tz("Asia/Seoul"); // 한국 시간으로 설정
      const targetTime = moment().tz("Asia/Seoul").set({
        hour: 13,
        minute: 30,
        second: 0,
      });

      if (currentTime.isAfter(targetTime)) {
        localStorage.removeItem("useditemData");
        setTodayItems([]); // 오늘 본 상품 리스트도 초기화
      }
    };

    // 매 60분마다 시간 체크
    const interval = setInterval(checkAndClearLocalStorage, 3600000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  useEffect(() => {
    // 상품 이미지들 프리로드 설정
    data?.fetchUseditems.forEach((item) => {
      if (item.images[0]) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = `https://storage.googleapis.com/${item.images[0]}`;
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
      }
    });
  }, [data]);

  const moveToDetail = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget instanceof HTMLDivElement) {
      // console.log(event.target);
      // const selectedItem = data?.fetchUseditems.find(
      //   (item) => item._id === event.currentTarget.id,
      // );

      // if (selectedItem) {
      //   addItemToLocalStorage(selectedItem);
      // }

      try {
        router.push(`/boards/market/${event.currentTarget.id}`);
      } catch (error) {
        if (error instanceof Error) setModalMessage(error.message);
        onToggleAlertModal();
      }
    }
  };

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  // const onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
  //   console.log(event.target);
  //   if (event.target instanceof HTMLButtonElement)
  //     deleteUseditem({
  //       variables: {
  //         useditemId: event.target.id,
  //         // 언더바 없이 id만 써준다!!!!
  //       },

  //       refetchQueries: [{ query: FETCH_USEDITEMS }],
  //     });
  // };

  const onLoadMore = (): void => {
    // console.log("로그인 여부는 " + isLoggedIn);
    // console.log(accessTokenState);
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data.fetchUseditems.length ?? 10) / 10) + 1,
      },
      // 위의 수식은 기존 페이지 + 1을 만드는 코드
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditems === undefined) {
          // fetchMoreResult.fetchBoards가 없으면 기존 댓글을 불러오고, 있으면 뒤에거 더해서 fetchMore를 해줘라
          return {
            fetchUseditems: [...prev.fetchUseditems],
          };
        }

        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
          // ... 스프레드 연산자 써주는거 까먹지 말기!
          // fetchBoards에 배열로 되어있는 댓글 목록들을 복사해주기 위해 스프레드 연산자가 필요한거임
        };
      },
    });
  };

  const client = useApolloClient();

  const prefetchBoard = (useditemId: string) => async () => {
    await client.query({
      query: FETCH_USEDITEM,
      variables: { useditemId },
    });
  };

  // 1초뒤에 prefetchBoard함수 실행
  const debouncedPrefetchBoard = _.debounce(
    (useditemId: string) => prefetchBoard(useditemId)(),
    1000,
  );

  return (
    <>
      <Head>
        <meta property="og:title" content="중고마켓" />
        <meta
          property="og:description"
          content="KJK 중고마켓에 오신 것을 환영합니다"
        />
        <meta
          property="og:image"
          // 이미지는 나중에 배포 이후에 링크 생성되면 제대로 넣기
          content=""
        />
      </Head>
      <MainContentWrapper>
        <MarketSearchBar setKeyword={setKeyword} refetch={refetch} />

        <MoveToWrite onClick={onClickMoveToPage(`/boards/market/new`)}>
          {" "}
          ✏️ 상품 등록하러 가기
        </MoveToWrite>
        <ListWrapper2>
          <ListWrapper>
            {data?.fetchUseditems && (
              <InfiniteScroll
                pageStart={0}
                loadMore={onLoadMore}
                hasMore={true}
                useWindow={false}
              >
                {data?.fetchUseditems.map((el: any) => (
                  <MainContent
                    key={el._id}
                    onMouseOver={() => debouncedPrefetchBoard(el._id)}
                  >
                    <IdWrapper>
                      {el.images[0] ? (
                        <UseditemImg
                          src={`https://storage.googleapis.com/${el.images[0]}`}
                        />
                      ) : (
                        <UseditemUdef>이미지 없음</UseditemUdef>
                      )}
                    </IdWrapper>

                    <TitleWrapper
                      id={el._id}
                      onClick={moveToDetail}
                      // ** 여기 문제 생길 가능성 높음!!
                    >
                      {el.name
                        .replaceAll(keyword, `@#$${keyword}@#$`)
                        .split("@#$")
                        .map((el: any) => (
                          <span
                            key={uuidv4()}
                            style={{ color: el === keyword ? "red" : "black" }}
                          >
                            {el}
                          </span>
                        ))}
                    </TitleWrapper>

                    <WriterWrapper>{el.remarks}</WriterWrapper>

                    <WriterWrapper>{el.pickedCount}</WriterWrapper>
                    <WriterWrapper>{String(el.price) + "크레딧"}</WriterWrapper>

                    <TimeStampWrapper>
                      {formatDate(el.createdAt)}
                    </TimeStampWrapper>
                  </MainContent>
                ))}
              </InfiniteScroll>
            )}
          </ListWrapper>
          <TodayWrapper>
            {" "}
            <TodayTitle>오늘 본 상품</TodayTitle>
            {todayItems.map((item, index) => (
              <TodayList
                key={item._id || index}
                onClick={onClickMoveToPage(`/boards/market/${item?._id}`)}
              >
                <TodayImgWrapper>
                  {item.images[0] && (
                    <TodayImg
                      src={`https://storage.googleapis.com/${item.images[0]}`}
                      alt={item.name}
                    />
                  )}
                </TodayImgWrapper>
                <TodayName>{item?.name}</TodayName>

                <TodayRemarks>{item?.remarks}</TodayRemarks>
                <TodayPrice>{item?.price} 크레딧</TodayPrice>

                <TodayTags>{item?.tags.join(" ")}</TodayTags>
              </TodayList>
            ))}
          </TodayWrapper>
        </ListWrapper2>
      </MainContentWrapper>
    </>
  );
}
