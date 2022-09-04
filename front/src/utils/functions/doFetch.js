export async function doFetch({
  method,
  url,
  body,
  token,
  isMultipartFormData,
}) {
  let data = {}
  let isLoading = true
  let error = false
  const requestOptions = {
    method,
    headers: {},
  }
  if (body) {
    if (isMultipartFormData) requestOptions.body = body
    else {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }
  }
  if (token) {
    requestOptions.headers['Authorization'] = 'Bearer ' + token
  }
  try {
    const response = await fetch(url, requestOptions)
    data = await response.json()
    if(!response.ok) error = data.error
    isLoading = false
  } catch (errorCatched) {
    error = errorCatched
  }
  return {
    isLoading,
    data,
    error,
  }
}
