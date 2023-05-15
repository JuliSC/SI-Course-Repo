import {Router} from "express";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the user
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the user
 *           example: John Doe
 *       required:
 *         - id
 *         - name
 *     Users:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/User"
 */

const users = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users.
 *     responses:
 *       200:
 *         description: Users successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Users"
 *
 */
router.get("/api/users", (req, res) => {
  res.json({data: users});
});

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *    summary: Get a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the user to get
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: User found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User"
 *      '404':
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: A message describing the error
 */
router.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({error: "User not found"});
    return;
  }
  res.json({data: user});
});

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *           example:
 *             id: 3
 *             name: "John Smith"
 *
 *     responses:
 *       201:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Missing parameters.
 */
router.post("/api/users", (req, res) => {
  if (!req.body.id || !req.body.name) {
    res
      .status(400)
      .send(
        `ERROR: Missing the following parameters: ${!req.body.id ? "id" : ""} ${
          !req.body.name ? "name" : ""
        }`
      );
    return;
  }
  const user = req.body;
  users.push(user);
  res.json({data: user});
});

/**
 * @openapi
 * /api/users/{id}:
 *  patch:
 *    summary: Update a user by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the user to update
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The new name of the user
 *    responses:
 *      '200':
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User"
 *      '400':
 *        description: Invalid input
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: A message describing the error
 *      '404':
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error
 */
router.patch("/api/users/:id", (req, res) => {
  if (!req.params.id || !req.body.name) {
    res
      .status(400)
      .send(
        `ERROR: Missing the following parameters: ${
          !req.params.id ? "id" : ""
        } ${!req.body.name ? "name" : ""}`
      );
    return;
  }

  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({error: "User not found"});
    return;
  }

  if (req.body.name) {
    user.name = req.body.name;
  }
  res.json({data: user});
});

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *         example: 1
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 *       400:
 *         description: Missing parameters.
 *
 */
router.delete("/api/users/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send(`ERROR: Missing the following parameter: id`);
    return;
  }

  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({error: "User not found"});
    return;
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.json({data: user});
});

export default router;
