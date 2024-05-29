const config = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
  },
};

export default config;
