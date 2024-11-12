import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { LimitNumberOfCheckInsError } from './errors/limit-number-of-ckeckins-error';
import { MaxDistanceError } from './errors/max-distance-error';

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {

  constructor(
        private readonly checkInsRepository: CheckInsRepository,
        private readonly gymsRepository: GymsRepository
  ) {}
  
  async execute({userId, gymId, userLatitude, userLongitude}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) 
      throw new ResourceNotFoundError();

    
    const distance = getDistanceBetweenCoordinates({latitude: userLatitude, longitude: userLongitude}, {
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber()
    });

    const MAX_DISTANCE_IN_KM = 0.1; //100m

    if(distance > MAX_DISTANCE_IN_KM)
      throw new MaxDistanceError();

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) {
      throw new LimitNumberOfCheckInsError();
    }
    
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    });
 
    return {
      checkIn
    };
  }
}