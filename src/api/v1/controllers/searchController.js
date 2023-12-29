import { tryCatchWrapper } from "../utils/tryCatchWrapper.js"
import { SearchService } from "../services/searchService.js"

export class SearchController {

    static splitByOperator(text, operator) {
        const comparators = { "=": "$eq", ">": "$gt", ">=": "$gte", "<": "$lt", "<=": "$lte" }
        const [val1, val2] = text.split(operator)
        return [val1, comparators[operator], val2]
    }

    static restaurantSearchFilters(querys) {
        const searchQuerys = {}

        const notAnd = () => {
            if (!searchQuerys.$and) {
                searchQuerys.$and = []
            }
        }

        if (querys.type) {
            notAnd()
            searchQuerys.$and.push({ "type": { $in: querys.type.split(",") } })
        }

        if (querys.location) {
            querys.location.split(",").forEach(x => {
                let temp = x.split("_")
                if (temp[0] === "city" || temp[0] === "state" || temp[0] === "neighborhood") {
                    notAnd()
                    searchQuerys.$and.push({ [`location.${temp[0]}`]: { "$regex": temp[1], "$options": "i" } })
                }
            })
        }

        if (querys.operationTime) {

            const times = querys.operationTime.split(",")

            const timeToMinutes = (time) => {
                const [hour, minute] = time.split(":")
                return (hour * 60 + minute * 1)
            }

            times.forEach(str => {
                const operator = str.match(/\b(<|>|>=|=|<|<=)\b/g)

                if (operator) {
                    notAnd()
                    const [status, comparator, time] = this.splitByOperator(str, operator)
                    const minutes = timeToMinutes(time)
                    searchQuerys.$and.push({ ["operationTime." + status]: { [comparator]: minutes } })
                }
            })
        }

        if (querys.query) {
            notAnd()
            searchQuerys.$and.push({ name: { $regex: querys.query, $options: "i" } })
        }

        return searchQuerys
    }

    static search(querys) {
        if (querys.tag === "restaurant") {
            return this.restaurantSearchFilters(querys)
        }
        return {}
    }

    static async get(req, res, next) {
        tryCatchWrapper(async () => {
            const queryParams = SearchController.search(req.query)
            res.status(200).json(await SearchService.get(queryParams, req.query.pages, req.query.perPage))
        })(req, res, next)
    }
}
