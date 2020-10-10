import { Response } from 'express';

type ApiResponse = {
    data: unknown | null;
    error?: string;
    ok: boolean;
};

type GetResponseObjectParams =
    | {
          ok: true;
          data: unknown;
      }
    | {
          ok: false;
          error?: string;
      };

type Error = {
    status?: number | null;
    message?: string | null;
} | null;

export class ApiHandler {
    static getResponseObject = (
        payload: GetResponseObjectParams
    ): ApiResponse => {
        const response: ApiResponse = {
            ok: false,
            data: null,
        };
        if (payload.ok) {
            response.ok = true;
            response.data = payload.data;
        } else {
            response.ok = false;
            response.error = payload.error;
        }
        return response;
    };

    static sendError = (res: Response, error: Error) => {
        res.status(error?.status || 500).send(
            ApiHandler.getResponseObject({
                ok: false,
                error: error?.message || 'Server error',
            })
        );
    };

    static sendSuccessResponse = (res: Response, data: unknown) => {
        res.status(200).send(
            ApiHandler.getResponseObject({
                ok: true,
                data,
            })
        );
    };
}
