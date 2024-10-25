const setToken = (res, token) => {


  const options = { httpOnly: true, secure: true, sameSite: "lax", maxAge: 3600000 * 2  }; 

  res.cookie("authorization", token,options );
};

module.exports = setToken;
