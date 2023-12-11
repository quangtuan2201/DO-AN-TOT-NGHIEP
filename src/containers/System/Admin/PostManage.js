function PostManege() {
  return (
    <div className="container mt-30">
      <form>
        <div className="row mt-5">
          <div className="mb-3 col-3">
            <label for="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="mb-3 col-3">
            <label for="pwd" className="form-label">
              Mật khẩu:
            </label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="password"
            />
          </div>
          <div className="mb-3 col-3">
            <label for="pwd" className="form-label">
              Tên:
            </label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="firstName"
            />
          </div>
          <div className="mb-3 col-3">
            <label for="pwd" className="form-label">
              Họ:
            </label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="lastName"
            />
          </div>
          <div className="mb-3 col-4">
            <label for="pwd" className="form-label">
              Số điện thoại:
            </label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="phoneNumber"
            />
          </div>
          <div className="mb-3 col-8">
            <label for="pwd" className="form-label">
              Địa chỉ:
            </label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="address"
            />
          </div>
          <div className="mb-3 col-3">
            <label for="pwd" className="form-label">
              Giới tính:
            </label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="gender"
            />
          </div>
          <div className="mb-3 col-3">
            <label for="pwd" className="form-label">
              Chức danh:
            </label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="postitionId"
            />
          </div>
          <div className="mb-3 col-3">
            <label for="pwd" className="form-label">
              Vai trò:
            </label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="roleId"
            />
          </div>
          <div className="mb-3 col-3">
            <label for="pwd" className="form-label">
              Ảnh đại diện:
            </label>
            <input
              type="file"
              className="form-control"
              id="pwd"
              placeholder=""
              name="image"
            />
          </div>
          <div className="form-check ">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                name="remember"
              />
              Remember me
            </label>
          </div>
          <button type="button" className=" col-1 btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default PostManege;
