const send = async (url: RequestInfo, options?: RequestInit) => {
  const response = await fetch(url, options);
  return response;
};

const get = async (url: RequestInfo, options?: RequestInit) => {
  const response = await send(url, {
    ...options,
    method: "GET",
  });
  return response;
};

const post = async (url: RequestInfo, options?: RequestInit) => {
  const response = await send(url, {
    ...options,
    method: "POST",
  });
  return response;
};

const put = async (url: RequestInfo, options?: RequestInit) => {
  const response = await send(url, {
    ...options,
    method: "PUT",
  });
  return response;
};

const remove = async (url: RequestInfo, options?: RequestInit) => {
  const response = await send(url, {
    ...options,
    method: "DELETE",
  });
  return response;
};

export { get, post, put, remove };
