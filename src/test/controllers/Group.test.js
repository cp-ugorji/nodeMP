import { json } from "body-parser";
import {
  createGroup,
  getAllGroups,
  getOneGroup,
  deleteGroup,
} from "../../controllers/GroupController.js";

jest.mock("../../services/groupService.js", () => {
  const mockGroups = [
    {
      id: "1",
      name: "group_1",
      permission: ["READ", "WRITE"],
    },
    {
      id: "2",
      name: "group_2",
      permission: ["READ", "DELETE"],
    },
  ];

  return {
    mockGroups,
    findAllGroups: jest.fn().mockResolvedValue(mockGroups),
    findOneGroup: jest.fn().mockResolvedValue(mockGroups[0]),
    addGroup: jest.fn().mockImplementation(({ name, permission }) => ({
      id: "1",
      name,
      permission,
    })),
    deleteGroupById: jest.fn(),
  };
});

const mockModule = jest.requireMock("../../services/groupService.js");

describe("Group controller", () => {
  const { mockGroups } = mockModule;

  it("method addGroup should create group with new data", async () => {
    const { addGroup } = mockModule;
    const status = jest.fn().mockReturnThis();
    const json = jest.fn();

    const req = {
      body: {
        name: "group_1",
        permission: ["READ", "WRITE"],
        userid: 1,
      },
    };
    const res = {
      status,
      json,
    };

    await createGroup(req, res);

    const expectedValue = {
      message: "Group created successfully",
      data: mockGroups[0],
    };

    expect(addGroup).toBeCalledWith({
      name: "group_1",
      permission: ["READ", "WRITE"],
      userid: 1,
    });

    expect(json).toBeCalledWith(expectedValue);
  });

  it("method getAllGroups should return groups", async () => {
    const json = jest.fn();
    const req = {};

    const res = {
      json,
    };

    const expectedValue = {
      groups: mockGroups,
    };

    await getAllGroups(req, res);

    expect(json).toBeCalledWith(expectedValue);
  });

  it("method getOneGroup should return group by id", async () => {
    const { findOneGroup } = mockModule;

    const json = jest.fn();

    const req = {
      params: {
        id: "1",
      },
    };
    const res = {
      json,
    };

    await getOneGroup(req, res);

    expect(findOneGroup).toBeCalledWith("1");
    expect(json).toBeCalledWith(mockGroups[0]);
  });

  it("method deleteUser should delete user by id", async () => {
    const { deleteGroupById } = mockModule;

    const status = jest.fn().mockReturnThis();
    const json = jest.fn();

    deleteGroupById.mockResolvedValue(1);

    const req = {
      params: {
        id: "1",
      },
    };
    const res = {
      status,
      json,
    };

    await deleteGroup(req, res);

    const expectedValue = {
      message: "Group deleted successfully",
      count: 1,
    };

    expect(deleteGroupById).toBeCalledWith("1");
    expect(json).toBeCalledWith(expectedValue);
  });
});
