import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _querySysCodingRules(
  {
    page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/sys-coding-rules`,
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
export function _querySysCodingRule(sysCodingRuleId) {
  return fetch({
    url: `api/sys-coding-rules/${sysCodingRuleId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  code
 * @param  name
 * @param  review
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addSysCodingRule(
  {
    code,
    name,
    review,
  },
) {
  return fetch({
    url: `api/sys-coding-rules`,
    method: 'post',
    data: {
      code,
      name,
      review,
    },
  });
}

/**
 * 更新
 * @param sysCodingRuleId
 * @param  code
 * @param  name
 * @param  review
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateSysCodingRule(sysCodingRuleId, {
  code,
  name,
  review,
}) {
  return fetch({
    url: `api/sys-coding-rules/${sysCodingRuleId}`,
    method: 'patch',
    data: {
      code,
      name,
      review,
    },
  });
}

/**
 * 删除
 * @param sysCodingRuleId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteSysCodingRule(sysCodingRuleId) {
  return fetch({
    url: `api/sys-coding-rules/${sysCodingRuleId}`,
    method: 'delete',
  });
}

export default {};
