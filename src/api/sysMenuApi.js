import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _queryMenus() {
  return fetch({
    url: `api/menus`,
    method: 'get',
  });
}

/**
 * 根据 id 查询
 * @returns {Promise<Response>}
 */
export function _queryMenu(sysMenuId) {
  return fetch({
    url: `api/menus/${sysMenuId}`,
    method: 'get',
  });
}

/**
 * 新增
 * @param  id
 * @param  name
 * @param  applicationId
 * @param  parentId
 * @param  path
 * @param  type
 * @param  icon
 * @param  code
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _addMenu(
  {
    id,
    name,
    applicationId,
    parentId,
    path,
    type,
    icon,
    code,
  },
) {
  return fetch({
    url: `api/menus`,
    method: 'post',
    data: {
      id,
      name,
      applicationId,
      parentId,
      path,
      type,
      icon,
      code,
    },
  });
}

/**
 * 更新
 * @param sysMenuId
 * @param  id
 * @param  name
 * @param  type
 * @param  parentId
 * @param  path
 * @param  icon
 * @param  code
 * @param  isActive
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateMenu(sysMenuId, {
  id,
  name,
  parentId,
  path,
  icon,
  code,
  type,
  isActive,
}) {
  return fetch({
    url: `api/menus/${sysMenuId}`,
    method: 'patch',
    data: {
      id,
      name,
      parentId,
      path,
      icon,
      code,
      type,
      isActive,
    },
  });
}

/**
 * 删除
 * @param sysMenuId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteMenu(sysMenuId) {
  return fetch({
    url: `api/menus/${sysMenuId}`,
    method: 'delete',
  });
}


/**
 * 上移
 * @param sysMenuId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _upMenu(sysMenuId) {
  return fetch({
    url: `api/menus/${sysMenuId}/up`,
    method: 'patch',
  });
}


/**
 * 下移
 * @param sysMenuId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _downMenu(sysMenuId) {
  return fetch({
    url: `api/menus/${sysMenuId}/down`,
    method: 'patch',
  });
}

/**
 * 树形 构成
 * @param x
 * @param data
 * @returns {{children: *}}
 * @private
 */
export function _treeGenerator(x, data) {
  const children = data
    .filter(child => child.parentId === x.id)
    .map(child => _treeGenerator(child, data));
  return {
    ...x,
    children,
  };
}

export default {};
