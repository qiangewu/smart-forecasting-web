import { fetch } from '../utils/fetch';


/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _queryAllDictionaries(query) {
  console.log(query);
  return fetch({
    url: `api/dictionaries`,
    method: 'get',
    params: {
      scope: 'all',
      ...query,
    },
  });
}

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _queryDictionaries(
  {
    page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/dictionaries`,
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
export function _queryDictionary(dictionaryId) {
  return fetch({
    url: `api/dictionary/${dictionaryId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  id
 * @param  name
 * @param  parentId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addDictionary(
  {
    id,
    name,
    code,
    isActive,
    remark,
  },
) {
  return fetch({
    url: `api/dictionary`,
    method: 'post',
    data: {
      id,
      name,
      code,
      isActive,
      remark,
    },
  });
}

/**
 * 更新
 * @param dictionaryId
 * @param  id
 * @param  createAt
 * @param  name
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateDictionary(dictionaryId, {
  name,
  code,
  isActive,
  remark,
}) {
  return fetch({
    url: `api/dictionary/${dictionaryId}`,
    method: 'patch',
    data: {
      name,
      code,
      isActive,
      remark,
    },
  });
}

/**
 * 删除
 * @param dictionaryId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteDictionary(dictionaryId) {
  return fetch({
    url: `api/dictionary/${dictionaryId}`,
    method: 'delete',
  });
}

export default {};
