import { fetch } from '../utils/fetch';

/**
 *  查询
 * @returns {Promise<Response>}
 */
export function _queryI18NDetails() {
  return fetch({
    url: `api/i18n-details`,
    method: 'get',
  });
}

/**
 * 根据 i18nCode 查询
 * i18nCode
 * @returns {Promise<Response>}
 */
export function _queryI18NDetail(i18nCode) {
  return fetch({
    url: `api/i18n-details/${i18nCode}`,
    method: 'get',
  });
}

/**
 * 更新
 * @param  i18nCode
 * @param  details
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateI18NDetail(i18nCode, details) {
  return fetch({
    url: `api/i18n-details/${i18nCode}`,
    method: 'patch',
    data: details,
  });
}

/**
 * 删除
 * @param i18nCode
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteI18NDetail(i18nCode) {
  return fetch({
    url: `api/i18n-details/${i18nCode}`,
    method: 'delete',
  });
}

export default {};
