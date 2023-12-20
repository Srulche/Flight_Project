const { httpClient } = require(".");

async function signUp(userDetails) {
  return httpClient
    .post("auth/sign-up", JSON.stringify(userDetails), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      /** @type {{message: string, status: number, data: any}} */
      const responseData = JSON.parse(response.data);
      return responseData;
    });
}

async function signIn(userDetails) {
  return httpClient
    .post("auth/sign-in", JSON.stringify(userDetails), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      /** @type {{message: string, status: number, data: {access_token:string}}} */
      const responseData = JSON.parse(response.data);
      const { data } = responseData;
      if (response.status === 200) {
        const { access_token } = data;
        localStorage.setItem("token", access_token);
      }
      return responseData;
    });
}

async function me() {
  return httpClient.get("auth/me").then((response) => {
    /** @type {{message: string, status: number, data: any}} */
    const responseData = JSON.parse(response.data);
    return responseData.data;
  });
}

export { signUp, signIn, me };
