import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _querySysUserRoles(
  {
    page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/sys-user-roles`,
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
export function _querySysUserRole(sysUserRoleId) {
  return fetch({
    url: `api/sys-user-roles/${sysUserRoleId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  id
 * @param  userId
 * @param  roleId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addSysUserRole(
  {
    id,
    userId,
    roleId,
  },
) {
  return fetch({
    url: `api/sys-user-roles`,
    method: 'post',
    data: {
      id,
      userId,
      roleId,
    },
  });
}

/**
 * 更新
 * @param sysUserRoleId
 * @param  id
 * @param  userId
 * @param  roleId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateSysUserRole(sysUserRoleId, {
  id,
  userId,
  roleId,
}) {
  return fetch({
    url: `api/sys-user-roles/${sysUserRoleId}`,
    method: 'patch',
    data: {
      id,
      userId,
      roleId,
    },
  });
}

/**
 * 删除
 * @param sysUserRoleId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteSysUserRole(sysUserRoleId) {
  return fetch({
    url: `api/sys-user-roles/${sysUserRoleId}`,
    method: 'delete',
  });
}

export default {};
