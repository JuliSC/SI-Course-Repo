// spacecrafts router

import {Router} from "express";

const router = Router();

const spacecrafts = [
  {
    SpacecraftId: 1,
    Spacecraft: {
      id: 1,
      name: "Enterprise",
      type: "station",
    },
  },
  {
    SpacecraftId: 2,
    Spacecraft: {
      id: 2,
      name: "Voyager",
      type: "probe",
    },
  },
];

/**
 * @openapi
 * /api/spacecrafts:
 *  get:
 *   description: Get all spacecrafts.
 *   responses:
 *   200:
 *    description: Returns the spacecraft with matching id.
 *   404:
 *    description: No spacecrafts found.
 *   500:
 *    description: Internal server error.
 */
router.get(`/api/spacecrafts/:id`, (req, res) => {
  const spacecraft = spacecrafts.find(
    (s) => s.SpacecraftId === parseInt(req.params.id)
  );

  if (!spacecraft) {
    res.status(404).json({error: "Spacecraft not found"});
  }

  res.json({data: spacecraft});
});

router.get(`/api/external-spacecrafts/:id`, async (req, res) => {
  const spacecraft = fetch(
    `https://ad36-195-249-146-101.eu.ngrok.io/api/spacecrafts/${req.params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!spacecraft) {
      res.status(404).json({error: "Spacecraft not found"});
    }

    res.json({data: spacecraft});
  });

  console.log(spacecraft);
});

export default router;
