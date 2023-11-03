exports.joinFileToBaseURL = (req, file) => {
  if (file) {
    return (
      req.protocol +
      "://" +
      req.get("host") +
      "/" +
      file.replace("uploads/", "")
    );
  } else {
    return null;
  }
};
