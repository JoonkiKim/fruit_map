// 접속할 수 있는 건 pages폴더 안에 있는 이 index.js 페이지 밖에 없으니까 컴포넌트들을 여기로 불러와야됨

import BoardWrite from "../../../src/components/units/board/write/BoardWrite.container";

export default function GraphqlMutationPage() {
  return (
    // 로직(container)을 불러오는 것이더라도 보여줄떄는 return 아래쪽 즉, html자리에 보여준다!

    // 접속이 되는 부분은 여기이지만, 페이지에 보일때는 파일들이 다 합쳐져서 보인다! (app.js, index.js, 컨테이너, 프리젠터, styled 파일이 싹다 합쳐져서 보인다)
    //1. 결국엔 app.js로 다 합쳐진다
    //2. 전부다 js, html영역을 갖고는 있지만 사용되는 부분이 달라지고, -> 각각이 모두 컴포넌트이다

    // 컨테이너 프리젠터로 나누어도 그 둘을 합쳐주는 index.js가 필요하다!
    //
    <div>
      <div>############### 여기는 페이지 입니다</div>
      <BoardWrite />
      <div>############### 여기는 페이지 입니다</div>
    </div>
  );
}
