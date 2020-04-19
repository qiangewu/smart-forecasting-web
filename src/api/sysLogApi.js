import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _queryLogs(
  {
    startAt, endAt, event, page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/logs`,
    method: 'get',
    params: {
      startAt,
      endAt,
      event,
      page,
      size,
      direction,
      sort,
    },
  });
}

/**
 * 搜索列表
 * @returns {Promise<Response>}
 */
export function _searchLogs(
  {
    start, end, page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/logs-search`,
    method: 'get',
    params: {
      start,
      end,
      page,
      size,
      direction,
      sort,
    },
  });
}

/**
 * 根据 id 查询
 * @returns {Promise<Response>}
 */
export function _queryLog(sysLogId) {
  return fetch({
    url: `api/logs/${sysLogId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  id
 * @param  userId
 * @param  createAt
 * @param  desc
 * @param  url
 * @param  isDeleted
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addLog(
  {
    id,
    userId,
    createAt,
    desc,
    url,
    isDeleted,
  },
) {
  return fetch({
    url: `api/logs`,
    method: 'post',
    data: {
      id,
      userId,
      createAt,
      desc,
      url,
      isDeleted,
    },
  });
}

/**
 * 更新
 * @param sysLogId
 * @param  id
 * @param  userId
 * @param  createAt
 * @param  desc
 * @param  url
 * @param  isDeleted
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateLog(sysLogId, {
  id,
  userId,
  createAt,
  desc,
  url,
  isDeleted,
}) {
  return fetch({
    url: `api/logs/${sysLogId}`,
    method: 'patch',
    data: {
      id,
      userId,
      createAt,
      desc,
      url,
      isDeleted,
    },
  });
}

/**
 * 删除
 * @param sysLogId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteLog(sysLogId) {
  return fetch({
    url: `api/logs/${sysLogId}`,
    method: 'delete',
  });
}

export default {};
