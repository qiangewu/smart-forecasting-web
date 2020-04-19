import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _queryUsers(
  {
    page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/users`,
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
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _asyncUsers() {
  return fetch({
    url: `api/async-users`,
    method: 'post',
  });
}


/**
 * 根据 id 查询
 * @returns {Promise<Response>}
 */
export function _queryUser(sysUserId) {
  return fetch({
    url: `api/users/${sysUserId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  id
 * @param  loginName
 * @param  userName
 * @param  createAt
 * @param  isActive
 * @param  email
 * @param  language
 * @param  password
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addUser(
  {
    id,
    loginName,
    userName,
    isActive,
    email,
    sex,
    language,
    password,
    roleIds,
    organizationIds,
  },
) {
  return fetch({
    url: `api/users`,
    method: 'post',
    data: {
      id,
      loginName,
      userName,
      isActive,
      email,
      sex,
      language,
      password,
      roleIds,
      organizationIds,
    },
  });
}

/**
 * 更新
 * @param sysUserId
 * @param  id
 * @param organizationId
 * @param  loginName
 * @param  userName
 * @param  isActive
 * @param  email
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateUser(sysUserId, organizationId, {
  loginName,
  userName,
  isActive,
  email,
  sex,
  roleIds,
  organizationIds,
}) {
  return fetch({
    url: `api/users/${sysUserId}`,
    method: 'patch',
    data: {
      loginName,
      userName,
      isActive,
      email,
      sex,
      roleIds,
      organizationIds,
    },
  });
}

/**
 * 删除
 * @param sysUserId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteUser(sysUserId) {
  return fetch({
    url: `api/users/${sysUserId}`,
    method: 'delete',
  });
}

/**
 * 更新用户尼玛
 * @param newPassword
 * @param oldPassword
 * @returns {Promise<null|*>}
 * @private
 */
export function _updateUserPassword(
  {
    newPassword,
    oldPassword,
  },
) {
  return fetch({
    url: `api/password`,
    method: 'patch',
    data: {
      oldPassword,
      newPassword,
    },
  });
}

export default {};
