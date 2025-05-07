const PageWrapper = ({ className, children, height, width }) => {
    const pageStyle = {
      minHeight: `${height ? height : "92vh"}`,
      width: `${width ? width : "100%"}`,
    };
  
    return (
      <main style={pageStyle} className={`${className ? className : ""}`}>
        {children}
      </main>
    );
  };
  
  export default PageWrapper;
  