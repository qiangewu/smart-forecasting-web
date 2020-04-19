import { fetch } from '../utils/fetch';

/**
 * 查询列表
 * @returns {Promise<Response>}
 */
export function _queryOrganizations(
  {
    page, size, direction, sort,
  },
) {
  return fetch({
    url: `api/organizations`,
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
 * 查询相关权限列表
 * @returns {Promise<Response>}
 */
export function _queryRelationOrganizations() {
  return fetch({
    url: `api/relation-organizations`,
    method: 'get',
  });
}

/**
 * 根据 id 查询
 * @returns {Promise<Response>}
 */
export function _queryOrganization(organizationId) {
  return fetch({
    url: `api/organizations/${organizationId}`,
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
export function _addOrganization(
  {
    id,
    name,
    parentId,
  },
) {
  return fetch({
    url: `api/organizations`,
    method: 'post',
    data: {
      id,
      name,
      parentId,
    },
  });
}

/**
 * 更新
 * @param organizationId
 * @param  id
 * @param  createAt
 * @param  name
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _updateOrganization(organizationId, {
  id,
  name,
  parentId,

}) {
  return fetch({
    url: `api/organizations/${organizationId}`,
    method: 'patch',
    data: {
      id,
      name,
      parentId,

    },
  });
}

function treeGenerator(x, data) {
  const children = data
    .filter(child => child.parentId === x.id)
    .map(child => treeGenerator(child, data));
  return {
    ...x,
    children,
  };
}

export async function _queryOrganizationTree() {
  const result = await _queryOrganizations({});
  const { organizations } = result.data;
  return [
    {
      id: null,
      name: '根节点',
      children: organizations.filter(x => !x.parentId)
        .map(x => treeGenerator(x, organizations)),
    },
  ];
}


/**
 * 删除
 * @param organizationId
 * @returns {Promise<*|undefined>}
 * @private
 */
export function _deleteOrganization(organizationId) {
  return fetch({
    url: `api/organizations/${organizationId}`,
    method: 'delete',
  });
}

export default {};
