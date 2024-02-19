export default function getPriceQueryParams(searchParams, key, value) {
  const hasValueInParams = searchParams.has(key);

  if (hasValueInParams && value) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else {
    searchParams.delete(key);
  }

  return searchParams;
}
