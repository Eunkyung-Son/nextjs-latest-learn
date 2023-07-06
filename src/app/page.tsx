import { Metadata } from "next";
import MemoizedListItem, {
  type Photo,
} from "../../components/MemoizedListItem/MemoizedListItem";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EUNKYUNG",
  description: "nextjs practice",
};
// To minimize client-server waterfalls, we recommend this pattern to fetch data in parallel:
// 이렇게 하지 않으면 클라이언트가 이전 요청의 응답을 기다리는 동안 다음 요청을 보내지 못하고 차례로 실행됨

/**
 * 
 * @description 마이크로태스크 큐(Microtask Queue)와 이벤트 루프(Event Loop)의 작동 방식 때문에 병렬 요청을 사용할 때와 따로따로 실행할 때의 동작이 다릅니다.

마이크로태스크 큐는 비동기 작업인 프로미스의 콜백 함수나 await 키워드를 통해 생성된 마이크로태스크를 순서대로 처리하는 큐입니다. 이벤트 루프는 메인 스레드에서 실행되는 이벤트와 마이크로태스크를 감시하며, 이벤트 처리가 없을 때 마이크로태스크를 처리합니다.

병렬 요청을 사용하면 여러 개의 프로미스가 동시에 생성되고, 이들은 병렬로 실행되어 마이크로태스크 큐에 들어갑니다. 이때 이벤트 루프는 이들 프로미스가 순서대로 완료될 때까지 기다리지 않고 가능한한 빠르게 처리합니다. 따라서 병렬로 실행된 요청들은 비동기적으로 동시에 진행되므로 전체적인 시간이 줄어들고 클라이언트의 대기 시간이 최소화됩니다.

반면에 따로따로 실행하는 경우, 하나의 비동기 작업이 완료될 때까지 기다려야 다음 작업이 실행됩니다. 이때 이전 작업의 콜백 함수 또는 await 키워드로 생성된 마이크로태스크가 마이크로태스크 큐에 들어가며, 이벤트 루프는 이들 마이크로태스크를 순서대로 처리합니다. 따라서 각 작업이 이전 작업의 완료를 기다려야 하므로 순차적으로 실행되어 전체적인 시간이 증가하게 되고 클라이언트의 대기 시간이 늘어나게 됩니다.

따라서, 병렬 요청을 통해 여러 작업을 동시에 실행하면 마이크로태스크 큐와 이벤트 루프의 작동 방식을 최대한 활용하여 클라이언트-서버 간의 지연 시간을 최소화할 수 있습니다.
 * 
 */
async function getPhotoById(id: number) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${id}`,
    {
      cache: "no-cache",
    }
  );
  const data = await res.json();
  return data as Photo;
}

export async function getPhotos() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data as Photo[];
}

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
  // Initiate both requests in parallel
  const photoById = getPhotoById(1);
  const photos = getPhotos();

  const [photo, photoList] = await Promise.all([photoById, photos]);

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        border: "1px solid black",
        width: "500px",
      }}
    >
      <h1>ssr page component</h1>
      <Link href="/dashboard" />

      <MemoizedListItem key={photo.id} data={photo} />
      {photoList.map((photo) => (
        <MemoizedListItem key={photo.id} data={photo} />
      ))}
    </div>
  );
}
