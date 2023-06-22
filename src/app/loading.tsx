/**
 *
 * loading 컴포넌트는 ssr 진행중일 때 보여짐 csr 은 x
 */
export default function Loading() {
  return (
    <div
      style={{
        width: "500px",
      }}
    >
      Loading...
    </div>
  );
}
