import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";
import { ReservationService } from "../services/reservationService.js";
import { UnauthorizedError } from "../errors/errors.js";
import { TableService } from "../services/tableService.js";

export async function validateReservationAccess(req, res, next) {
    tryCatchWrapper(async () => {

        const { table } = await TableService.getOne(req.params.idTable)
        const { reservation } = await ReservationService.getOne(req.params.idTable, req.params.idReservation)

        if (reservation.client._id.toString() !== req.user._id.toString()) {
            throw new UnauthorizedError()
        }

        req.table = table
        next()

    })(req, res, next)
}