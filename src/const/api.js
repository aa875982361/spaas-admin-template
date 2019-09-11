const apiVersion = '/api/v1';
const deepexiDashboard = `/deepexi-dashboard${apiVersion}`;
const enterpriseContact = `/spaas-enterprise-contact${apiVersion}`;
const consoleApi = `/spaas-console-api${apiVersion}`;

// 根据thirdId获取头部导航栏列表
export const getXpaasTag = thirdId =>
  `${deepexiDashboard}/tenantComponents/xpaas/getXpaasTag/${thirdId}`;

// 获取头部导航栏thirdId
export const adminUser = `${enterpriseContact}/users/adminUser`;

// 根据appId获取左侧菜单
export const userMenuTree = appId => `${consoleApi}/xpassPermission/userMenuTree/${appId}`;
