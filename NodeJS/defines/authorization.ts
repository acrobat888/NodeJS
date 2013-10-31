///<reference path="node.d.ts" />
///<reference path="express.d.ts" />

import config = module("config");
import express = module("express");
import routeHelper = module('routeHelper');

export function authorizeAccess(filterRoles: routeHelper.FilterRoles, actionMethod: express.ExpressHandler): express.ExpressHandler {
    return function (req: express.ExpressServerRequest, res: express.ExpressServerResponse): void {
        var username: string = req.headers[config.HEADERS.USER_NAME];
        var rolesStr: string = req.headers[config.HEADERS.ROLES];
        var i: number;
        var roles: string[];

        if (rolesStr) {
            roles = rolesStr.split(',');
            for (i = 0; i < roles.length; i += 1) {
                if (filterRoles[roles[i]]) {
                    actionMethod(req, res);
                    return;
                }
            }
        }

        console.log("401 Unauthorized: User(" + username + ") Roles(" + rolesStr + ") Method(" + req.path + ")");
        res.send(config.HTTP.UNAUTHORIZED);
    };
};
