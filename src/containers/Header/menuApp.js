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
        //Quản lý CRUD
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        //Quản lý doctor
        name: "menu.admin.manage-doctor",
        link: "/system/user-doctor",
      },
      {
        // Quản lý người dùng
        //Quản lý kế hoạch khám bệnh của bác sĩ
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    // Quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/clinic-manage",
      },
    ],
  },
  {
    // Quản lý chyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/specialty-manage",
      },
    ],
  },
  {
    // Quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/handbook-manage",
      },
    ],
  },
  {
    // Quản lý bài đăng
    name: "menu.admin.post",
    menus: [
      {
        name: "menu.admin.manage-post",
        link: "/system/post-manage",
      },
    ],
  },
];
export const doctorMenu = [
  {
    name: "menu.admin.manage-doctor",
    menus: [
      {
        //Quản lý kế hoạch khám bệnh của bác sĩ
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];
