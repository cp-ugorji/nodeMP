export const users = [];

export const addUser = user => Promise.resolve(users.push(user));

export const getUsers = () => Promise.resolve(users.filter(user => user.isDeleted));

export const getUserById = async id => {
    const users = await getUsers();
    const user = users.find(user => user.id === id);
    return user;
}

export const getAutoSuggestUsers = (loginSubstring, limit) => 
    users
        .slice(0, limit)
        .filter(user => user.login.indexOf(loginSubstring) === 0)
        .sort((first, second) => first.login > second.login || -1);