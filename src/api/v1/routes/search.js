/**
 * @openapi
 * 
 * /search:
 *  get:
 *      tags:
 *          - Search
 *      summary: Search restaurants based on various filters like tag, type, name, location, operation time, etc.
 *      description: |
 *          You can use this endpoint to search for restaurants based on different criteria such as tag, type, location, etc.
 *          Example usage: host/api/v1/search?tag=restaurant&type=thematic&location=city_medellin&operationTime=open>=12:00&perPage=10
 *          This request searches for thematic restaurants in the city of Medellín, opening after 12:00, and displays 10 results per page.
 *          Filtering logic is applied jointly (AND) for multiple filters.
 *      parameters:
 *          - in: query
 *            name: tag
 *            description: "Specifies the type of entity being searched."
 *            schema:
 *              type: string
 *              example: "restaurant" 
 *            required: false
 *          - in: query
 *            name: type
 *            description: "Filters restaurants based on their type."
 *            schema:
 *              type: string
 *              example: "fast food,dinner,thematic" 
 *            required: false
 *          - in: query
 *            name: query
 *            description: "Filters results based on a search term in the restaurant name."
 *            schema:
 *              type: string
 *              example: "mindset" 
 *            required: false
 *          - in: query
 *            name: location
 *            description: "Filters by city, state, or neighborhood."
 *            schema:
 *              type: string
 *              example: "city_medellin,state_antioquia,neighborhood_bronx" 
 *            required: false
 *          - in: query
 *            name: operationTime
 *            description: "Filters based on the restaurant's opening and closing hours."
 *            schema:
 *              type: string
 *              example: "open>=12:00,close<=16:00" 
 *            required: false
 *          - in: query
 *            name: pages
 *            description: "Specifies the number of data packets."
 *            schema:
 *              type: string
 *              example: "2" 
 *            required: false
 *          - in: query
 *            name: perPage
 *            description: "Results per page."
 *            schema:
 *              type: string
 *              example: "10" 
 *            required: false
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              restaurants:
 *                                  type: array
 *                                  items:
 *                                      $ref: "#/components/schemas/Restaurant"
 *          505:
 *              $ref: "#/components/responses/ErrorNotHandled"
 *              
 */

import { Router } from "express";
import { SearchController } from "../controllers/searchController.js";
export const routerSearch = Router()

routerSearch.get("/", SearchController.get)