const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];

    // console.log(rolesArray);

    //It applies when the user has multiple roles
    // const result = req.roles
    //   .map((role) => rolesArray.includes(role))
    //   .find((val) => val === true);

    const result = req.roles;
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
