const OpenStreetMapLocationServiceGateway = require("../adapters/OpenStreetMapLocationServiceGateway");
const GetStandUseCase = require("../usecases/GetStandUseCase/GetStand.usecase");

class GetStandCoordinatesController  {
  constructor(standRepository, locationServiceGateway) {
    this.standRepository = standRepository;
    this.locationServiceGateway = locationServiceGateway;
  }

  async execute(req, res) {
    const getStandUseCase = new GetStandUseCase(this.standRepository);
    const stand = await getStandUseCase.execute(standid);
    if (stand.error) {
      return res.status(404).json(stand.error.message);
    }
    const { location } = stand.data;
    const coordinates = await this.locationServiceGateway.getCoordinates(location);
    if(coordinates.message) return res.status(400).json(coordinates.message)
    return res.status(200).json(coordinates);
  }
}

module.exports = GetStandCoordinatesController;