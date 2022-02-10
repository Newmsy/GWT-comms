import { call } from "redux-saga/effects";
import { AppHistory } from "../Configuration/InitHistory";
import { useSelector } from "react-redux";

export const StatusCodes = {
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

const baseUrl = "https://localhost:5010";

class ApiClient {
  *get(url, shouldHandleErrors = true) {
    const response = yield this.authorisedFetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      yield this.handleError(response, shouldHandleErrors);
    }

    return response;
  }

  *post(url, body, shouldHandleErrors = true, headers = {}) {
    yield console.log("called post");
    const response = yield this.authorisedFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      yield this.handleError(response, shouldHandleErrors);
    }

    return response;
  }

  *delete(url, body, shouldHandleErrors = true) {
    const response = yield this.authorisedFetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      yield this.handleError(response, shouldHandleErrors);
    }

    return response;
  }

  *put(url, body, shouldHandleErrors = true) {
    const response = yield this.authorisedFetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      yield this.handleError(response, shouldHandleErrors);
    }

    return response;
  }

  getBaseUrl() {
    return baseUrl;
  }

  handleError(shouldHandeError) {
    if (shouldHandeError) {
      AppHistory.history.push("/error");
    }
  }

  *authorisedFetch(url, options) {
    if (options.headers == null) options.headers = {};

    const baseUrl = yield this.getBaseUrl();

    return yield call(fetch, `${baseUrl}${url}`, options);
  }
}

class HookApiClient {
  constructor({ token, apiUrl }) {
    this.token = token;
    this.apiUrl = apiUrl;
  }

  async get(url, shouldHandleErrors = true) {
    const response = await this.authorisedFetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      await this.handleError(response, shouldHandleErrors);
    }

    return response;
  }

  async post(url, body, shouldHandleErrors = true, optionalHeaders = {}) {
    const response = await this.authorisedFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...optionalHeaders },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      await this.handleError(response, shouldHandleErrors);
    }

    return response;
  }

  async delete(url, body, shouldHandleErrors = true) {
    const response = await this.authorisedFetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      await this.handleError(response, shouldHandleErrors);
    }

    return response;
  }

  async put(url, body, shouldHandleErrors = true) {
    const response = await this.authorisedFetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      await this.handleError(response, shouldHandleErrors);
    }

    return response;
  }

  async authorisedFetch(url, options) {
    if (options.headers == null) options.headers = {};

    options.headers.Authorization = `Bearer ${this.token}`;

    return await fetch(`${this.getBaseUrl()}${url}`, options);
  }
  getBaseUrl() {
    return baseUrl;
  }

  async handleError(response, shouldHandeError) {
    if (shouldHandeError) {
      if (response.status === StatusCodes.FORBIDDEN) {
        AppHistory.history.push("/no-access");
      } else {
        AppHistory.history.push("/error");
      }
    }
  }
}

export const useApiClientState = () => {
  const apiUrl = useSelector((state) => state.config.configuration?.apiUrl);
  const token = useSelector((state) => state.auth.user?.access_token);
  return {
    apiUrl: apiUrl ?? "",
    token: token ?? "",
  };
};

export { ApiClient, HookApiClient };
