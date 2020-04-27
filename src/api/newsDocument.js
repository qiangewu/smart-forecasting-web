import { fetch } from "../utils/fetch";
import QS from "qs";

/**
 * add
 * @param obj
 * @returns {Promise<*|void>}
 */
export function addNewsDocument(token, obj) {
  return fetch({
    url: "/api/news_document/add",
    method: "post",
    headers: {
      token
    },
    data: QS.stringify(obj)
  });
}

/**
 * update
 * @param obj
 * @returns {Promise<*|void>}
 */
export function updateNewsDocument(id, obj) {
  return fetch({
    url: `/api/news_document/update/${id}`,
    method: "put",
    data: QS.stringify(obj)
  });
}

/**
 * delete
 * @param id
 * @returns {Promise<*|void>}
 */
export function deleteNewsDocument(id) {
  return fetch({
    url: `/api/news_document/delete/${id}`,
    method: "delete"
  });
}

export function batchDelete(ids) {
   const data = {
    ids
  };
  return fetch({
    url: "/api/news_document/batchDelete",
    method: "delete",
    data: QS.stringify(data)
  });
}

/**
 * 查询所有
 * @returns {Promise<*|void>}
 */
export function searchNewsDocument(token, obj) {
  return fetch({
    url: "/api/news_document/search",
    method: "get",
    headers: {
      token
    },
    params: {
      page: obj.page,
      size: obj.size,
      title: obj.keywords
    }
  });
}

/**
 * 获取allocationKeyList
 * @param token
 * @param obj
 * @returns {Promise<*|void>}
 */
export function getNewsDocumentList(token) {
  return fetch({
    url: "/api/news_document/listAll",
    method: "get",
    headers: {
      token
    }
  });
}

/**
 * @param token
 * @param obj
 * @returns {Promise<*|void>}
 */
export function searchNewsListAndScrollView(token,obj) {
  return fetch({
    url: "/api/news_document/searchNewsListAndScrollView",
    method: "get",
    headers: {
      token
    },
    params: {
      page: obj.page,
      size: obj.size
    }
  });
}

/**
 * @param token
 * @param obj
 * @returns {Promise<*|void>}
 */
export function searchDocument(token,obj) {
  return fetch({
    url: "/api/news_document/searchDocument",
    method: "get",
    headers: {
      token
    },
    params: {
      page: obj.page,
      size: obj.size
    }
  });
}

