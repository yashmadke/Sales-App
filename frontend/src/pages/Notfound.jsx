const NotFound = () => {
  return (
    <>
      {/* displaying a message for the 404 Not Found error */}
      <div className="text-center mt-4 fw-bold bg-info bg-opacity-10 border border-2 rounded border-info mx-5 py-2">
        <h1 className="text-info fs-1 my-3">404! Not Found</h1>
        <p className="fs-6">
          {/* message indicating unauthorized access */}
          You are not authorized to access this page! Thank you
        </p>
      </div>
    </>
  );
};

export default NotFound;
