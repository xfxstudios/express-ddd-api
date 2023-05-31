
import {NextFunction,Request,Response} from "express";
import {ErrorCodes} from "../shared/services/Enums";
import {_servLog,_servResponse} from "../shared/dependencies";

export const errorNotFoundHandler=(req: Request,res: Response,next: NextFunction) => {
    const _error=_servResponse.response({
        error: true,
        code: ErrorCodes.BAD_REQUEST,
        message: "Resource or URL not found",
        flow: "Middleware Not Found Error"
    })
    _servLog.setError("[ERROR NOT FOUND HANDLER]: Resource or URL not found",{body: req.body,params: req.params,header: req.headers,path: req.path})
    res.status(404).json(_error)
};
