import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _querySysRoleMenus(
  {
    page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/sys-role-menus`,
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
export function _querySysRoleMenu(sysRoleMenuId) {
  return fetch({
    url: `api/sys-role-menus/${sysRoleMenuId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  id
 * @param  menuId
 * @param  roleId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addSysRoleMenu(
  {
    id,
    menuId,
    roleId,
  },
) {
  return fetch({
    url: `api/sys-role-menus`,
    method: 'post',
    data: {
      id,
      menuId,
      roleId,
    },
  });
}

/**
 * 更新
 * @param sysRoleMenuId
 * @param  id
 * @param  menuId
 * @param  roleId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateSysRoleMenu(sysRoleMenuId, {
  id,
  menuId,
  roleId,
}) {
  return fetch({
    url: `api/sys-role-menus/${sysRoleMenuId}`,
    method: 'patch',
    data: {
      id,
      menuId,
      roleId,
    },
  });
}

/**
 * 删除
 * @param sysRoleMenuId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteSysRoleMenu(sysRoleMenuId) {
  return fetch({
    url: `api/sys-role-menus/${sysRoleMenuId}`,
    method: 'delete',
  });
}

export default {};
