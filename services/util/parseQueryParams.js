const parseQueryParams = (paramString) => {
  const result = [];
  const dataPairs = paramString.split('&');
  dataPairs.forEach(pair => {
    const [key, value] = pair.split('=');
    result[key] = value;
  });
  return result
}

export default parseQueryParams;