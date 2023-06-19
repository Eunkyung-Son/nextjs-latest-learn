"use client";

import React, { Profiler, Suspense } from "react";
import ListItem from "../../components/ListItem/ListItem";
import MemoizedListItem, {
  Photo,
} from "../../components/MemoizedListItem/MemoizedListItem";
// import PhotosComponent2 from "../../components/Photos2/Photos2";
// const PhotosComponent2 = React.lazy(
//   () => import("../../components/Photos2/Photos2")
// );

const PhotosComponent2 = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("../../components/Photos2/Photos2")
  );
});

// client 코드는 template 에서만 작성 가능
export default function Template({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = React.useState<string[]>(["11"]);
  const [photos, setPhotos] = React.useState<Photo[]>([]);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then(setPhotos);
  }, [setPhotos]);

  /**
   *
   * @param id 방금 커밋된 Profiler 트리의 id prop. 복수의 프로파일러를 사용하고 있다면 트리의 어느 부분이 커밋되엇는지 식별하는데 사용할 수 있습니다.
   * @param phase 해당 트리가 방금 마운트된 건지 prop, state 혹은 hooks의 변화로 인하여 리렌더링 된 건지 식별합니다.
   * @param actualDuration 현재 업데이트에 해당하는 Profiler와 자손 컴포넌트들을 렌더하는데 걸린 시간 이것은 하위 트리가 얼마나 메모이제이션을 잘 활용하고 있는지를 암시합니다 (e.g. React.memo, useMemo, shouldComponentUpdate). 이상적으로 대다수의 자손 컴포넌트들은 특정 prop이 변할 경우에만 리렌더링이 필요하기 때문에 이 값은 초기 렌더링 이후에 상당 부분 감소해야 합니다.
   * @param baseDuration Profiler 트리 내 개별 컴포넌트들의 가장 최근 render 시간의 지속기간 이 값은 렌더링 비용의 최악 케이스를 계산해줍니다(e.g. 초기 마운트 혹은 메모이제이션이 없는 트리)
   * @param startTime React가 현재 업데이트에 대해 렌더링을 시작한 시간의 타임 스탬프.
   * @param commitTime React가 현재 업데이트를 커밋한 시간의 타임 스탬프 이 값은 모든 프로파일러들이 공유하기 때문에 원한다면 그룹을 지을 수 있습니다.
   * @param interactions 업데이트가 계획되었을 때 추적하고 있던 “상호작용”의 집합 (e.g. render 혹은 setState가 호출되었을 때).

   */
  const onRenderCallback = (
    id: string,
    phase: "mount" | "update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: Set<{ name: string; timestamp: number }>
  ) => {
    // Aggregate or log render timings...
    console.log(`
      id : ${id},
      phase: ${phase},
      actualDuration: ${actualDuration},
      baseDuration: ${baseDuration},
      startTime: ${startTime},
      commitTime: ${commitTime},
      interactions: ${interactions}
    `);
  };

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        border: "1px solid black",
      }}
    >
      <h1>message: {message}</h1>
      <p>Root Template</p>
      <p>page inside a template</p>
      <p>
        상위에 template 이 있고 상위 route 에 template이 없으면 상위
        template으로 override 됨
      </p>
      <h1>csr template component</h1>
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "space-between",
          overflow: "scroll",
        }}
      >
        <div>{children}</div>
        <div>
          <button
            onClick={() =>
              setMessage(["memo & non memo performance measurement"])
            }
          >
            rerendering trigger
          </button>

          <h1>Intentionally triggering a cumulative layout shift</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p>non memoized</p>
              <Suspense
                fallback={
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "red",
                    }}
                  >
                    ...loading!!!!!!!!!!!!
                  </div>
                }
              >
                <Profiler id="nonMemoizedListItem" onRender={onRenderCallback}>
                  {photos.map((photo) => (
                    <ListItem data={photo} key={photo.id} />
                  ))}
                </Profiler>
              </Suspense>
            </div>
            {/**
             * suspense의 경우, 내부 컴포넌트가 비동기적으로 동작해야지만 보여진다
             */}
            <h1>improve cumulative layout shift</h1>
            <Suspense
              fallback={
                <div
                  style={{
                    width: "550px",
                    height: "100%",
                  }}
                >
                  ...loading!!!!!!!!!!!!
                </div>
              }
            >
              <PhotosComponent2 />
            </Suspense>

            <div>
              <p>memoized</p>
              <Suspense
                fallback={
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "red",
                    }}
                  >
                    ...loading!!!!!!!!!!!!
                  </div>
                }
              >
                <Profiler id="memoizedListItem" onRender={onRenderCallback}>
                  {photos.map((photo) => (
                    <MemoizedListItem data={photo} key={photo.id} />
                  ))}
                </Profiler>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
