export const adminMenu = [
  {
    // Quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        //Quản lý CRUD
        name: "menu.admin.crud-redux",
        link: "/system/user-manage",
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
      {
        //Quản lý lịch sử khám
        name: "menu.doctor.manage-historys-booking",
        link: "/doctor/manage-historys-booking",
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
    // Quản lý thống kê
    name: "menu.admin.statistics",
    menus: [
      {
        name: "menu.admin.manage-statistics-booking",
        link: "/system/statistics-manage",
      },
      {
        name: "menu.admin.manage-statistics-patient",
        link: "/system/statistics-patients",
      },
      {
        name: "menu.admin.manage-statistics-doctors",
        link: "/system/statistics-doctors",
      },
      {
        name: "menu.admin.manage-statistics-specialtys",
        link: "/system/statistics-specialtys",
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
      {
        //Quản lý bệnh nhân kham bẹnh
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
      {
        //Quản lý lịch sử khám
        name: "menu.doctor.manage-historys-booking",
        link: "/doctor/manage-historys-booking",
      },
    ],
  },
];
