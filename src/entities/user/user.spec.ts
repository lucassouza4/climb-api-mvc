import { Permissions, Type } from "../../util/enums/user";
import { BasicUser } from "./basicUser";
import { MasterUser } from "./masterUser";
import { UserProps } from "./user";

const inputBasic: UserProps = {
  id: "teste",
  type: Type.BASIC,
  name: "teste",
  email: "teste",
  score: 0,
  password: "teste",
};

const inputMaster: UserProps = {
  id: "teste",
  type: Type.MASTER,
  name: "teste",
  email: "teste",
  score: 0,
  password: "teste",
};

describe("User entity test", () => {
  it("Should create a basic user with()", () => {
    const user = BasicUser.with(
      inputBasic.id,
      inputBasic.name,
      inputBasic.email,
      inputBasic.score
    );

    expect(user).toBeInstanceOf(BasicUser);
  });
  it("Should create a master user with()", () => {
    const user = MasterUser.with(
      inputMaster.id,
      inputMaster.name,
      inputMaster.email,
      inputMaster.score
    );

    expect(user).toBeInstanceOf(MasterUser);
  });
  it("Should create a basic user build()", () => {
    const user = BasicUser.build(
      inputBasic.name,
      inputBasic.email,
      inputBasic.password
    );

    expect(user).toBeInstanceOf(BasicUser);
    expect(user.name).toEqual(inputBasic.name);
    expect(user.email).toEqual(inputBasic.email);
    expect(user.password).toEqual(inputBasic.password);
  });
  it("Should create a master user build()", () => {
    const user = MasterUser.build(
      inputMaster.name,
      inputMaster.email,
      inputMaster.password
    );

    expect(user).toBeInstanceOf(MasterUser);
    expect(user.name).toEqual(inputMaster.name);
    expect(user.email).toEqual(inputMaster.email);
    expect(user.password).toEqual(inputMaster.password);
  });
  it("Should list basic permissions", () => {
    const basicPermissions = [
      Permissions.READ_BOULDER,
      Permissions.UPDATE_BOULDER,
    ];
    const user = BasicUser.build(
      inputBasic.name,
      inputBasic.email,
      inputBasic.password
    );

    expect(user).toBeInstanceOf(BasicUser);
    expect(user.getPermissions()).toEqual(basicPermissions);
  });
  it("Should list master permissions", () => {
    const masterPermissions = [
      Permissions.READ_BOULDER,
      Permissions.UPDATE_BOULDER,
      Permissions.CREATE_BOULDER,
      Permissions.DELETE_BOULDER,
    ];
    const user = MasterUser.build(
      inputMaster.name,
      inputMaster.email,
      inputMaster.password
    );

    expect(user).toBeInstanceOf(MasterUser);
    expect(user.getPermissions()).toEqual(masterPermissions);
  });
  it("Should encrease score", () => {
    const user = MasterUser.build(
      inputMaster.name,
      inputMaster.email,
      inputMaster.password
    );
    user.encreaseScore(10);

    expect(user.score).toEqual(100);
  });
  it("Should decrease score", () => {
    const user = MasterUser.build(
      inputMaster.name,
      inputMaster.email,
      inputMaster.password
    );
    user.encreaseScore(10);
    user.decreaseScore(10);

    expect(user.score).toEqual(0);
  });
  it("Should validate password", () => {
    const user = MasterUser.build(
      inputMaster.name,
      inputMaster.email,
      inputMaster.password
    );

    let validation;
    if (inputMaster.password) {
      validation = user.validatePassword(inputMaster.password);
      expect(validation).toEqual(true);
    } else {
      expect(validation).toEqual(false);
    }
  });
});
