const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const initialUsers = [
  {
    id: 1,
    username: "admin",
    password: "Nicol3123!Admin",
    role: "admin",
    createdAt: "2026-05-01T10:00:00Z"
  }
];

let users = [...initialUsers];

export const userService = {
  getAll: async () => {
    await delay(500);
    return [...users];
  },

  getById: async (id) => {
    await delay(500);
    const user = users.find(u => u.id === id);
    return user ? { ...user } : null;
  },

  getByUsername: async (username) => {
    await delay(500);
    const user = users.find(u => u.username === username);
    return user ? { ...user } : null;
  },

  create: async (userData) => {
    await delay(500);
    const existingUser = users.find(u => u.username === userData.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  update: async (id, userData) => {
    await delay(500);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    if (userData.username) {
      const existingUser = users.find(u => 
        u.username === userData.username && u.id !== id
      );
      if (existingUser) {
        throw new Error('Username already exists');
      }
    }
    
    const updatedUser = {
      ...users[index],
      ...userData,
      id,
      updatedAt: new Date().toISOString()
    };
    users[index] = updatedUser;
    return updatedUser;
  },

  delete: async (id) => {
    await delay(500);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    const userToDelete = users[index];
    if (userToDelete.role === 'admin') {
      const adminCount = users.filter(u => u.role === 'admin').length;
      if (adminCount <= 1) {
        throw new Error('Cannot delete the last administrator');
      }
    }
    users = users.filter(u => u.id !== id);
    return id;
  }
};
