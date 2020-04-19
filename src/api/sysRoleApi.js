import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _queryRoles(
  {
    page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/roles`,
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
export function _queryRole(sysRoleId) {
  return fetch({
    url: `api/roles/${sysRoleId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  name
 * @param  description
 * @param  isActive
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addRole(
  {
    name,
    description,
    isActive,
    menuIds,
  },
) {
  return fetch({
    url: `api/roles`,
    method: 'post',
    data: {
      name,
      description,
      isActive,
      menuIds,
    },
  });
}

/**
 * 更新
 * @param sysRoleId
 * @param  id
 * @param  name
 * @param  description
 * @param  isActive
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateRole(sysRoleId, {
  name,
  description,
  isActive,
  menuIds,
}) {
  return fetch({
    url: `api/roles/${sysRoleId}`,
    method: 'patch',
    data: {
      name,
      description,
      isActive,
      menuIds,
    },
  });
}

/**
 * 删除
 * @param sysRoleId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteRole(sysRoleId) {
  return fetch({
    url: `api/roles/${sysRoleId}`,
    method: 'delete',
  });
}

export default {};
