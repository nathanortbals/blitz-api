const router = require('express').Router();

router.get('/', function(req, res) {
  return res.json({
    "lastUpdatedOn": "2018-08-26T22:22:18.880Z",
    "players": [
    {
      "player": {
        "id": 13507,
        "firstName": "Manny",
        "lastName": "Abad",
        "primaryPosition": "DB",
        "alternatePositions": [],
        "jerseyNumber": 38,
        "currentTeam": {
          "id": 67,
          "abbreviation": "TEN"
        },
        "currentRosterStatus": "ROSTER",
        "currentInjury": null,
        "height": "5'11\"",
        "weight": 184,
        "birthDate": "1993-11-23",
        "age": 24,
        "birthCity": null,
        "birthCountry": null,
        "rookie": false,
        "highSchool": null,
        "college": null,
        "handedness": null,
        "officialImageSrc": null,
        "socialMediaAccounts": [],
        "currentContractYear": null,
        "drafted": null,
        "externalMappings": []
      },
      "teamAsOfDate": {
        "id": 67,
        "abbreviation": "TEN"
      }
    },
    {
      "player": {
        "id": 6923,
        "firstName": "Jared",
        "lastName": "Abbrederis",
        "primaryPosition": "WR",
        "alternatePositions": [],
        "jerseyNumber": 84,
        "currentTeam": null,
        "currentRosterStatus": "RETIRED",
        "currentInjury": null,
        "height": "6'1\"",
        "weight": 195,
        "birthDate": "1990-12-17",
        "age": 27,
        "birthCity": "West Allis, WI",
        "birthCountry": "USA",
        "rookie": false,
        "highSchool": null,
        "college": null,
        "handedness": null,
        "officialImageSrc": null,
        "socialMediaAccounts": [],
        "currentContractYear": null,
        "drafted": null,
        "externalMappings": []
      },
      "teamAsOfDate": null
    },
    {
      "player": {
        "id": 11579,
        "firstName": "Mehdi",
        "lastName": "Abdesmad",
        "primaryPosition": "DE",
        "alternatePositions": [],
        "jerseyNumber": 68,
        "currentTeam": {
          "id": 67,
          "abbreviation": "TEN"
        },
        "currentRosterStatus": "ROSTER",
        "currentInjury": null,
        "height": "6'6\"",
        "weight": 284,
        "birthDate": "1991-09-28",
        "age": 26,
        "birthCity": "Montreal, QB",
        "birthCountry": "Canada",
        "rookie": false,
        "highSchool": null,
        "college": null,
        "handedness": null,
        "officialImageSrc": null,
        "socialMediaAccounts": [],
        "currentContractYear": null,
        "drafted": null,
        "externalMappings": []
      },
      "teamAsOfDate": {
        "id": 67,
        "abbreviation": "TEN"
      }
    }
  ],
    "references": {
    "teamReferences": [
      {
        "id": 67,
        "city": "Tennessee",
        "name": "Titans",
        "abbreviation": "TEN",
        "homeVenue": {
          "id": 72,
          "name": "Nissan Stadium"
        },
        "teamColoursHex": [],
        "socialMediaAccounts": [],
        "officialLogoImageSrc": null
      }
    ]}
  });
});

module.exports = router;