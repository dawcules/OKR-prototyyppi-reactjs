const JsonAPI = () => {
  const rootUrl = "http://localhost:3001";

  const fetchObjective = async (url) => {
    const notes = await fetch(rootUrl + "/" + url);
    const json = notes.json();
    console.log(notes);
    return json;
  };

  const postObjAsync = async (data, url) => {
    console.log(JSON.stringify(data));
    const res = await fetch(rootUrl + "/" + url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  };

  const putObjAsync = async (data, url) => {
    const { id } = data || null;
    if (id) {
      const res = await fetch(rootUrl + "/" + url + "/" + id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res;
    } else {
      return "Invalid id";
    }
  };

  return {
    postObjAsync,
    fetchObjective,
    putObjAsync
};
}

export default JsonAPI;
