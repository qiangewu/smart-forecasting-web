import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _findAllSysDictData(sysDictId) {
  return fetch({
    url: `api/sys-dict/${sysDictId}/data/all`,
    method: 'get',
    params: {
      sysDictId,
    },
  });
}

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _querySysDictData(
  sysDictId,
  {
    page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/sys-dict/${sysDictId}/data`,
    method: 'get',
    params: {
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
export function _querySysDictDataById(sysDictId, sysDictDataId) {
  return fetch({
    url: `api/sys-dict/${sysDictId}/data/${sysDictDataId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  code
 * @param  name
 * @param  detail
 * @param  sysDictId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addSysDictData(
  sysDictId,
  {
    code,
    name,
    detail,
  },
) {
  return fetch({
    url: `api/sys-dict/${sysDictId}/data`,
    method: 'post',
    data: {
      sysDictId,
      code,
      name,
      detail,
    },
  });
}

/**
 * 更新
 * @param sysDictDataId
 * @param  code
 * @param  name
 * @param  detail
 * @param  sysDictId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateSysDictData(
  sysDictId,
  sysDictDataId, {
    code,
    name,
    detail,
  },
) {
  return fetch({
    url: `api/sys-dict/${sysDictId}/data/${sysDictDataId}`,
    method: 'patch',
    data: {
      code,
      name,
      detail,
      sysDictId,
    },
  });
}

/**
 * 删除
 * @param sysDictId
 * @param sysDictDataId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteSysDictData(sysDictId, sysDictDataId) {
  return fetch({
    url: `api/sys-dict/${sysDictId}/data/${sysDictDataId}`,
    method: 'delete',
  });
}

/**
 * 上移
 * @param sysDictId
 * @param sysDictDataId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _upSysDictData(sysDictId, sysDictDataId) {
  return fetch({
    url: `api/sys-dict/${sysDictId}/data/up/${sysDictDataId}`,
    method: 'patch',
  });
}


/**
 * 下移
 * @param sysDictId
 * @param sysDictDataId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _downSysDictData(sysDictId, sysDictDataId) {
  return fetch({
    url: `api/sys-dict/${sysDictId}/data/down/${sysDictDataId}`,
    method: 'patch',
  });
}

export default {};
