// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// GET method to get all comments in the comments collection
export async function getComments(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/comments`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch comments");
  }

  const data = await response.json();
  return data;
}

// CREATE Comments ("COMMENTS") POST method
export async function createComment(comment) {
  // payload object is created, which contains the comment data that will be sent to the backend. The key is comment, and the value is the argument passed to the function.
  // organizes the data that needs to be sent to the backend. The backend typically expects data in a specific format, and payload ensures that.

  const user = JSON.parse(localStorage.getItem("user")); // gets user object from localStorage as object
  const post_id = localStorage.getItem("post_id"); // gets post_id from local storage
  const picture_id = localStorage.getItem("picture_id");

  const payload = {
    comment: comment,
    post_id: post_id,
    picture_id: picture_id,
    user: user.username,
  };

  const requestOptions = {
    method: "POST",
    // headers includes an Authorization header (using the token from localStorage) and Content-Type: "application/json"
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      // The content type is essential because it tells the server that the request body contains JSON.
      "Content-Type": "application/json",
    },
    // JSON.stringify(payload) converts the JavaScript object to JSON, the format most APIs expect in a POST request body.
    body: JSON.stringify(payload),
  };

  // Sends a POST request to the /comments endpoint using the requestOptions. The server will create a new comment with the data in payload.
  const response = await fetch(`${BACKEND_URL}/comments`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to create comment");
  }

  // Parses the server’s JSON response and returns the parsed data.
  const data = await response.json();
  return data;
}
