export default function fallback() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>This is fallback page when device is offline </h1>
      <small>Route will fallback to this page</small>
    </div>
  );
}
