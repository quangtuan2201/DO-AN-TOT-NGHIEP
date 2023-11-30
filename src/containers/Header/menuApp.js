export const adminMenu = [
  {
    // Quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/user-doctor",
        // user-doctor",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.product-manage",
        //     link: "/system/product-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.register-package-group-or-account",
        //     link: "/system/register-package-group-or-account",
        //   },
        // ],
      },

      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
  {
    // Quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    // Quản lý chyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    // Quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
  {
    // Quản lý bài đăng
    name: "menu.admin.post",
    menus: [
      {
        name: "menu.admin.manage-post",
        link: "/system/manage-post",
      },
    ],
  },
];
