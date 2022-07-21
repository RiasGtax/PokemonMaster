/**
 * Loading panel
 * @returns 
 */
const Loading = () => {
  return (
    <>
      <div className="grid grid-cols-5">
        <div className="col-start-3 col-end-4">
          <h1 className="loadingTitle">Loading...</h1>
          <progress className="progress w-56"></progress>
        </div>
      </div>
    </>
  )
}

export default Loading;