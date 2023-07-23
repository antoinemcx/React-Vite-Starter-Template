const checkRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(value => value === true);
        if (!result) return res.sendStatus(401);

        next();
    }
}

module.exports = checkRoles;