// 모든 페이지에서 사용하는 공통 설정들을 여기서 한다

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const client = new ApolloClient({
    uri: "http://backend-example.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(), // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해놓기 => 나중에 더 자세히 알아보기
  });
  return (
    <div>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        {/* // Component는 우리가 지금 보는 페이지 */}
        {/* index.js에서 실행을 하면 html부분이 잘라내기 되어서 component부분으로 들어와서 실행이 된다 */}
      </ApolloProvider>
    </div>
  );
}
