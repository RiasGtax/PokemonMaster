const Loading = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <h1 className="loadingTitle">Loading...</h1>
          <progress className="progress w-56"></progress>
        </div>
      </div>
    </>
  )
}

export default Loading;