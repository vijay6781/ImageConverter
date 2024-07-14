const roleAccess = {
  user: [
    '/area-attribute/:areaid',
    '/areaCategory',
    '/dam/images/:pageNo?/:pageSize?/:sort?/:responseType?',
    '/design-inspiration',
    '/cost-package',
    '/create',
    '/list',
    '/detail/:id',
    '/update',
    '/update/costpackage',
    '/add-Comment',
    '/updateConcept',
    '/roomConfig/:areaCategory?/:style?',
    '/room-configurator/:roomid',
    '/room-configurator-product/:productid',
    '/room-configurator-similarproduct/:Id',
    '/roomConfiguratorCategory',
    '/conceptDelete/:id',
    '/room/:id',
    '/getStatus/:type',
    '/adding-notes',
    '/uploadConceptImages',
  ],
  admin: [],
  superadmin: [],
};
const roles = Object.keys(roleAccess);
const roleRights = roleAccess;

module.exports = {
  roles,
  roleRights,
};
