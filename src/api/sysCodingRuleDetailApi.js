import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _querySysCodingRuleDetails(
  codingRuleId,
  {
    page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/sys-coding-rule/${codingRuleId}/details`,
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
export function _querySysCodingRuleDetail(
  codingRuleId,
  sysCodingRuleDetailId,
) {
  return fetch({
    url: `api/sys-coding-rule/${codingRuleId}/details/${sysCodingRuleDetailId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  codingRuleId
 * @param  type
 * @param  node
 * @param  review
 * @param  sysCodingRuleId
 * @param  cycle
 * @param  currentValue
 * @param  step
 * @param  length
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addSysCodingRuleDetail(
  codingRuleId,
  {
    type,
    node,
    review,
    sysCodingRuleId,
    cycle,
    currentValue,
    step,
    length,
  },
) {
  return fetch({
    url: `api/sys-coding-rule/${codingRuleId}/details`,
    method: 'post',
    data: {
      type,
      node,
      review,
      sysCodingRuleId,
      cycle,
      currentValue,
      step,
      length,
    },
  });
}

/**
 * 更新
 * @param  codingRuleId
 * @param sysCodingRuleDetailId
 * @param  type
 * @param  node
 * @param  review
 * @param  sysCodingRuleId
 * @param  cycle
 * @param  currentValue
 * @param  step
 * @param  length
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateSysCodingRuleDetail(
  codingRuleId,
  sysCodingRuleDetailId, {
    type,
    node,
    review,
    sysCodingRuleId,
    cycle,
    currentValue,
    step,
    length,
  },
) {
  return fetch({
    url: `api/sys-coding-rule/${codingRuleId}/details/${sysCodingRuleDetailId}`,
    method: 'patch',
    data: {
      type,
      node,
      review,
      sysCodingRuleId,
      cycle,
      currentValue,
      step,
      length,
    },
  });
}

/**
 * 删除
 * @param  codingRuleId
 * @param sysCodingRuleDetailId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteSysCodingRuleDetail(
  codingRuleId,
  sysCodingRuleDetailId,
) {
  return fetch({
    url: `api/sys-coding-rule/${codingRuleId}/details/${sysCodingRuleDetailId}`,
    method: 'delete',
  });
}

/**
 * 上移
 * @param codingRuleId
 * @param sysCodingRuleDetailId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _upSysCodingRuleDetail(codingRuleId, sysCodingRuleDetailId) {
  return fetch({
    url: `api/sys-coding-rule/${codingRuleId}/details/up/${sysCodingRuleDetailId}`,
    method: 'patch',
  });
}


/**
 * 下移
 * @param codingRuleId
 * @param sysCodingRuleDetailId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _downSysCodingRuleDetail(codingRuleId, sysCodingRuleDetailId) {
  return fetch({
    url: `api/sys-coding-rule/${codingRuleId}/details/down/${sysCodingRuleDetailId}`,
    method: 'patch',
  });
}

export default {};
