import express from "express";
import usersRoutes from "./src/routes/routers.js";
import groupRoutes from "./src/routes/group-routers.js";

import { UserGroup } from './src/database/models/GroupUser.js';
import { Group } from './src/database/models/Group.js';
import { User } from './src/database/models/User.js';

const PORT = 3099;
const app = express();


app.use(express.json());

// /api/users/
app.use("/users", usersRoutes);
// /api/groups/
app.use("/groups", groupRoutes);

User.belongsToMany(Group, {
    through: UserGroup,
    as: 'groups',
    foreignKey: 'userid'
});

Group.belongsToMany(User, {
    through: UserGroup,
    as: 'users',
    foreignKey: 'groupid'
});

app.get("/", (req, res) => res.send("HOME PAGE"));

app.listen(PORT, () =>
    console.log(`Server is Running on port: http://localhost:${PORT}`)
);