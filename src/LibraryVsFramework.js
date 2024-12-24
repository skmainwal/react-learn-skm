import React from "react";
import PropTypes from "prop-types";

function LibraryVsFramework({
  libraryName,
  frameworkName,
  libraryDescription,
  frameworkDescription,
}) {
  return (
    <div className="library-vs-framework">
      <h2>Library vs Framework</h2>
      <div className="comparison">
        <div className="library">
          <h3>{libraryName}</h3>
          <p>{libraryDescription}</p>
        </div>
        <div className="framework">
          <h3>{frameworkName}</h3>
          <p>{frameworkDescription}</p>
        </div>
      </div>
    </div>
  );
}

LibraryVsFramework.propTypes = {
  libraryName: PropTypes.string.isRequired,
  frameworkName: PropTypes.string.isRequired,
  libraryDescription: PropTypes.string.isRequired,
  frameworkDescription: PropTypes.string.isRequired,
};

export default LibraryVsFramework;
