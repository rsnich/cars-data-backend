


## Description

A little backend micro-service which aims to serve the cars data. The backend provides following API:


Add a car record:
```
POST: <server>/car
```
Format of the document should be:

```
{
  "owners": [
      {
          "name": "name of the owner",
          "purchaseDate": "<purchase date in ISODate format>"
      }
      ...
  ],
  "manufacturer": {
      "name": "<name of manufacturer>",
      "phone": "<phone>",
      "siret": <serial>
  },
  "price": <price>,
  "firstRegistrationDate": <first registration date in ISODate format>,
}
```

Example:


```
{
  "owners": [
      {
          "name": "Owner A",
          "purchaseDate": "2020-02-07T00:00:00.000Z"
      },
      {
          "name": "Owner B",
          "purchaseDate": "2020-02-07T00:00:00.000Z"
      }
  ],
  "manufacturer": {
      "name": "Audi",
      "phone": "+1 324 54 5523",
      "siret": 12345
  },
  "price": 21000,
  "firstRegistrationDate": "2020-02-07T00:00:00.000Z"
}
```

Get all car records
```
GET: <server>/car
```
Get a car record by its ID
```
<server>/car/:id
```
Get car manufacturer
```
<server>/car/:id/manufacturer
```
Update a car record
```
PUT: <server>/car/<id>
```
Apply discount of 20% to cars with first registration date betwee 18 and 18 months 
```
PUT: <server>/car/discount
```
Delete a car record by its ID
```
DELETE: <server>/car/<id>
```
Remove owners from the car records who bought their cars before 18 months
```
DELETE: <server>/car/owners
```

## Running the app

Execute following command
```
sudo docker-compose up
```
in order to build a docker image and run docke container.
