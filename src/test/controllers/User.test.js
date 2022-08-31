import {
  getUser,
  createUser,
  findUser,
  deleteUser,
} from "../../controllers/UserController.js";

jest.mock("../../services/userService.js", () => {
  const mockUsers = [
    {
      id: "1",
      login: "login_1",
      password: "password_1",
      age: 20,
    },
    {
      id: "2",
      login: "login_2",
      password: "password_2",
      age: 25,
    },
  ];

  return {
    mockUsers,
    getUsers: jest.fn().mockResolvedValue(mockUsers),
    getUserById: jest.fn().mockResolvedValue(mockUsers[0]),
    addUser: jest.fn().mockImplementation(({ login, password, age }) => ({
      ...mockUsers[0],
      login,
      password,
      age,
    })),
    logicallyDeleteUserById: jest.fn(),
  };
});

const mockModule = jest.requireMock("../../services/userService.js");

describe("User controller", () => {
  const { mockUsers } = mockModule;

  it("method getUsers should return users", async () => {
    const json = jest.fn();

    const req = {};
    const res = {
      json,
    };
    const expectedValue = {
      data: mockUsers,
    };

    await getUser(req, res);
    expect(json).toBeCalledWith(expectedValue);
  });

  // it('method createUser should create user', async () => {
  //     const { addUser } = mockModule;
  //     const json = jest.fn();
  //     const req = {
  //         body: {
  //             login: 'login',
  //             password: 'password',
  //             age: 25,
  //             isDeleted: false
  //         }
  //     };
  //     const res = {
  //         json
  //     }

  //     await createUser(req, res);

  //     expect(addUser).toBeCalledWith({
  //         login: 'login',
  //         password: 'password',
  //         age: 25
  //     });
  //     expect(json).toBeCalledWith({
  //         ...mockUsers[0],
  //         login: 'login',
  //         password: 'password',
  //         age: 25
  //     });
  // });

  it("method getUserById should return user by id", async () => {
    const { getUserById } = mockModule;
    getUserById.mockResolvedValue(mockUsers[0]);
    const json = jest.fn();

    const req = {
      params: {
        id: "1",
      },
    };
    const res = {
      json,
    };

    await findUser(req, res);

    expect(getUserById).toBeCalledWith("1");
    expect(json).toBeCalledWith(mockUsers[0]);
    expect("1").toEqual(mockUsers[0].id);
    expect("3").not.toBe(mockUsers[0].id);
  });

  it("method deleteUser should delete user by id", async () => {
    const { logicallyDeleteUserById } = mockModule;
    const json = jest.fn();

    const req = {
      params: {
        id: "1",
      },
    };
    const res = {
      json,
    };

    await deleteUser(req, res);

    const deletedRecord = {
      count: undefined,
      message: "User deleted successfully",
    };

    expect(logicallyDeleteUserById).toBeCalledWith("1");
    expect(json).toBeCalledWith(deletedRecord);
  });
});
